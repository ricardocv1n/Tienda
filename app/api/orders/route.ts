import { type NextRequest, NextResponse } from "next/server"
import { getUser, isAdmin } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(request: NextRequest) {
  // Obtener el usuario actual
  const user = await getUser()
  const admin = await isAdmin()

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    // Si es administrador, devolver todos los pedidos
    // Si es usuario normal, devolver solo sus pedidos
    const orders = await prisma.order.findMany({
      where: admin ? {} : { userId: user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                images: {
                  take: 1,
                },
              },
            },
          },
        },
        address: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Transformar los datos para que coincidan con el formato esperado por el frontend
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      date: order.createdAt.toISOString().split("T")[0],
      total: order.total,
      status: order.status,
      items: order.items.length,
      customer: `${order.address.firstName} ${order.address.lastName}`,
      email: user.email,
      shippingAddress: {
        address: order.address.address,
        city: order.address.city,
        state: order.address.state,
        postalCode: order.address.postalCode,
        country: order.address.country,
      },
      paymentMethod: order.paymentMethod,
      products: order.items.map((item) => ({
        id: item.productId,
        name: item.product.name,
        price: item.price,
        quantity: item.quantity,
        image: item.product.images[0]?.url || "/placeholder.svg?height=50&width=50",
      })),
    }))

    return NextResponse.json(formattedOrders)
  } catch (error) {
    console.error("Error al obtener pedidos:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Obtener el usuario actual
  const user = await getUser()

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { items, shippingAddress, shippingMethod, paymentMethod, total, shippingCost, notes } = await request.json()

    // Crear o recuperar la dirección
    let address = await prisma.address.findFirst({
      where: {
        userId: user.id,
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
      },
    })

    if (!address) {
      address = await prisma.address.create({
        data: {
          userId: user.id,
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
          phone: shippingAddress.phone,
        },
      })
    }

    // Crear el pedido
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        addressId: address.id,
        total,
        shippingCost,
        shippingMethod,
        paymentMethod,
        notes,
        status: "PROCESSING",
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            size: item.size,
            color: item.color,
          })),
        },
      },
      include: {
        items: true,
        address: true,
      },
    })

    // Actualizar el stock de los productos
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.id },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Error al crear pedido:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { getUser, isAdmin } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Obtener el usuario actual
  const user = await getUser()
  const admin = await isAdmin()

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const orderId = params.id

    // Buscar el pedido
    const order = await prisma.order.findUnique({
      where: { id: orderId },
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
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 })
    }

    // Verificar si el usuario tiene permiso para ver este pedido
    if (!admin && order.userId !== user.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    // Transformar los datos para que coincidan con el formato esperado por el frontend
    const formattedOrder = {
      id: order.id,
      date: order.createdAt.toISOString().split("T")[0],
      total: order.total,
      shippingCost: order.shippingCost,
      status: order.status,
      customer: `${order.address.firstName} ${order.address.lastName}`,
      email: order.user.email,
      shippingAddress: {
        address: order.address.address,
        city: order.address.city,
        state: order.address.state,
        postalCode: order.address.postalCode,
        country: order.address.country,
        phone: order.address.phone,
      },
      shippingMethod: order.shippingMethod,
      paymentMethod: order.paymentMethod,
      notes: order.notes,
      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.product.images[0]?.url || "/placeholder.svg?height=50&width=50",
      })),
    }

    return NextResponse.json(formattedOrder)
  } catch (error) {
    console.error("Error al obtener pedido:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  // Verificar si el usuario es administrador
  const admin = await isAdmin()

  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 })
  }

  try {
    const orderId = params.id
    const { status } = await request.json()

    // Verificar si el pedido existe
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!existingOrder) {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 })
    }

    // Actualizar el estado del pedido
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error("Error al actualizar pedido:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

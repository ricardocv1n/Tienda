import { type NextRequest, NextResponse } from "next/server"
import { isAdmin } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Buscar el producto por ID con sus relaciones
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        sizes: true,
        colors: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    // Transformar los datos para que coincidan con el formato esperado por el frontend
    const formattedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      images: product.images.map((img) => img.url),
      category: product.category,
      isNew: product.isNew,
      discount: product.discount,
      sizes: product.sizes.map((s) => s.size),
      colors: product.colors.map((c) => c.color),
      brand: product.brand,
      stock: product.stock,
      description: product.description,
      reviews: product.reviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        helpful: review.helpful,
        unhelpful: review.unhelpful,
        date: review.createdAt,
        user: {
          id: review.user.id,
          name: review.user.name,
        },
      })),
      rating:
        product.reviews.length > 0
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
          : 0,
      reviewCount: product.reviews.length,
    }

    return NextResponse.json(formattedProduct)
  } catch (error) {
    console.error("Error al obtener producto:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  // Verificar si el usuario es administrador
  const admin = await isAdmin()

  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 })
  }

  try {
    const id = Number.parseInt(params.id)
    const { sizes, colors, images, ...productData } = await request.json()

    // Verificar si el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    // Actualizar el producto
    await prisma.product.update({
      where: { id },
      data: productData,
    })

    // Actualizar tallas si se proporcionan
    if (sizes) {
      // Eliminar tallas existentes
      await prisma.productSize.deleteMany({
        where: { productId: id },
      })

      // Crear nuevas tallas
      if (sizes.length > 0) {
        await Promise.all(
          sizes.map((size: number) =>
            prisma.productSize.create({
              data: {
                size,
                productId: id,
              },
            }),
          ),
        )
      }
    }

    // Actualizar colores si se proporcionan
    if (colors) {
      // Eliminar colores existentes
      await prisma.productColor.deleteMany({
        where: { productId: id },
      })

      // Crear nuevos colores
      if (colors.length > 0) {
        await Promise.all(
          colors.map((color: string) =>
            prisma.productColor.create({
              data: {
                color,
                productId: id,
              },
            }),
          ),
        )
      }
    }

    // Actualizar imágenes si se proporcionan
    if (images) {
      // Eliminar imágenes existentes
      await prisma.productImage.deleteMany({
        where: { productId: id },
      })

      // Crear nuevas imágenes
      if (images.length > 0) {
        await Promise.all(
          images.map((url: string) =>
            prisma.productImage.create({
              data: {
                url,
                productId: id,
              },
            }),
          ),
        )
      }
    }

    // Obtener el producto actualizado con sus relaciones
    const updatedProduct = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        sizes: true,
        colors: true,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error("Error al actualizar producto:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Verificar si el usuario es administrador
  const admin = await isAdmin()

  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 })
  }

  try {
    const id = Number.parseInt(params.id)

    // Verificar si el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    // Eliminar el producto (las relaciones se eliminarán automáticamente por la restricción onDelete: Cascade)
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al eliminar producto:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

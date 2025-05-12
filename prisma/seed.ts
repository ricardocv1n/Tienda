import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Crear usuario administrador
  const adminPassword = await bcrypt.hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Administrador",
      password: adminPassword,
      role: "ADMIN",
    },
  })

  // Crear usuario cliente
  const userPassword = await bcrypt.hash("user123", 10)
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Usuario Demo",
      password: userPassword,
      role: "CUSTOMER",
    },
  })

  console.log({ admin, user })

  // Crear categorías de productos
  const categories = ["Deportivos", "Casual", "Formal", "Outdoor", "Niños"]
  const brands = ["SportMax", "ClassicStyle", "ComfortWalk", "UrbanTrend", "TrailMaster", "KidsFun"]

  // Crear productos
  const products = [
    {
      name: "Air Sport Max",
      description:
        "Zapatillas deportivas de alto rendimiento con tecnología de amortiguación avanzada. Perfectas para correr, entrenar o uso diario. Diseñadas para proporcionar comodidad y soporte durante todo el día.",
      price: 129.99,
      stock: 25,
      category: "Deportivos",
      brand: "SportMax",
      isNew: true,
      discount: 0,
      sizes: [39, 40, 41, 42, 43, 44],
      colors: ["Negro", "Blanco", "Rojo"],
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
    },
    {
      name: "Classic Leather Oxford",
      description:
        "Zapatos formales de cuero genuino con diseño clásico y elegante. Perfectos para ocasiones especiales o uso diario en entornos formales.",
      price: 89.99,
      originalPrice: 119.99,
      stock: 15,
      category: "Formal",
      brand: "ClassicStyle",
      isNew: false,
      discount: 25,
      sizes: [40, 41, 42, 43, 44],
      colors: ["Negro", "Marrón"],
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    },
    {
      name: "Comfort Casual Loafers",
      description:
        "Mocasines casuales con plantilla acolchada para máxima comodidad. Ideales para uso diario y ocasiones informales.",
      price: 69.99,
      stock: 30,
      category: "Casual",
      brand: "ComfortWalk",
      isNew: true,
      discount: 0,
      sizes: [39, 40, 41, 42, 43],
      colors: ["Azul", "Gris", "Negro"],
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    },
    {
      name: "Urban Street Sneakers",
      description:
        "Zapatillas urbanas con diseño moderno y materiales de alta calidad. Perfectas para el día a día en la ciudad.",
      price: 79.99,
      originalPrice: 99.99,
      stock: 20,
      category: "Casual",
      brand: "UrbanTrend",
      isNew: false,
      discount: 20,
      sizes: [38, 39, 40, 41, 42, 43, 44],
      colors: ["Negro", "Blanco", "Gris"],
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    },
    {
      name: "Mountain Trail Hikers",
      description:
        "Botas de senderismo resistentes y duraderas. Diseñadas para terrenos difíciles y condiciones climáticas adversas.",
      price: 149.99,
      stock: 10,
      category: "Outdoor",
      brand: "TrailMaster",
      isNew: true,
      discount: 0,
      sizes: [40, 41, 42, 43, 44, 45],
      colors: ["Verde", "Marrón", "Negro"],
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    },
    {
      name: "Kids Colorful Sneakers",
      description:
        "Zapatillas coloridas y divertidas para niños. Cómodas, resistentes y con diseños que les encantarán.",
      price: 39.99,
      stock: 35,
      category: "Niños",
      brand: "KidsFun",
      isNew: true,
      discount: 0,
      sizes: [28, 29, 30, 31, 32, 33, 34],
      colors: ["Multicolor", "Azul", "Rosa"],
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    },
  ]

  // Insertar productos en la base de datos
  for (const productData of products) {
    const { sizes, colors, images, ...productInfo } = productData

    const product = await prisma.product.create({
      data: productInfo,
    })

    // Crear tallas para el producto
    for (const size of sizes) {
      await prisma.productSize.create({
        data: {
          size,
          productId: product.id,
        },
      })
    }

    // Crear colores para el producto
    for (const color of colors) {
      await prisma.productColor.create({
        data: {
          color,
          productId: product.id,
        },
      })
    }

    // Crear imágenes para el producto
    for (const imageUrl of images) {
      await prisma.productImage.create({
        data: {
          url: imageUrl,
          productId: product.id,
        },
      })
    }

    console.log(`Creado producto: ${product.name}`)
  }

  // Crear algunas reseñas
  const reviews = [
    {
      userId: user.id,
      productId: 1,
      rating: 5,
      comment: "Excelentes zapatos, muy cómodos y de buena calidad. Los recomiendo totalmente.",
      helpful: 12,
      unhelpful: 2,
    },
    {
      userId: user.id,
      productId: 2,
      rating: 4,
      comment: "Buena calidad y diseño, pero tardaron un poco más de lo esperado en llegar.",
      helpful: 8,
      unhelpful: 1,
    },
    {
      userId: user.id,
      productId: 3,
      rating: 5,
      comment: "Perfectos para el día a día, muy cómodos y con buen soporte. Ya es mi segundo par de esta marca.",
      helpful: 15,
      unhelpful: 0,
    },
  ]

  for (const reviewData of reviews) {
    await prisma.review.create({
      data: reviewData,
    })
  }

  console.log("Base de datos poblada con éxito")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

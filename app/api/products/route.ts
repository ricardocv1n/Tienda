import { type NextRequest, NextResponse } from "next/server"
import { isAdmin } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const brand = searchParams.get("brand")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    // Construir la consulta SQL base
    let query = `
      SELECT 
        p.id, p.name, p.price, p.original_price as "originalPrice", 
        p.category, p.is_new as "isNew", p.discount, p.brand, p.stock, p.description,
        (SELECT url FROM "ProductImage" WHERE "productId" = p.id LIMIT 1) as image
      FROM "Product" p
      WHERE 1=1
    `

    const queryParams = []
    let paramIndex = 1

    // Añadir filtros si existen
    if (category) {
      query += ` AND p.category = $${paramIndex}`
      queryParams.push(category)
      paramIndex++
    }

    if (brand) {
      query += ` AND p.brand = $${paramIndex}`
      queryParams.push(brand)
      paramIndex++
    }

    if (minPrice) {
      query += ` AND p.price >= $${paramIndex}`
      queryParams.push(Number.parseFloat(minPrice))
      paramIndex++
    }

    if (maxPrice) {
      query += ` AND p.price <= $${paramIndex}`
      queryParams.push(Number.parseFloat(maxPrice))
      paramIndex++
    }

    // Ejecutar la consulta
    const products = await sql(query, queryParams)

    // Para cada producto, obtener sus tallas y colores
    const productsWithDetails = await Promise.all(
      products.map(async (product) => {
        // Obtener tallas
        const sizes = await sql(`SELECT size FROM "ProductSize" WHERE "productId" = $1`, [product.id])

        // Obtener colores
        const colors = await sql(`SELECT color FROM "ProductColor" WHERE "productId" = $1`, [product.id])

        return {
          ...product,
          sizes: sizes.map((s) => s.size),
          colors: colors.map((c) => c.color),
          image: product.image || "/placeholder.svg?height=300&width=300",
        }
      }),
    )

    return NextResponse.json(productsWithDetails)
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Verificar si el usuario es administrador
  const admin = await isAdmin()

  if (!admin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 })
  }

  try {
    const { sizes, colors, images, ...productData } = await request.json()

    // Insertar el producto
    const [product] = await sql`
      INSERT INTO "Product" (
        name, description, price, original_price, stock, 
        category, brand, is_new, discount, 
        created_at, updated_at
      ) VALUES (
        ${productData.name}, 
        ${productData.description}, 
        ${productData.price}, 
        ${productData.originalPrice || null}, 
        ${productData.stock || 0}, 
        ${productData.category}, 
        ${productData.brand}, 
        ${productData.isNew || false}, 
        ${productData.discount || 0}, 
        NOW(), 
        NOW()
      ) RETURNING *
    `

    // Insertar tallas
    if (sizes && sizes.length > 0) {
      for (const size of sizes) {
        await sql`
          INSERT INTO "ProductSize" (size, "productId", created_at)
          VALUES (${size}, ${product.id}, NOW())
        `
      }
    }

    // Insertar colores
    if (colors && colors.length > 0) {
      for (const color of colors) {
        await sql`
          INSERT INTO "ProductColor" (color, "productId", created_at)
          VALUES (${color}, ${product.id}, NOW())
        `
      }
    }

    // Insertar imágenes
    if (images && images.length > 0) {
      for (const url of images) {
        await sql`
          INSERT INTO "ProductImage" (url, "productId", created_at)
          VALUES (${url}, ${product.id}, NOW())
        `
      }
    }

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error al crear producto:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

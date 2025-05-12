import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { signToken } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { sql } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Buscar el usuario en la base de datos
    const users = await sql`
      SELECT * FROM "User" WHERE email = ${email}
    `

    const user = users[0]

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 })
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
    }

    // Generar token JWT
    const token = await signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    // Establecer cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 horas
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Error de login:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

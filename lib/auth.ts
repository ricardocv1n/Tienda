// Este archivo simula un sistema de autenticación
// En una aplicación real, aquí se configuraría NextAuth.js o similar

import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_change_in_production")

export async function signToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secretKey)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    return payload
  } catch (error) {
    return null
  }
}

export async function getUser() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) return null

  const payload = await verifyToken(token)
  return payload
}

export async function isAuthenticated() {
  const user = await getUser()
  return !!user
}

export async function isAdmin() {
  const user = await getUser()
  return user?.role === "admin"
}

import { PrismaClient } from "@prisma/client"
import { neon } from "@neondatabase/serverless"

// Configuración para Neon
const sql = neon(process.env.DATABASE_URL!)

// Evitar múltiples instancias de Prisma Client en desarrollo
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Exportar tanto prisma como la conexión directa a Neon
export default prisma
export { sql }

import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

// En una aplicación real, aquí verificaríamos si el usuario está autenticado y es administrador
// Esta es una simulación simplificada
const isAdmin = true

export default function AdminPage() {
  // Redireccionar si no es administrador
  if (!isAdmin) {
    redirect("/auth/login")
  }

  return <AdminDashboard />
}

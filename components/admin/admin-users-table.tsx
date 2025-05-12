"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Trash, UserCog } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo - En una aplicación real, estos vendrían de una API
const users = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    role: "Cliente",
    status: "Activo",
    orders: 5,
    lastLogin: "2023-05-15",
  },
  {
    id: 2,
    name: "María López",
    email: "maria@example.com",
    role: "Cliente",
    status: "Activo",
    orders: 3,
    lastLogin: "2023-05-14",
  },
  {
    id: 3,
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "Administrador",
    status: "Activo",
    orders: 0,
    lastLogin: "2023-05-15",
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana@example.com",
    role: "Cliente",
    status: "Inactivo",
    orders: 2,
    lastLogin: "2023-04-20",
  },
  {
    id: 5,
    name: "Pedro Sánchez",
    email: "pedro@example.com",
    role: "Cliente",
    status: "Activo",
    orders: 7,
    lastLogin: "2023-05-13",
  },
  {
    id: 6,
    name: "Laura Gómez",
    email: "laura@example.com",
    role: "Cliente",
    status: "Activo",
    orders: 1,
    lastLogin: "2023-05-10",
  },
  {
    id: 7,
    name: "Miguel Torres",
    email: "miguel@example.com",
    role: "Empleado",
    status: "Activo",
    orders: 0,
    lastLogin: "2023-05-15",
  },
  {
    id: 8,
    name: "Sofía Ruiz",
    email: "sofia@example.com",
    role: "Cliente",
    status: "Inactivo",
    orders: 4,
    lastLogin: "2023-03-25",
  },
]

export function AdminUsersTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (userId: number) => {
    // Aquí iría la lógica para eliminar el usuario
    toast({
      title: "Usuario eliminado",
      description: `El usuario con ID ${userId} ha sido eliminado.`,
    })
  }

  const handleEdit = (userId: number) => {
    // Aquí iría la lógica para editar el usuario
    toast({
      title: "Editar usuario",
      description: `Editando el usuario con ID ${userId}.`,
    })
  }

  const handleChangeRole = (userId: number, role: string) => {
    // Aquí iría la lógica para cambiar el rol del usuario
    toast({
      title: "Rol actualizado",
      description: `El usuario con ID ${userId} ahora tiene el rol de "${role}".`,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Pedidos</TableHead>
              <TableHead>Último acceso</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.role === "Administrador"
                        ? "border-red-500 text-red-500"
                        : user.role === "Empleado"
                          ? "border-blue-500 text-blue-500"
                          : "border-green-500 text-green-500"
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.status === "Activo" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.orders}</TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(user.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Cambiar rol</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleChangeRole(user.id, "Cliente")}>Cliente</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeRole(user.id, "Empleado")}>
                        <UserCog className="mr-2 h-4 w-4" />
                        Empleado
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeRole(user.id, "Administrador")}>
                        <UserCog className="mr-2 h-4 w-4" />
                        Administrador
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

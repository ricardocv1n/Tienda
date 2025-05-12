"use client"

import { useState } from "react"
import { Eye, MoreHorizontal } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo - En una aplicación real, estos vendrían de una API
const orders = [
  {
    id: "ORD-001",
    customer: "Carlos Rodríguez",
    date: "2023-05-15",
    total: 259.98,
    status: "Entregado",
    items: 2,
  },
  {
    id: "ORD-002",
    customer: "María López",
    date: "2023-05-14",
    total: 89.99,
    status: "Enviado",
    items: 1,
  },
  {
    id: "ORD-003",
    customer: "Juan Pérez",
    date: "2023-05-13",
    total: 149.99,
    status: "Procesando",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Ana Martínez",
    date: "2023-05-12",
    total: 119.98,
    status: "Enviado",
    items: 2,
  },
  {
    id: "ORD-005",
    customer: "Pedro Sánchez",
    date: "2023-05-11",
    total: 199.97,
    status: "Entregado",
    items: 3,
  },
  {
    id: "ORD-006",
    customer: "Laura Gómez",
    date: "2023-05-10",
    total: 69.99,
    status: "Cancelado",
    items: 1,
  },
  {
    id: "ORD-007",
    customer: "Miguel Torres",
    date: "2023-05-09",
    total: 129.99,
    status: "Entregado",
    items: 1,
  },
  {
    id: "ORD-008",
    customer: "Sofía Ruiz",
    date: "2023-05-08",
    total: 159.98,
    status: "Procesando",
    items: 2,
  },
]

interface AdminOrdersTableProps {
  limit?: number
}

export function AdminOrdersTable({ limit }: AdminOrdersTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()

  let filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (statusFilter !== "all") {
    filteredOrders = filteredOrders.filter((order) => order.status === statusFilter)
  }

  if (limit) {
    filteredOrders = filteredOrders.slice(0, limit)
  }

  const handleViewOrder = (orderId: string) => {
    // Aquí iría la lógica para ver los detalles del pedido
    toast({
      title: "Ver pedido",
      description: `Viendo detalles del pedido ${orderId}.`,
    })
  }

  const handleUpdateStatus = (orderId: string, status: string) => {
    // Aquí iría la lógica para actualizar el estado del pedido
    toast({
      title: "Estado actualizado",
      description: `El pedido ${orderId} ha sido actualizado a "${status}".`,
    })
  }

  return (
    <div>
      {!limit && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <Input
            placeholder="Buscar pedidos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="Procesando">Procesando</SelectItem>
              <SelectItem value="Enviado">Enviado</SelectItem>
              <SelectItem value="Entregado">Entregado</SelectItem>
              <SelectItem value="Cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      order.status === "Entregado"
                        ? "bg-green-500 hover:bg-green-600"
                        : order.status === "Enviado"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : order.status === "Procesando"
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-red-500 hover:bg-red-600"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
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
                      <DropdownMenuItem onClick={() => handleViewOrder(order.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Cambiar estado</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Procesando")}>
                        Procesando
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Enviado")}>
                        Enviado
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Entregado")}>
                        Entregado
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Cancelado")}>
                        Cancelado
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

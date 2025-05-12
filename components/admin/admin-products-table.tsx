"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
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
const products = [
  {
    id: 1,
    name: "Air Sport Max",
    price: 129.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Deportivos",
    stock: 25,
    status: "En stock",
  },
  {
    id: 2,
    name: "Classic Leather Oxford",
    price: 89.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Formal",
    stock: 15,
    status: "En stock",
  },
  {
    id: 3,
    name: "Comfort Casual Loafers",
    price: 69.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Casual",
    stock: 30,
    status: "En stock",
  },
  {
    id: 4,
    name: "Urban Street Sneakers",
    price: 79.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Casual",
    stock: 5,
    status: "Bajo stock",
  },
  {
    id: 5,
    name: "Mountain Trail Hikers",
    price: 149.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Outdoor",
    stock: 0,
    status: "Agotado",
  },
  {
    id: 6,
    name: "Summer Canvas Slip-ons",
    price: 49.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Casual",
    stock: 40,
    status: "En stock",
  },
  {
    id: 7,
    name: "Elegant Evening Heels",
    price: 119.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Formal",
    stock: 12,
    status: "En stock",
  },
  {
    id: 8,
    name: "Kids Colorful Sneakers",
    price: 39.99,
    image: "/placeholder.svg?height=50&width=50",
    category: "Niños",
    stock: 20,
    status: "En stock",
  },
]

export function AdminProductsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (productId: number) => {
    // Aquí iría la lógica para eliminar el producto
    toast({
      title: "Producto eliminado",
      description: `El producto con ID ${productId} ha sido eliminado.`,
    })
  }

  const handleEdit = (productId: number) => {
    // Aquí iría la lógica para editar el producto
    toast({
      title: "Editar producto",
      description: `Editando el producto con ID ${productId}.`,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      product.status === "En stock"
                        ? "bg-green-500 hover:bg-green-600"
                        : product.status === "Bajo stock"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-red-500 hover:bg-red-600"
                    }
                  >
                    {product.status}
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
                      <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(product.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Eliminar
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

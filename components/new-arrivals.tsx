import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo - En una aplicación real, estos vendrían de una API
const newArrivals = [
  {
    id: 5,
    name: "Mountain Trail Hikers",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Outdoor",
    isNew: true,
  },
  {
    id: 6,
    name: "Summer Canvas Slip-ons",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Casual",
    isNew: true,
  },
  {
    id: 7,
    name: "Elegant Evening Heels",
    price: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Formal",
    isNew: true,
  },
  {
    id: 8,
    name: "Kids Colorful Sneakers",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Niños",
    isNew: true,
  },
]

export function NewArrivals() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {newArrivals.map((product) => (
        <Card key={product.id} className="overflow-hidden group">
          <div className="relative">
            <Link href={`/productos/${product.id}`}>
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
            </Link>
            {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">Nuevo</Badge>}
          </div>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
            <Link href={`/productos/${product.id}`} className="hover:underline">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
            </Link>
            <div className="flex items-center">
              <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full" size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al carrito
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo - En una aplicación real, estos vendrían de una API
const products = [
  {
    id: 1,
    name: "Air Sport Max",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Deportivos",
    isNew: true,
    discount: 0,
  },
  {
    id: 3,
    name: "Comfort Casual Loafers",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Casual",
    isNew: true,
    discount: 0,
  },
  {
    id: 4,
    name: "Urban Street Sneakers",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Casual",
    isNew: false,
    discount: 20,
  },
  {
    id: 5,
    name: "Mountain Trail Hikers",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Outdoor",
    isNew: true,
    discount: 0,
  },
]

interface RelatedProductsProps {
  category: string
  currentProductId: number
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
  // Filtrar productos relacionados (misma categoría, pero no el producto actual)
  const relatedProducts = products
    .filter((product) => product.category === category && product.id !== currentProductId)
    .slice(0, 4) // Limitar a 4 productos

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
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
            {product.discount > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">-{product.discount}%</Badge>
            )}
          </div>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
            <Link href={`/productos/${product.id}`} className="hover:underline">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
            </Link>
            <div className="flex items-center">
              <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="ml-2 text-muted-foreground line-through text-sm">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
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

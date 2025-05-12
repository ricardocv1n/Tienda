"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

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
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ["Negro", "Blanco", "Rojo"],
    brand: "SportMax",
  },
  {
    id: 2,
    name: "Classic Leather Oxford",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Formal",
    isNew: false,
    discount: 25,
    sizes: [40, 41, 42, 43, 44],
    colors: ["Negro", "Marrón"],
    brand: "ClassicStyle",
  },
  {
    id: 3,
    name: "Comfort Casual Loafers",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Casual",
    isNew: true,
    discount: 0,
    sizes: [39, 40, 41, 42, 43],
    colors: ["Azul", "Gris", "Negro"],
    brand: "ComfortWalk",
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
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["Negro", "Blanco", "Gris"],
    brand: "UrbanTrend",
  },
  {
    id: 5,
    name: "Mountain Trail Hikers",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Outdoor",
    isNew: true,
    discount: 0,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Verde", "Marrón", "Negro"],
    brand: "TrailMaster",
  },
  {
    id: 6,
    name: "Summer Canvas Slip-ons",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Casual",
    isNew: true,
    discount: 0,
    sizes: [38, 39, 40, 41, 42, 43],
    colors: ["Azul", "Rojo", "Blanco"],
    brand: "SummerStep",
  },
  {
    id: 7,
    name: "Elegant Evening Heels",
    price: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Formal",
    isNew: true,
    discount: 0,
    sizes: [35, 36, 37, 38, 39, 40],
    colors: ["Negro", "Rojo", "Plata"],
    brand: "ElegantSteps",
  },
  {
    id: 8,
    name: "Kids Colorful Sneakers",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Niños",
    isNew: true,
    discount: 0,
    sizes: [28, 29, 30, 31, 32, 33, 34],
    colors: ["Multicolor", "Azul", "Rosa"],
    brand: "KidsFun",
  },
]

export function ProductCatalog() {
  const [sortBy, setSortBy] = useState("featured")
  const { addToCart } = useCart()
  const { toast } = useToast()

  // Ordenar productos según la selección
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return a.isNew ? -1 : 1
      default:
        return 0
    }
  })

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })

    toast({
      title: "Producto añadido",
      description: `${product.name} ha sido añadido a tu carrito.`,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Mostrando {products.length} productos</p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm">
            Ordenar por:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded p-1 text-sm"
          >
            <option value="featured">Destacados</option>
            <option value="newest">Más nuevos</option>
            <option value="price-low">Precio: Menor a Mayor</option>
            <option value="price-high">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
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
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                onClick={() => toast({ title: "Añadido a favoritos" })}
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Añadir a favoritos</span>
              </Button>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
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
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" size="sm" onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al carrito
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

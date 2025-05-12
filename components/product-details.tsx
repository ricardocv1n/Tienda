"use client"

import { useState } from "react"
import { Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

interface ProductDetailsProps {
  product: any // En una aplicación real, definiríamos un tipo específico
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].toString())
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    })

    toast({
      title: "Producto añadido",
      description: `${product.name} ha sido añadido a tu carrito.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        {product.isNew && <Badge className="mb-2 bg-green-500 hover:bg-green-600">Nuevo</Badge>}
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <div className="flex items-center mt-2 space-x-4">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : i < product.rating
                      ? "fill-yellow-400 text-yellow-400" // Para medias estrellas, simplificado
                      : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">({product.reviewCount} reseñas)</span>
          </div>

          <div className="text-sm text-muted-foreground">
            Marca: <span className="font-medium text-foreground">{product.brand}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
        {product.discount > 0 && (
          <>
            <div className="text-xl text-muted-foreground line-through">
              ${((product.price * 100) / (100 - product.discount)).toFixed(2)}
            </div>
            <Badge className="bg-red-500 hover:bg-red-600">-{product.discount}%</Badge>
          </>
        )}
      </div>

      <div>
        <h3 className="font-medium mb-2">Descripción</h3>
        <p className="text-muted-foreground">{product.description}</p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Color</h3>
        <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex space-x-2">
          {product.colors.map((color: string) => (
            <div key={color} className="flex items-center space-x-2">
              <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
              <Label
                htmlFor={`color-${color}`}
                className={`cursor-pointer rounded-md border px-3 py-1 ${
                  selectedColor === color ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                {color}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium mb-2">Talla</h3>
        <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
          {product.sizes.map((size: number) => (
            <div key={size} className="flex items-center">
              <RadioGroupItem value={size.toString()} id={`size-${size}`} className="sr-only" />
              <Label
                htmlFor={`size-${size}`}
                className={`cursor-pointer rounded-md border h-10 w-10 flex items-center justify-center ${
                  selectedSize === size.toString() ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium mb-2">Cantidad</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
            <span className="sr-only">Disminuir cantidad</span>
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button variant="outline" size="icon" onClick={increaseQuantity} disabled={quantity >= product.stock}>
            <Plus className="h-4 w-4" />
            <span className="sr-only">Aumentar cantidad</span>
          </Button>
          <span className="text-sm text-muted-foreground ml-2">{product.stock} disponibles</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Button size="lg" className="flex-1" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al carrito
        </Button>
        <Button variant="outline" size="lg">
          <Heart className="mr-2 h-5 w-5" /> Añadir a favoritos
        </Button>
        <Button variant="outline" size="icon" className="hidden sm:flex">
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Compartir</span>
        </Button>
      </div>

      <div className="flex items-center text-sm text-muted-foreground">
        <Truck className="mr-2 h-5 w-5" />
        Envío gratuito en pedidos superiores a $50
      </div>

      <Tabs defaultValue="details">
        <TabsList className="w-full">
          <TabsTrigger value="details" className="flex-1">
            Detalles
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex-1">
            Envío
          </TabsTrigger>
          <TabsTrigger value="returns" className="flex-1">
            Devoluciones
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4 pt-4">
          <h4 className="font-medium">Características</h4>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            {product.features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="shipping" className="pt-4">
          <p className="text-muted-foreground">
            Ofrecemos envío estándar (3-5 días hábiles) y envío express (1-2 días hábiles) a todo el país. El envío
            estándar es gratuito en pedidos superiores a $50. Para pedidos internacionales, los tiempos de entrega
            pueden variar según la ubicación.
          </p>
        </TabsContent>
        <TabsContent value="returns" className="pt-4">
          <p className="text-muted-foreground">
            Aceptamos devoluciones dentro de los 30 días posteriores a la compra. Los productos deben estar sin usar,
            con todas las etiquetas originales y en su embalaje original. Los gastos de envío de devolución corren por
            cuenta del cliente, a menos que el producto esté defectuoso.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

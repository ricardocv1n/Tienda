"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Home, Minus, Plus, ShoppingBag, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const { toast } = useToast()

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") {
      toast({
        title: "Error",
        description: "Por favor, introduce un código de cupón válido.",
        variant: "destructive",
      })
      return
    }

    // Aquí iría la lógica para validar el cupón con la API
    toast({
      title: "Cupón aplicado",
      description: "El descuento ha sido aplicado a tu pedido.",
    })
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-8">Parece que aún no has añadido ningún producto a tu carrito.</p>
          <Button size="lg" asChild>
            <Link href="/productos">Continuar comprando</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <Home className="h-4 w-4 mr-1" />
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium">Carrito de compras</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">Carrito de compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted px-6 py-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">Producto</div>
                <div className="col-span-2 text-center">Precio</div>
                <div className="col-span-2 text-center">Cantidad</div>
                <div className="col-span-2 text-center">Total</div>
              </div>
            </div>

            <div className="divide-y">
              {cartItems.map((item) => (
                <div key={item.id} className="px-6 py-4">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6">
                      <div className="flex items-center">
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="ml-4">
                          <Link href={`/productos/${item.id}`} className="font-medium hover:underline">
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">${item.price.toFixed(2)}</div>

                    <div className="col-span-2">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Disminuir cantidad</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Aumentar cantidad</span>
                        </Button>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-1 max-w-md">
              <Input
                placeholder="Código de cupón"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="rounded-r-none"
              />
              <Button onClick={handleApplyCoupon} className="rounded-l-none">
                Aplicar
              </Button>
            </div>

            <Button variant="outline" asChild>
              <Link href="/productos">Continuar comprando</Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span>Calculado en el checkout</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">Proceder al checkout</Link>
              </Button>

              <div className="text-sm text-center text-muted-foreground">
                Impuestos y gastos de envío calculados en el checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

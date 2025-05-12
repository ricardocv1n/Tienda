"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, CreditCard, Home, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "España",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    notes: "",
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí iría la lógica para procesar el pago y crear el pedido
    toast({
      title: "¡Pedido realizado con éxito!",
      description: "Gracias por tu compra. Recibirás un correo con los detalles de tu pedido.",
    })

    // Limpiar el carrito y redirigir a la página de confirmación
    clearCart()
    router.push("/checkout/confirmacion")
  }

  const shippingCost = formData.shippingMethod === "express" ? 9.99 : 4.99
  const finalTotal = totalPrice + shippingCost

  if (cartItems.length === 0) {
    router.push("/carrito")
    return null
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
        <Link href="/carrito" className="text-muted-foreground hover:text-foreground">
          Carrito
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium">Checkout</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Información de contacto */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Información de contacto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
            </div>

            {/* Dirección de envío */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Dirección de envío</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Provincia</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Código postal</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                  </div>
                </div>
              </div>
            </div>

            {/* Método de envío */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Método de envío</h2>
              <RadioGroup
                value={formData.shippingMethod}
                onValueChange={(value) => handleRadioChange("shippingMethod", value)}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex items-center">
                      <Truck className="mr-2 h-5 w-5" />
                      <div>
                        <div>Envío estándar</div>
                        <div className="text-sm text-muted-foreground">Entrega en 3-5 días hábiles</div>
                      </div>
                    </Label>
                  </div>
                  <div className="font-medium">$4.99</div>
                </div>
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex items-center">
                      <Truck className="mr-2 h-5 w-5" />
                      <div>
                        <div>Envío express</div>
                        <div className="text-sm text-muted-foreground">Entrega en 1-2 días hábiles</div>
                      </div>
                    </Label>
                  </div>
                  <div className="font-medium">$9.99</div>
                </div>
              </RadioGroup>
            </div>

            {/* Método de pago */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Método de pago</h2>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => handleRadioChange("paymentMethod", value)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Tarjeta de crédito/débito
                  </Label>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="ml-6 space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required={formData.paymentMethod === "card"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleChange}
                        required={formData.paymentMethod === "card"}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Fecha de expiración</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/AA"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          required={formData.paymentMethod === "card"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvc">CVC</Label>
                        <Input
                          id="cardCvc"
                          name="cardCvc"
                          placeholder="123"
                          value={formData.cardCvc}
                          onChange={handleChange}
                          required={formData.paymentMethod === "card"}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Notas adicionales */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Notas adicionales</h2>
              <div className="space-y-2">
                <Label htmlFor="notes">Instrucciones especiales para la entrega (opcional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Ej: Dejar el paquete con el portero, llamar antes de entregar, etc."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">Cantidad: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button type="submit" className="w-full mt-6" size="lg">
                Realizar pedido
              </Button>

              <p className="text-sm text-center text-muted-foreground mt-4">
                Al realizar tu pedido, aceptas nuestros{" "}
                <Link href="/terminos" className="text-primary hover:underline">
                  términos y condiciones
                </Link>{" "}
                y{" "}
                <Link href="/privacidad" className="text-primary hover:underline">
                  política de privacidad
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

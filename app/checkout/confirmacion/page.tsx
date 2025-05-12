"use client"

import Link from "next/link"
import { CheckCircle, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmationPage() {
  // En una aplicación real, obtendríamos los detalles del pedido de la API
  const orderDetails = {
    id: "ORD-12345",
    date: new Date().toLocaleDateString(),
    total: 264.97,
    shippingAddress: "Calle Principal 123, Ciudad, CP 12345, País",
    paymentMethod: "Tarjeta de crédito (terminada en 4242)",
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">¡Pedido confirmado!</h1>
        <p className="text-muted-foreground">
          Gracias por tu compra. Hemos recibido tu pedido y lo estamos procesando.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto mb-8">
        <CardHeader>
          <CardTitle>Detalles del pedido</CardTitle>
          <CardDescription>
            Pedido #{orderDetails.id} - {orderDetails.date}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Dirección de envío</h3>
                <p className="text-muted-foreground">{orderDetails.shippingAddress}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Método de pago</h3>
                <p className="text-muted-foreground">{orderDetails.paymentMethod}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-1">Entrega estimada</h3>
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                <p>{orderDetails.estimatedDelivery}</p>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-3xl mx-auto text-center space-y-4">
        <p className="text-muted-foreground">
          Hemos enviado un correo electrónico de confirmación a tu dirección de email. Si tienes alguna pregunta sobre
          tu pedido, no dudes en contactarnos.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button asChild>
            <Link href="/pedidos">
              <Package className="mr-2 h-5 w-5" /> Ver mis pedidos
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <ShoppingBag className="mr-2 h-5 w-5" /> Continuar comprando
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

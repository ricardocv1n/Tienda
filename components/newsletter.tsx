"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí iría la lógica para enviar el email a la API
    toast({
      title: "¡Suscripción exitosa!",
      description: "Gracias por suscribirte a nuestro boletín de noticias.",
    })

    setEmail("")
  }

  return (
    <div className="text-center max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">Suscríbete a nuestro boletín</h3>
      <p className="text-gray-300 mb-6">
        Recibe las últimas novedades, ofertas exclusivas y consejos de moda directamente en tu bandeja de entrada.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Button type="submit" className="whitespace-nowrap">
          Suscribirse
        </Button>
      </form>
    </div>
  )
}

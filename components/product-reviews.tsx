"use client"

import type React from "react"

import { useState } from "react"
import { Star, ThumbsDown, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// Datos de ejemplo - En una aplicación real, estos vendrían de una API
const reviews = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    rating: 5,
    date: "15/04/2023",
    comment: "Excelentes zapatos, muy cómodos y de buena calidad. Los recomiendo totalmente.",
    helpful: 12,
    unhelpful: 2,
  },
  {
    id: 2,
    name: "María López",
    rating: 4,
    date: "03/03/2023",
    comment: "Buena calidad y diseño, pero tardaron un poco más de lo esperado en llegar.",
    helpful: 8,
    unhelpful: 1,
  },
  {
    id: 3,
    name: "Juan Pérez",
    rating: 5,
    date: "22/02/2023",
    comment: "Perfectos para correr, muy ligeros y con buen soporte. Ya es mi segundo par de esta marca.",
    helpful: 15,
    unhelpful: 0,
  },
]

interface ProductReviewsProps {
  productId: number
  rating: number
  reviewCount: number
}

export function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  })
  const { toast } = useToast()

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí iría la lógica para enviar la reseña a la API
    toast({
      title: "Reseña enviada",
      description: "Gracias por compartir tu opinión sobre este producto.",
    })

    setShowReviewForm(false)
    setNewReview({
      name: "",
      email: "",
      rating: 5,
      comment: "",
    })
  }

  const handleRatingChange = (newRating: number) => {
    setNewReview({ ...newReview, rating: newRating })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : i < rating
                      ? "fill-yellow-400 text-yellow-400" // Para medias estrellas, simplificado
                      : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-muted-foreground">{reviewCount} reseñas</span>
        </div>

        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? "Cancelar" : "Escribir una reseña"}
        </Button>
      </div>

      {showReviewForm && (
        <div className="mb-8 border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Escribe tu reseña</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="review-name">Nombre</Label>
                <Input
                  id="review-name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-email">Email</Label>
                <Input
                  id="review-email"
                  type="email"
                  value={newReview.email}
                  onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Calificación</Label>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleRatingChange(i + 1)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        i < newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-comment">Comentario</Label>
              <Textarea
                id="review-comment"
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
              />
            </div>

            <Button type="submit">Enviar reseña</Button>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">{review.name}</div>
                <div className="text-sm text-muted-foreground">{review.date}</div>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>

            <p className="mb-4">{review.comment}</p>

            <div className="flex items-center text-sm">
              <span className="mr-4">¿Te ha resultado útil esta reseña?</span>
              <Button variant="outline" size="sm" className="mr-2">
                <ThumbsUp className="h-4 w-4 mr-1" /> {review.helpful}
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsDown className="h-4 w-4 mr-1" /> {review.unhelpful}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

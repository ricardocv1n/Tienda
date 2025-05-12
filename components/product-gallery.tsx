"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt={`${productName} - Imagen ${currentImage + 1}`}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-between p-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full opacity-70 hover:opacity-100"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Imagen anterior</span>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full opacity-70 hover:opacity-100">
                <ZoomIn className="h-4 w-4" />
                <span className="sr-only">Ampliar imagen</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <div className="relative aspect-square">
                <Image
                  src={images[currentImage] || "/placeholder.svg"}
                  alt={`${productName} - Imagen ${currentImage + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full opacity-70 hover:opacity-100"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Siguiente imagen</span>
          </Button>
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
              index === currentImage ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} - Miniatura ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

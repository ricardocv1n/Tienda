import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ProductDetails } from "@/components/product-details"
import { ProductGallery } from "@/components/product-gallery"
import { ProductReviews } from "@/components/product-reviews"
import { RelatedProducts } from "@/components/related-products"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight, Home } from "lucide-react"

// Datos de ejemplo - En una aplicación real, estos vendrían de una API
const products = [
  {
    id: 1,
    name: "Air Sport Max",
    price: 129.99,
    description:
      "Zapatillas deportivas de alto rendimiento con tecnología de amortiguación avanzada. Perfectas para correr, entrenar o uso diario. Diseñadas para proporcionar comodidad y soporte durante todo el día.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Deportivos",
    isNew: true,
    discount: 0,
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ["Negro", "Blanco", "Rojo"],
    brand: "SportMax",
    stock: 25,
    rating: 4.5,
    reviewCount: 128,
    features: [
      "Suela de goma resistente a la abrasión",
      "Parte superior de malla transpirable",
      "Plantilla acolchada extraíble",
      "Sistema de amortiguación en el talón",
      "Cordones ajustables para un ajuste seguro",
    ],
  },
  // Otros productos...
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    notFound()
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
        <Link href="/productos" className="text-muted-foreground hover:text-foreground">
          Productos
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link
          href={`/categorias/${product.category.toLowerCase()}`}
          className="text-muted-foreground hover:text-foreground"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
          <ProductGallery images={product.images} productName={product.name} />
        </Suspense>

        <ProductDetails product={product} />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Reseñas de clientes</h2>
        <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
        <RelatedProducts category={product.category} currentProductId={product.id} />
      </div>
    </div>
  )
}

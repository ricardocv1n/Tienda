import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryGrid } from "@/components/category-grid"
import { NewArrivals } from "@/components/new-arrivals"
import { Newsletter } from "@/components/newsletter"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Zapatos de moda"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-6">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">Estilo para cada paso</h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
            Descubre nuestra nueva colección de zapatos para todas las ocasiones
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/productos">
                Comprar ahora <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm" asChild>
              <Link href="/categorias">
                Ver categorías <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Categorías populares</h2>
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Productos destacados</h2>
          <FeaturedProducts />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Nuevas llegadas</h2>
          <NewArrivals />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="container mx-auto">
          <Newsletter />
        </div>
      </section>
    </div>
  )
}

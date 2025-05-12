import { Suspense } from "react"
import { ProductCatalog } from "@/components/product-catalog"
import { ProductFilters } from "@/components/product-filters"
import { ProductsLoading } from "@/components/products-loading"

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Productos</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <ProductFilters />
        </div>

        <div className="w-full lg:w-3/4">
          <Suspense fallback={<ProductsLoading />}>
            <ProductCatalog />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

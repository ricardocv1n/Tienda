import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: 1,
    name: "Hombre",
    image: "/placeholder.svg?height=300&width=300",
    href: "/categorias/hombre",
  },
  {
    id: 2,
    name: "Mujer",
    image: "/placeholder.svg?height=300&width=300",
    href: "/categorias/mujer",
  },
  {
    id: 3,
    name: "Niños",
    image: "/placeholder.svg?height=300&width=300",
    href: "/categorias/ninos",
  },
  {
    id: 4,
    name: "Deportivos",
    image: "/placeholder.svg?height=300&width=300",
    href: "/categorias/deportivos",
  },
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={category.href}
          className="group relative overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
        >
          <div className="aspect-square relative">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold">{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

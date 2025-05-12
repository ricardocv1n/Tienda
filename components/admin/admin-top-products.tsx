"use client"

import Image from "next/image"
import { Progress } from "@/components/ui/progress"

// Datos de ejemplo - En una aplicación real, estos vendrían de una API
const topProducts = [
  {
    id: 1,
    name: "Air Sport Max",
    image: "/placeholder.svg?height=40&width=40",
    sales: 120,
    revenue: 15599.88,
    percentage: 100,
  },
  {
    id: 2,
    name: "Classic Leather Oxford",
    image: "/placeholder.svg?height=40&width=40",
    sales: 95,
    revenue: 8549.05,
    percentage: 79,
  },
  {
    id: 3,
    name: "Mountain Trail Hikers",
    image: "/placeholder.svg?height=40&width=40",
    sales: 85,
    revenue: 12749.15,
    percentage: 71,
  },
  {
    id: 4,
    name: "Urban Street Sneakers",
    image: "/placeholder.svg?height=40&width=40",
    sales: 78,
    revenue: 6239.22,
    percentage: 65,
  },
  {
    id: 5,
    name: "Comfort Casual Loafers",
    image: "/placeholder.svg?height=40&width=40",
    sales: 65,
    revenue: 4549.35,
    percentage: 54,
  },
]

export function AdminTopProducts() {
  return (
    <div className="space-y-6">
      {topProducts.map((product) => (
        <div key={product.id} className="flex items-center">
          <div className="mr-4">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={40}
              height={40}
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex justify-between">
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-sm font-medium">{product.sales} unidades</p>
            </div>
            <Progress value={product.percentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${product.revenue.toLocaleString()}</span>
              <span>{product.percentage}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

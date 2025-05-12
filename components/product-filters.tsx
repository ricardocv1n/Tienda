"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Datos de ejemplo - En una aplicación real, estos vendrían de una API
const categories = [
  { id: "hombre", label: "Hombre" },
  { id: "mujer", label: "Mujer" },
  { id: "ninos", label: "Niños" },
  { id: "deportivos", label: "Deportivos" },
  { id: "casual", label: "Casual" },
  { id: "formal", label: "Formal" },
  { id: "outdoor", label: "Outdoor" },
]

const brands = [
  { id: "sportmax", label: "SportMax" },
  { id: "classicstyle", label: "ClassicStyle" },
  { id: "comfortwalk", label: "ComfortWalk" },
  { id: "urbantrend", label: "UrbanTrend" },
  { id: "trailmaster", label: "TrailMaster" },
  { id: "summerstep", label: "SummerStep" },
  { id: "elegantsteps", label: "ElegantSteps" },
  { id: "kidsfun", label: "KidsFun" },
]

const sizes = [
  { id: "28", label: "28" },
  { id: "29", label: "29" },
  { id: "30", label: "30" },
  { id: "31", label: "31" },
  { id: "32", label: "32" },
  { id: "33", label: "33" },
  { id: "34", label: "34" },
  { id: "35", label: "35" },
  { id: "36", label: "36" },
  { id: "37", label: "37" },
  { id: "38", label: "38" },
  { id: "39", label: "39" },
  { id: "40", label: "40" },
  { id: "41", label: "41" },
  { id: "42", label: "42" },
  { id: "43", label: "43" },
  { id: "44", label: "44" },
  { id: "45", label: "45" },
]

const colors = [
  { id: "negro", label: "Negro" },
  { id: "blanco", label: "Blanco" },
  { id: "rojo", label: "Rojo" },
  { id: "azul", label: "Azul" },
  { id: "verde", label: "Verde" },
  { id: "gris", label: "Gris" },
  { id: "marron", label: "Marrón" },
  { id: "rosa", label: "Rosa" },
  { id: "multicolor", label: "Multicolor" },
]

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  const handleCategoryChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, id])
    } else {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== id))
    }
  }

  const handleBrandChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, id])
    } else {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== id))
    }
  }

  const handleSizeChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, id])
    } else {
      setSelectedSizes(selectedSizes.filter((size) => size !== id))
    }
  }

  const handleColorChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, id])
    } else {
      setSelectedColors(selectedColors.filter((color) => color !== id))
    }
  }

  const resetFilters = () => {
    setPriceRange([0, 200])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedSizes([])
    setSelectedColors([])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Filtros</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Limpiar filtros
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Precio</h3>
          <Slider
            defaultValue={[0, 200]}
            max={200}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["categories", "brands", "sizes", "colors"]}>
          <AccordionItem value="categories">
            <AccordionTrigger>Categorías</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => handleCategoryChange(category.id, checked === true)}
                    />
                    <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="brands">
            <AccordionTrigger>Marcas</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={(checked) => handleBrandChange(brand.id, checked === true)}
                    />
                    <Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sizes">
            <AccordionTrigger>Tallas</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <div key={size.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size.id}`}
                      checked={selectedSizes.includes(size.id)}
                      onCheckedChange={(checked) => handleSizeChange(size.id, checked === true)}
                    />
                    <Label htmlFor={`size-${size.id}`}>{size.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="colors">
            <AccordionTrigger>Colores</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {colors.map((color) => (
                  <div key={color.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color.id}`}
                      checked={selectedColors.includes(color.id)}
                      onCheckedChange={(checked) => handleColorChange(color.id, checked === true)}
                    />
                    <Label htmlFor={`color-${color.id}`}>{color.label}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Button className="w-full">Aplicar filtros</Button>
    </div>
  )
}

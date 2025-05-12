import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Footwear</h3>
            <p className="text-gray-400 mb-4">La mejor tienda de zapatos con los mejores estilos y precios.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categorias/hombre" className="text-gray-400 hover:text-white">
                  Hombre
                </Link>
              </li>
              <li>
                <Link href="/categorias/mujer" className="text-gray-400 hover:text-white">
                  Mujer
                </Link>
              </li>
              <li>
                <Link href="/categorias/ninos" className="text-gray-400 hover:text-white">
                  Niños
                </Link>
              </li>
              <li>
                <Link href="/categorias/deportivos" className="text-gray-400 hover:text-white">
                  Deportivos
                </Link>
              </li>
              <li>
                <Link href="/categorias/casual" className="text-gray-400 hover:text-white">
                  Casual
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Información</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre-nosotros" className="text-gray-400 hover:text-white">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-white">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/envios" className="text-gray-400 hover:text-white">
                  Envíos
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="text-gray-400 hover:text-white">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="text-gray-400 hover:text-white">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <address className="not-italic text-gray-400">
              <p>Calle Principal 123</p>
              <p>Ciudad, CP 12345</p>
              <p>País</p>
              <p className="mt-2">Teléfono: +123 456 7890</p>
              <p>Email: info@footwear.com</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Footwear. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BarChart3, Box, Home, LayoutDashboard, LogOut, Package, Settings, ShoppingCart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminProductsTable } from "@/components/admin/admin-products-table"
import { AdminOrdersTable } from "@/components/admin/admin-orders-table"
import { AdminUsersTable } from "@/components/admin/admin-users-table"
import { AdminSalesChart } from "@/components/admin/admin-sales-chart"
import { AdminTopProducts } from "@/components/admin/admin-top-products"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6" />
              <span>Admin Panel</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              <Button
                variant={activeTab === "overview" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === "products" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("products")}
              >
                <Box className="mr-2 h-4 w-4" />
                Productos
              </Button>
              <Button
                variant={activeTab === "orders" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Pedidos
              </Button>
              <Button
                variant={activeTab === "users" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("users")}
              >
                <Users className="mr-2 h-4 w-4" />
                Usuarios
              </Button>
              <Button
                variant={activeTab === "analytics" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("analytics")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analíticas
              </Button>
              <Button
                variant={activeTab === "settings" ? "secondary" : "ghost"}
                className="justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </Button>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Volver a la tienda
              </Link>
            </Button>
            <Button variant="outline" className="mt-2 w-full justify-start text-red-500 hover:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold md:text-xl">
              {activeTab === "overview" && "Dashboard"}
              {activeTab === "products" && "Gestión de Productos"}
              {activeTab === "orders" && "Gestión de Pedidos"}
              {activeTab === "users" && "Gestión de Usuarios"}
              {activeTab === "analytics" && "Analíticas"}
              {activeTab === "settings" && "Configuración"}
            </h1>
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <Image
              src="/placeholder.svg?height=32&width=32"
              width={32}
              height={32}
              alt="Avatar"
              className="rounded-full"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full space-y-6">
            <TabsList className="md:hidden">
              <TabsTrigger value="overview">Dashboard</TabsTrigger>
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="h-full flex-col border-none p-0 data-[state=active]:flex">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ingresos totales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$15,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% respecto al mes anterior</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">+12.2% respecto al mes anterior</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Clientes activos</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2,834</div>
                    <p className="text-xs text-muted-foreground">+18.1% respecto al mes anterior</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasa de conversión</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+5.2%</div>
                    <p className="text-xs text-muted-foreground">+1.2% respecto al mes anterior</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Ventas mensuales</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <AdminSalesChart />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Productos más vendidos</CardTitle>
                    <CardDescription>Top 5 productos por volumen de ventas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminTopProducts />
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pedidos recientes</CardTitle>
                    <CardDescription>Últimos 5 pedidos realizados en la tienda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AdminOrdersTable limit={5} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="h-full flex-col border-none p-0 data-[state=active]:flex">
              <Card>
                <CardHeader className="flex flex-row items-center">
                  <CardTitle>Gestión de Productos</CardTitle>
                  <Button className="ml-auto">Añadir producto</Button>
                </CardHeader>
                <CardContent>
                  <AdminProductsTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="h-full flex-col border-none p-0 data-[state=active]:flex">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Pedidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <AdminOrdersTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="h-full flex-col border-none p-0 data-[state=active]:flex">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <AdminUsersTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="h-full flex-col border-none p-0 data-[state=active]:flex">
              <Card>
                <CardHeader>
                  <CardTitle>Analíticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Módulo de analíticas en desarrollo</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="h-full flex-col border-none p-0 data-[state=active]:flex">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Módulo de configuración en desarrollo</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

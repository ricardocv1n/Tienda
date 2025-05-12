"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

// Registrar los componentes necesarios de Chart.js
Chart.register(...registerables)

export function AdminSalesChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destruir el gráfico anterior si existe
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Datos de ejemplo - En una aplicación real, estos vendrían de una API
        const labels = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ]

        const currentYearData = [5000, 7500, 8000, 9000, 9500, 10000, 12000, 11500, 13000, 14500, 15000, 0]

        const previousYearData = [4000, 6000, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 11000, 12000, 13000]

        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "2023",
                data: currentYearData,
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.3,
                fill: true,
              },
              {
                label: "2022",
                data: previousYearData,
                borderColor: "rgb(156, 163, 175)",
                backgroundColor: "rgba(156, 163, 175, 0.1)",
                tension: 0.3,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: (context) => {
                    let label = context.dataset.label || ""
                    if (label) {
                      label += ": "
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "USD",
                      }).format(context.parsed.y)
                    }
                    return label
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => "$" + value.toLocaleString(),
                },
              },
            },
          },
        })
      }
    }

    // Limpiar al desmontar
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}

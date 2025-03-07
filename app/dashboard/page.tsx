'use client'

import DashboardLayout from "@/components/layout/DashboardLayout"
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Charts } from "@/components/dashboard/Charts";
import { data } from '@/utils/data'
import { useEffect, useState } from "react";
import { TableData } from "@/components/dashboard/TableData";

function Dashboard() {

  const [orders, setOrders] = useState([]) // Inicializa como array vacío
  const [clients, setClients] = useState([]) // Inicializa como array vacío
  const [loading, setLoading] = useState(true) // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener órdenes
        const ordersRes = await fetch('http://localhost:3000/api/orders')
        const ordersData = await ordersRes.json()
        setOrders(Array.isArray(ordersData) ? ordersData : [ordersData].filter(Boolean))

        // Obtener clientes
        const clientsRes = await fetch('http://localhost:3000/api/clientes')
        const clientsData = await clientsRes.json()
        setClients(Array.isArray(clientsData) ? clientsData : [clientsData].filter(Boolean))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const dayToday = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  return (
    <DashboardLayout>
      <div
          className="min-h-screen bg-linear-to-br from-cloud-light/5 to-cloud-light/10"
        >
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-8 space-y-8">
              <header
                className="flex justify-between items-center pb-6 border-b border-cloud-light/20"
              >
                <div className="space-y-1">
                  <h1 className="text-3xl font-semibold text-cloud-dark">
                    Bienvenido Manuel José!
                  </h1>
                  <p className="text-sm text-cloud-dark/60">
                    Estas son las estadisticas de tu servicio
                  </p>
                </div>
                <span
                  className="text-sm text-cloud-dark/60 bg-white/40 px-4 py-2 rounded-lg backdrop-blur-xs border border-cloud-light/20"
                  >{dayToday}</span
                >
              </header>

              <DashboardStats orders={orders} clients={clients} loading={loading}/>

              <section className="pt-4">
                <Charts data={data} loading={loading}/>
              </section>

              <section className="pt-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-cloud-dark">
                    Órdenes Recientes
                  </h2>
                  <span
                    className="text-sm text-cloud-dark/60 bg-white/40 px-3 py-1 rounded-full backdrop-blur-xs border border-cloud-light/20"
                  >
                    {orders.length} órdenes totales
                  </span>
                </div>
                <TableData orders={orders} loading={loading}/>
              </section>
            </div>
          </main>
        </div>
    </DashboardLayout>
  )
}

export default Dashboard
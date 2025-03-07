import React from 'react';
import { StatsCard } from './StatsCard';
import { Car, DollarSign, Users, Calendar } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton"


interface Clients {
  email: string;
  nombre: string;
  telefono: string;
}

interface Orders {
  id: number;
  cliente_id: number;
  monto: number;
  fecha_pedido: string;  // Puedes cambiar a Date si lo manejas como objeto Date en TS
  fecha_servicio: string; // Igual que arriba
  estado: 'realizado' | 'en-progreso' | 'pendiente';
  clientes: Clients;
}


export function DashboardStats({ clients, orders, loading }: { clients: Clients[]; orders: Orders[], loading: boolean }) {
  
  const today =new Date().toLocaleDateString("es-ES", {weekday: "long", year: "numeric", month: "long", day: "numeric",})
  const totalServiciosRealizados = orders.filter((order) => order.estado === 'realizado').length;
  const ingresosTotales = orders.reduce((total, order) => total + order.monto, 0);
  const ingresosTotalesFormateados = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(ingresosTotales);
  const nuevosClientesHoy = clients.filter((client) => client.createdAt === today).length;
  const totalServiciosPendientes = orders.filter((order) => order.estado === 'pendiente').length;


  return (
    <div className="mt-6 grid gap-6 md:grid-cols-4">
      {loading ? <Skeleton className="w-[220px] h-[150px]" /> : <StatsCard
        title="Total Servicios"
        value={totalServiciosRealizados}
        icon={<Car className="h-5 w-5 text-cloud-dark" />}
      />}
      {loading ? <Skeleton className="w-[220px] h-[150px]" /> : <StatsCard
        title="Ingresos Totales"
        value={ingresosTotalesFormateados} 
        icon={<DollarSign className="h-5 w-5 text-cloud-dark" />}
      />}
      {loading ? <Skeleton className="w-[220px] h-[150px]" /> : <StatsCard
        title="Clientes Nuevos"
        value={nuevosClientesHoy}
        icon={<Users className="h-5 w-5 text-cloud-dark" />}
      />}
      {loading ? <Skeleton className="w-[220px] h-[150px]" /> : <StatsCard
        title="Pendientes"
        value={totalServiciosPendientes}
        icon={<Calendar className="h-5 w-5 text-cloud-dark" />}
      />}
    </div>
  );
}
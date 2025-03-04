import React from 'react';
import { StatsCard } from './StatsCard';
import { Car, DollarSign, Users, Calendar } from 'lucide-react';


interface Clients {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    createdAt: string;
    updatedAt: string;
}

interface Orders {
  id: number;
  cliente_id: number;
  monto: number;
  fecha_pedido: string;
  fecha_servicio: string;
  estado: string;
  servicio: string;
}

export function DashboardStats({ clients, orders }: { clients: Clients[], orders: Orders[] }) {

  const today =new Date().toLocaleDateString("es-ES", {weekday: "long", year: "numeric", month: "long", day: "numeric",})

  const nuevosClientesHoy = clients.reduce((count, client) => {
    const createdAtDate = new Date(client.createdAt).toLocaleDateString("es-ES", {weekday: "long", year: "numeric", month: "long", day: "numeric",})
    return createdAtDate === today ? count + 1 : count;
  }, 0);

  const totalServiciosRealizados = orders.reduce((count, order) => {
    return order.estado === 'realizado' ? count + 1 : count;
  }, 0);

  const ingresosTotales = orders.reduce((total, order) => {
    return total + order.monto;
  }, 0);

  const ingresosTotalesFormateados = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(ingresosTotales);

  const totalServiciosPendientes = orders.reduce((count, order) => {
    return order.estado === 'pendiente' ? count + 1 : count;
  }, 0);

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-4">
      <StatsCard
        title="Total Servicios"
        value={totalServiciosRealizados}
        icon={<Car className="h-5 w-5 text-cloud-dark" />}
      />
      <StatsCard
        title="Ingresos Totales"
        value={ingresosTotalesFormateados} 
        icon={<DollarSign className="h-5 w-5 text-cloud-dark" />}
      />
      <StatsCard
        title="Clientes Nuevos"
        value={nuevosClientesHoy}
        icon={<Users className="h-5 w-5 text-cloud-dark" />}
      />
      <StatsCard
        title="Pendientes"
        value={totalServiciosPendientes}
        icon={<Calendar className="h-5 w-5 text-cloud-dark" />}
      />
    </div>
  );
}
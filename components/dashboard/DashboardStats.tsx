import React from 'react';
import { StatsCard } from './StatsCard';
import { Car, DollarSign, Users, Calendar } from 'lucide-react';
import { variacionPorcentualMesClientes, variacionPorcentualMesIngresos, variacionPorcentualMesServicios } from '@/utils/utils';
// import { Skeleton } from "@/components/ui/skeleton"


interface Clients {
  email: string;
  nombre: string;
  telefono: string;
  createdat: string;
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


export function DashboardStats({ clients, orders}: { clients: Clients[]; orders: Orders[] }) {
  const variacionIngresos = variacionPorcentualMesIngresos(orders);
  const variacionClientes = variacionPorcentualMesClientes(clients)
  const variacionServicios = variacionPorcentualMesServicios(orders)
  const today =new Date()
  const totalServiciosRealizados = orders.filter((order) => order.estado === 'realizado').length;
  const ingresosTotales = orders.filter((order) => order.estado === 'realizado').reduce((total, order) => total + order.monto, 0);
  const ingresosTotalesFormateados = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(ingresosTotales);
  // Extraer el mes y año actuales
  const mesActual = today.getMonth(); // 0-11 (enero es 0, diciembre es 11)
  const añoActual = today.getFullYear();
  // Filtrar clientes creados en el mes actual
  const nuevosClientesMes = clients.filter((client) => {
    // Convertir la fecha de creación a objeto Date
    const fechaCreacion = new Date(client.createdat);
    
    // Comprobar si el mes y año coinciden con el actual
    return fechaCreacion.getMonth() === mesActual && 
          fechaCreacion.getFullYear() === añoActual;
  }).length;
  const totalServiciosPendientes = orders.filter((order) => order.estado === 'pendiente').length;


  return (
    <div className="mt-6 grid gap-6 md:grid-cols-4">
      {/* {loading ? <Skeleton className="w-[220px] h-[150px]" /> :  */}
      <StatsCard
        title="Total Servicios"
        value={totalServiciosRealizados}
        icon={<Car className="h-5 w-5 text-cloud-dark" />}
        cambioPorcentual={variacionServicios.variacionPorcentual}
      />
      {/* } */}
      {/* {loading ? <Skeleton className="w-[220px] h-[150px]" /> :  */}
      <StatsCard
        title="Ingresos Totales"
        value={ingresosTotalesFormateados} 
        icon={<DollarSign className="h-5 w-5 text-cloud-dark" />}
        cambioPorcentual={variacionIngresos.variacionPorcentual}
      />
      {/* } */}
      {/* {loading ? <Skeleton className="w-[220px] h-[150px]" /> :  */}
      <StatsCard
        title="Clientes Nuevos"
        value={nuevosClientesMes}
        icon={<Users className="h-5 w-5 text-cloud-dark" />}
        cambioPorcentual={variacionClientes.variacionPorcentual}
      />
      {/* } */}
      {/* {loading ? <Skeleton className="w-[220px] h-[150px]" /> :  */}
      <StatsCard
        title="Pendientes"
        value={totalServiciosPendientes}
        icon={<Calendar className="h-5 w-5 text-cloud-dark" />}
      />
      {/* } */}
    </div>
  );
}
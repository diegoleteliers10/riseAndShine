'use client'
import React, { useState } from 'react';
import {
  AreaChart,
  Bar,
  BarChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { summarizeClientsByMonth, summarizedOrdersByMonth } from '@/utils/utils';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 p-4 shadow-lg rounded-lg border border-cloud-light/20 backdrop-blur-sm">
        <p className="text-sm font-semibold text-cloud-dark">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-cloud-dark/60">
            {entry.name === 'Ingresos' ? 'Ingresos: $' : 'Clientes: '}
            {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const chartConfig = {
  xAxis: {
    stroke: '#3268BB',
    fontSize: 12,
    tickLine: false,
    axisLine: true,
    padding: { left: 0, right: 0 },
  },
  yAxis: {
    stroke: '#3268BB',
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    width: 80,
  },
};

const MONTH_ORDER: { [key: string]: number } = {
  'enero': 1,
  'febrero': 2,
  'marzo': 3,
  'abril': 4,
  'mayo': 5,
  'junio': 6,
  'julio': 7,
  'agosto': 8,
  'septiembre': 9,
  'octubre': 10,
  'noviembre': 11,
  'diciembre': 12
};

// Función para obtener el valor numérico del mes (con seguridad de tipos)
const getMonthOrder = (month: string): number => {
  const monthLower = month.toLowerCase();
  return MONTH_ORDER[monthLower] || 0; // Retorna 0 si el mes no está en el mapa
};

// Definir la interfaz SortType para los datos de los gráficos
interface SortType {
  month: string;
  customers?: number;
  income?: number;
}

// Función para ordenar los meses cronológicamente específica para SortType
const sortByMonth = (data: SortType[]): SortType[] => {
  return [...data].sort((a, b) => {
    return getMonthOrder(a.month) - getMonthOrder(b.month);
  });
};

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
  fecha_pedido: string;
  fecha_servicio: string;
  estado: 'realizado' | 'en-progreso' | 'pendiente';
  clientes: Clients;
}

export function Charts({ clients, orders}: { clients: Clients[]; orders: Orders[] }) {
  const [yearClientsFilter, setClientsYearFilter] = useState<string>(new Date().getFullYear().toString());
  const [monthClientsFilter, setMonthClientsFilter] = useState<string>('');
  const [yearOrdersFilter, setOrdersYearFilter] = useState<string>(new Date().getFullYear().toString());
  const [monthOrdersFilter, setMonthOrdersFilter] = useState<string>('');

  // Summarize clients by month
  const summarizedClients = summarizeClientsByMonth(clients); 
  const summarizedOrders = summarizedOrdersByMonth(orders)
  console.log(summarizedClients);
  console.log(summarizedOrders);

  // Filter summarized clients for the selected year and month
  const filteredClients = summarizedClients.filter(client => {
    const matchesYear = client.ano.toString() === yearClientsFilter;
    const matchesMonth = monthClientsFilter ? client.mes === monthClientsFilter : true; // If no month is selected, include all
    return matchesYear && matchesMonth;
  });

  const filteredIncome = summarizedOrders.filter(order => {
    const matchesYear = order.ano.toString() === yearOrdersFilter;
    const matchesMonth = monthOrdersFilter ? order.mes === monthOrdersFilter : true;
    return matchesYear && matchesMonth;
  });

  // Prepare data for the BarChart
  const chartData = filteredClients.map(client => ({
    month: client.mes,
    customers: client.cantidadClientes,
  }));

  const incomeChartData = filteredIncome.map(order => ({
    month: order.mes,
    income: order.cantidadIngreso,
  }));

  // Ordenar los datos por mes cronológicamente
  const sortedChartData = sortByMonth(chartData);
  const sortedIncomeChartData = sortByMonth(incomeChartData);

  // Get unique years and months for the filters
  const uniqueClientsYears = Array.from(new Set(summarizedClients.map(client => client.ano)));
  const uniqueClientsMonths = Array.from(new Set(summarizedClients.map(client => client.mes)));
  const uniqueOrdersYears = Array.from(new Set(summarizedOrders.map(order => order.ano)));
  const uniqueOrdersMonths = Array.from(new Set(summarizedOrders.map(order => order.mes)));

  // Ordenar los meses en los selectores
  const sortedClientsMonths = [...uniqueClientsMonths].sort((a, b) => 
    getMonthOrder(a) - getMonthOrder(b)
  );
  
  const sortedOrdersMonths = [...uniqueOrdersMonths].sort((a, b) => 
    getMonthOrder(a) - getMonthOrder(b)
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className="relative flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-semibold text-cloud-dark">
            Clientes Mensuales
          </CardTitle>
          <div className="flex items-center space-x-2">
            <select
              value={yearClientsFilter}
              onChange={(e) => setClientsYearFilter(e.target.value)}
              className="border border-cloud-light/30 bg-white text-cloud-dark/60 rounded-lg p-1 text-sm shadow-sm focus:outline-none transition duration-200"
            >
              <option value="" disabled>Año</option>
              {uniqueClientsYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              value={monthClientsFilter}
              onChange={(e) => setMonthClientsFilter(e.target.value)}
              className="border border-cloud-light/30 bg-white text-cloud-dark/60 rounded-lg p-1 text-sm shadow-sm focus:outline-none transition duration-200"
            >
              <option value="">Todos los meses</option>
              {sortedClientsMonths.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="customerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B4513" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8B4513" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#99B1EB" opacity={0.7} />
                <XAxis dataKey="month" {...chartConfig.xAxis} />
                <YAxis {...chartConfig.yAxis} />
                <Tooltip content={<CustomTooltip label='Clientes'/>} />
                <Bar dataKey="customers" name="Clientes" fill="#3268BB" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className="relative flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-semibold text-cloud-dark">
            Ventas Mensuales
          </CardTitle>
          <div className="flex items-center space-x-2">
            <select
              value={yearOrdersFilter}
              onChange={(e) => setOrdersYearFilter(e.target.value)}
              className="border border-cloud-light/30 bg-white text-cloud-dark/60 rounded-lg p-1 text-sm shadow-sm focus:outline-none transition duration-200"
            >
              <option value="" disabled>Año</option>
              {uniqueOrdersYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              value={monthOrdersFilter}
              onChange={(e) => setMonthOrdersFilter(e.target.value)}
              className="border border-cloud-light/30 bg-white text-cloud-dark/60 rounded-lg p-1 text-sm shadow-sm focus:outline-none transition duration-200"
            >
              <option value="">Todos los meses</option>
              {sortedOrdersMonths.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sortedIncomeChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3268BB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3268BB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#99B1EB" opacity={0.7} />
                <XAxis 
                  dataKey="month"
                  {...chartConfig.xAxis}
                />
                <YAxis 
                  {...chartConfig.yAxis}
                />
                <Tooltip content={<CustomTooltip label='Ingresos'/>} />
                <Area
                  type="monotone"
                  dataKey="income"
                  name="Ingresos"
                  stroke="#3268BB"
                  strokeWidth={2}
                  fill="url(#salesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
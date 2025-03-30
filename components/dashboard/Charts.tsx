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


interface ChartData {
  month: string;
  customers: number;
  sales: number;
}

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
            {entry.name === 'sales' ? 'Ventas: $' : 'Clientes: '}
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

export function Charts({ data }: { data: ChartData[] }) {
  const [customerFilter, setCustomerFilter] = useState<string>('');
  const [salesFilter, setSalesFilter] = useState<string>('');

  const filteredCustomerData = customerFilter
    ? data.filter(item => item.month === customerFilter)
    : data;

  const filteredSalesData = salesFilter
    ? data.filter(item => item.month === salesFilter)
    : data;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className="relative flex flex-row justify-between items-center">
          <CardTitle className="text-lg font-semibold text-cloud-dark">
            Clientes Mensuales
          </CardTitle>
          <select
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
            className="border border-cloud-light/30 bg-white text-cloud-dark/60 rounded-lg p-2 shadow-sm focus:outline-none transition duration-200"
          >
            <option value="">Todos los meses</option>
            {Array.from(new Set(data.map(item => item.month))).map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredCustomerData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="customerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B4513" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8B4513" stopOpacity={0}/>
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
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="customers"
                  name="customers"
                  fill="#3268BB"

                />
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
          <select
            value={salesFilter}
            onChange={(e) => setSalesFilter(e.target.value)}
            className="border border-cloud-light/30 bg-white text-cloud-dark/60 rounded-lg p-2 shadow-sm focus:outline-none transition duration-200"
          >
            <option value="">Todos los meses</option>
            {Array.from(new Set(data.map(item => item.month))).map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </CardHeader>
        <CardContent className="relative">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredSalesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  name="sales"
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
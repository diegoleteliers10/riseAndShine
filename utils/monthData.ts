type Order = {
  fecha_servicio: string;
  monto: number;
};

export const monthlyData = (orders: Order[]) => { 
  return orders.reduce((acc, order) => { // Agregado 'return' aquí
    const month = new Date(order.fecha_servicio).toLocaleString('es-ES', { month: 'short' });
    const existingMonth = acc.find(data => data.month === month);
    
    if (existingMonth) {
      existingMonth.customers += 1; // Incrementar el número de clientes
      existingMonth.sales += order.monto; // Sumar el monto
    } else {
      acc.push({
        month: month,
        customers: 1,
        sales: order.monto
      });
    }
    
    return acc;
  }, [] as { month: string; customers: number; sales: number }[]);
}
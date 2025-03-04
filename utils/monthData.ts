export const monthlyData = (orders) => { 
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
  }, []);
}
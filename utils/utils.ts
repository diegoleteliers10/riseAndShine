export function combineDateTime(date: string, time: string): string {
    if (!date || !time) {
        return '';
    }

    // Simplemente concatenar la fecha y la hora
    return `${date}T${time}:00.000Z`;
}

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

export function variacionPorcentualMesIngresos(orders: Orders[]) {
  // Obtener el mes actual y el anterior
  const fechaActual = new Date();
  const actualYear = fechaActual.getFullYear();
  const mesActualNum = fechaActual.getMonth() + 1
  console.log(`mesActualNum: ${mesActualNum}`)
  
  // Calcular el mes anterior
  let beforeYear = actualYear;
  let mesAnteriorNum = mesActualNum - 1;
  
  if (mesAnteriorNum === 0) {
    mesAnteriorNum = 12;
    beforeYear--;
  }
  
  // Formatear meses como strings YYYY-MM
  const mesActual = `${actualYear}-${String(mesActualNum).padStart(2, '0')}`;
  const mesAnterior = `${beforeYear}-${String(mesAnteriorNum).padStart(2, '0')}`;
  
  try {
    // Obtener los pedidos (reemplaza esta llamada con tu método real de acceso a datos)
    const pedidos = orders;
    
    // Filtrar pedidos del mes actual
    const pedidosMesActual = pedidos.filter(pedido => {
      return pedido.fecha_servicio.startsWith(mesActual);
    });
    
    // Filtrar pedidos del mes anterior
    const pedidosMesAnterior = pedidos.filter(pedido => {
      return pedido.fecha_servicio.startsWith(mesAnterior);
    });
    
    // Calcular totales
    const totalMesActual = pedidosMesActual.reduce((sum, pedido) => sum + pedido.monto, 0);
    const totalMesAnterior = pedidosMesAnterior.reduce((sum, pedido) => sum + pedido.monto, 0);
    
    // Calcular variación porcentual
    let variacionPorcentual = null;
    
    if (totalMesAnterior > totalMesActual) { //si el mes anterior era mayor entonces el actual bajo su ingreso
      variacionPorcentual = ((1-(totalMesActual / totalMesAnterior)) * 100) * -1;
    } else if (totalMesAnterior < totalMesActual) { //si el mes anterior era menor entonces el actual aumento su ingreso
      variacionPorcentual = ((totalMesActual / totalMesAnterior) - 1) * 100;
    } else {
      variacionPorcentual = 0;
    }
    
    return {
      mesActual,
      mesAnterior,
      totalMesActual,
      totalMesAnterior,
      variacionPorcentual
    };
  } catch (error) {
    console.error('Error al calcular la variación porcentual:', error);
    throw error;
  }
}

export function variacionPorcentualMesClientes(clients: Clients[]) {
    const fechaActual = new Date();
    const actualYear = fechaActual.getFullYear();
    const mesActualNum = fechaActual.getMonth() + 1

    // Calcular el mes anterior
    let beforeYear = actualYear;
    let mesAnteriorNum = mesActualNum - 1;

    if (mesAnteriorNum === 0) {
    mesAnteriorNum = 12;
    beforeYear--;
    }

    // Formatear meses como strings YYYY-MM
    const mesActual = `${actualYear}-${String(mesActualNum).padStart(2, '0')}`;
    const mesAnterior = `${beforeYear}-${String(mesAnteriorNum).padStart(2, '0')}`;

    try {
        // Obtener los clientes (reemplaza esta llamada con tu método real de acceso a datos)
        const clientes = clients;
        // Filtrar pedidos del mes actual
        const clientesMesActual = clientes.filter(cliente => {
            return cliente.createdat.startsWith(mesActual);
        });

        // Filtrar pedidos del mes anterior
        const clientesMesAnterior = clientes.filter(cliente => {
            return cliente.createdat.startsWith(mesAnterior);
        });

        // Calcular totales
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const totalMesActual = clientesMesActual.reduce((sum, _cliente) => sum + 1, 0);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const totalMesAnterior = clientesMesAnterior.reduce((sum, _cliente) => sum + 1, 0);
        // Calcular variación porcentual
        let variacionPorcentual = null;
        
        if (totalMesAnterior > totalMesActual) { //si el mes anterior era mayor entonces el actual bajo sus clientes
          variacionPorcentual = ((1-(totalMesActual / totalMesAnterior)) * 100) * -1;
          console.log('el actual bajo sus clientes')
        } else if (totalMesAnterior < totalMesActual) { //si el mes anterior era menor entonces el actual aumento sus clientes
          variacionPorcentual = ((totalMesActual / totalMesAnterior) - 1) * 100;
          console.log('el actual aumento sus clientes')
        } else {
          variacionPorcentual = 0;
        }

        return {
            mesActual,
            mesAnterior,
            totalMesActual,
            totalMesAnterior,
            variacionPorcentual
        };
    } catch (error) {
        console.error('Error al calcular la variación porcentual:', error);
        throw error;
    }
}

export function variacionPorcentualMesServicios(orders: Orders[]) {
  const fechaActual = new Date();
  const actualYear = fechaActual.getFullYear();
  const mesActualNum = fechaActual.getMonth() + 1
  console.log(`mesActualNum: ${mesActualNum}`)
  
  // Calcular el mes anterior
  let beforeYear = actualYear;
  let mesAnteriorNum = mesActualNum - 1;
  
  if (mesAnteriorNum === 0) {
    mesAnteriorNum = 12;
    beforeYear--;
  }
  
  // Formatear meses como strings YYYY-MM
  const mesActual = `${actualYear}-${String(mesActualNum).padStart(2, '0')}`;
  const mesAnterior = `${beforeYear}-${String(mesAnteriorNum).padStart(2, '0')}`;

  try {
    const pedidos = orders;
    
    // Filtrar pedidos del mes actual
    const pedidosMesActual = pedidos.filter(pedido => {
      return pedido.fecha_servicio.startsWith(mesActual) && pedido.estado === 'realizado';
    });
    
    // Filtrar pedidos del mes anterior
    const pedidosMesAnterior = pedidos.filter(pedido => {
      return pedido.fecha_servicio.startsWith(mesAnterior) && pedido.estado === 'realizado';
    });
    
    // Calcular totales
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const totalMesActual = pedidosMesActual.reduce((sum, _pedido) => sum + 1, 0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const totalMesAnterior = pedidosMesAnterior.reduce((sum, _pedido) => sum + 1, 0);
    console.log(`mes actual: ${totalMesActual}, mes anterior: ${totalMesAnterior}`)

    // Calcular variación porcentual
    let variacionPorcentual = null;
    
    if (totalMesAnterior > totalMesActual) { //si el mes anterior era mayor entonces el actual bajo su ingreso
      variacionPorcentual = ((1-(totalMesActual / totalMesAnterior)) * 100) * -1;
      console.log('el actual bajo sus servicios')
    } else if (totalMesAnterior < totalMesActual) { //si el mes anterior era menor entonces el actual aumento su ingreso
      variacionPorcentual = ((totalMesActual / totalMesAnterior) - 1) * 100;
      console.log('el actual aumento sus servicios')
    } else {
      variacionPorcentual = 0;
    }
    console.log(variacionPorcentual)

    return {
      mesActual,
      mesAnterior,
      totalMesActual,
      totalMesAnterior,
      variacionPorcentual
    };
  } catch (error) {
    console.error('Error al calcular la variación porcentual:', error);
    throw error;
  }
}

export const summarizeClientsByMonth = (clients: Clients[]) => {
  const clientCounts: { [key: string]: number } = {};

  clients.forEach(client => {
    const date = new Date(client.createdat);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' }); // Get the month name

    const key = `${year}-${month}`; // Create a unique key for each month of each year

    // Increment the count for this month
    if (clientCounts[key]) {
      clientCounts[key]++;
    } else {
      clientCounts[key] = 1;
    }
  });

  // Convert the counts into the desired format
  const result = Object.entries(clientCounts).map(([key, count]) => {
    const [year, month] = key.split('-');
    return {
      ano: parseInt(year),
      mes: month,
      cantidadClientes: count,
    };
  });

  return result;
};

export const summarizedOrdersByMonth = (orders: Orders[]) => {
  const filteredOrders = orders.filter(order => order.estado === 'realizado');
  const incomeCounts: { [key: string]: number } = {};

  filteredOrders.forEach(order => {
    const date = new Date(order.fecha_servicio);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' }); // Get the month name

    const key = `${year}-${month}`; // Create a unique key for each month of each year
    // Increment the count for this month
    if (incomeCounts[key]) {
      incomeCounts[key] += order.monto;
    } else {
      incomeCounts[key] = order.monto;
    }
  });  

  const result = Object.entries(incomeCounts).map(([key, count]) => {
    const [year, month] = key.split('-');
    return {
      ano: parseInt(year),
      mes: month,
      cantidadIngreso: count,
    };
  });

  return result;

}
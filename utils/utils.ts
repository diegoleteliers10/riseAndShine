export function combineDateTime(date: string, time: string): string {
    if (!date || !time) {
        return '';
    }

    // Simplemente concatenar la fecha y la hora
    return `${date}T${time}:00.000Z`;
}

export function variacionPorcentualMesIngresos(orders) {
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
    
    if (totalMesAnterior > 0) { //si el mes anterior era mayor entonces el actual bajo su ingreso
      variacionPorcentual = (((totalMesActual / totalMesAnterior) - 1) * 100)*-1;
    } else if (totalMesAnterior < 0) { //si el mes anterior era menor entonces el actual aumento su ingreso
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

export function variacionPorcentualMesClientes(clients) {
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
        const totalMesActual = clientesMesActual.reduce((sum, _cliente) => sum + 1, 0);
        const totalMesAnterior = clientesMesAnterior.reduce((sum, _cliente) => sum + 1, 0);

        // Calcular variación porcentual
        let variacionPorcentual = null;
        
        if (totalMesAnterior > 0) { //si el mes anterior era mayor entonces el actual bajo su ingreso
            variacionPorcentual = (((totalMesActual / totalMesAnterior) - 1) * 100)*-1;
        } else if (totalMesAnterior < 0) { //si el mes anterior era menor entonces el actual aumento su ingreso
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

export function variacionPorcentualMesServicios(orders){
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
    const totalMesActual = pedidosMesActual.reduce((sum, _pedido) => sum + 1, 0);
    const totalMesAnterior = pedidosMesAnterior.reduce((sum, _pedido) => sum + 1, 0);
    
    // Calcular variación porcentual
    let variacionPorcentual = null;
    
    if (totalMesAnterior > 0) { //si el mes anterior era mayor entonces el actual bajo su ingreso
        variacionPorcentual = (((totalMesActual / totalMesAnterior) - 1) * 100)*-1;
    } else if (totalMesAnterior < 0) { //si el mes anterior era menor entonces el actual aumento su ingreso
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
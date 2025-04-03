import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/client'

// GET /api/orders
export async function GET(request : Request) {
  const supabase = createClient()

  const token = request.headers.get('Authorization')?.split(' ')[1] // Obtener el token del encabezado
  const url = new URL(request.url)
  const dateParam = url.searchParams.get('date') // Get the date parameter from the query string

  if (!token && !dateParam) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    let query = supabase.from('pedidos').select(`
      *,
      cliente:cliente_id (nombre, email, telefono)
    `).order('id', { ascending: true })

    // If a date is provided, filter the orders by that date
    if (dateParam) {
      query = supabase.from('pedidos').select(`
        *,
        cliente:cliente_id (nombre, email, telefono)
      `)
      .gte('fecha_servicio', `${dateParam}T00:00:00.000Z`) // Inicio del día
      .lt('fecha_servicio', `${dateParam}T23:59:59.999Z`) // Fin del día
      .order('id', { ascending: true});
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Asegúrate de que la respuesta sea un array
    const responseData = Array.isArray(data) ? data : [data].filter(Boolean)

    return NextResponse.json(responseData, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const supabase = createClient()
  
  try {
    // Obtener los query params
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const newStatus = searchParams.get('newStatus')

    // Validar los parámetros
    if (!id || !newStatus) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos: id y newStatus' },
        { status: 400 }
      )
    }

    // Obtener el estado actual del pedido
    const { data: currentOrder } = await supabase
      .from('pedidos')
      .select('estado')
      .eq('id', id)
      .single()

    // Verificar si el estado actual es igual al nuevo estado
    if (currentOrder?.estado === newStatus) {
      return NextResponse.json(
        { error: `El estado nuevo (${newStatus}) es igual al estado actual. No se realizó ningún cambio.` },
        { status: 400 }
      )
    }

    // Actualizar el pedido en Supabase
    const { data, error } = await supabase
      .from('pedidos')
      .update({ estado: newStatus })
      .eq('id', id)
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({message: `Pedido con id ${id} actualizado con exito. Nuevo estado: ${newStatus}`,data:data}, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: `Error al procesar la solicitud, ${error}` },
      { status: 500 }
    )
  }
}
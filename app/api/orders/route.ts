import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/client'

// GET /api/orders
export async function GET(request: Request) {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .select(`
        *,
        cliente:cliente_id (nombre, email, telefono)
      `)
      .order('id', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Asegúrate de que la respuesta sea un array
    const responseData = Array.isArray(data) ? data : [data].filter(Boolean)

    return NextResponse.json(responseData, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
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

    return NextResponse.json({message: `Pedido con id ${id} actualizado con exito. Nuevo estado: ${newStatus}`}, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
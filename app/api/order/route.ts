import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/client'

// GET /api/orders
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createClient()

    console.log('Creando cliente con datos:', {
      nombre: body.nombre,
      email: body.email,
      telefono: body.telefono
    })

    // 1. Primero creamos el cliente
    const { data: clientData, error: clientError } = await supabase
      .from('clientes')
      .insert({
        nombre: body.nombre,
        email: body.email,
        telefono: body.telefono
      })
      .select()
      .single()

    if (clientError) {
      console.error('Error al crear cliente:', clientError)
      return NextResponse.json(
        { error: clientError.message },
        { status: 400 }
      )
    }

    console.log('Cliente creado:', clientData)
    console.log('Creando orden con datos:', {
      cliente_id: clientData.id,
      servicio: body.servicio,
      monto: body.monto,
      fecha_servicio: body.fecha_servicio,
    })

    // 2. Luego creamos el pedido usando el ID del cliente creado
    const { data: orderData, error: orderError } = await supabase
      .from('pedidos')
      .insert({
        cliente_id: clientData.id,
        servicio: body.servicio,
        monto: body.monto,
        fecha_servicio: body.fecha_servicio,
      })
      .select()

    if (orderError) {
      console.error('Error al crear orden:', orderError)
      return NextResponse.json(
        { error: orderError.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Cliente y orden creados exitosamente',
        client: clientData,
        order: orderData 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error general:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
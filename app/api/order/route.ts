import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/client'
// import ical from 'ical-generator';
// import { Resend } from 'resend';
// import ClientEmail from '@/components/mail/ClientEmail';

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

    //3. Creamos correos diferentes para enviarle tanto al cliente como a la empresa sobre el pedido
    // const eventDateObj = new Date(body.fecha_servicio);
    // const nextDayObj = new Date(body.fecha_servicio);
    // nextDayObj.setDate(nextDayObj.getDate() + 1);

    // const calendar = ical({
    //   prodId: '//Rise And Shine//Rise&ShineWeb//ES',
    //   events: [
    //     {
    //       start: eventDateObj,
    //       summary: 'Servicio de Limpieza',
    //       description: 'El servicio de limpieza ha sido agendado para el día ' + body.fecha_servicio,
    //       organizer: {
    //         name: 'Manuel José Zulueta',
    //         email: 'Mzuluetacomparini@gmail.com'
    //       }
    //     }
    //   ]
    // });

    // Generar el archivo .ics como string
    // const icsContent = calendar.toString();
    // const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    // const formattedDate = eventDateObj.toLocaleDateString();

    // Enviar el correo con el archivo .ics adjunto
    // const mailCliente = await resend.emails.send({
    //   from: `Rise & Shine <onboarding@resend.dev>`,
    //   to: [`${body.email}`],
    //   subject: `Servicio de Limpieza - ${formattedDate}`,
    //   react: await ClientEmail({
    //     customerName: body.nombre,
    //     orderNumber: orderData[0].id,
    //     serviceType: body.servicio,
    //     serviceDate: new Date(body.fecha_servicio).toLocaleDateString('es-ES'),
    //     totalAmount: body.monto,
    //     serviceTime: eventDateObj.getHours() + ':' + eventDateObj.getMinutes(),
    //     paymentMethod: '',
    //     paymentStatus: ''
    //   }),
    //   attachments: [
    //     {
    //       filename: 'event.ics',
    //       content: icsContent,
    //       contentType: 'text/calendar'
    //     }
    //   ]
    // });

    return NextResponse.json(
      { 
        message: 'Cliente y orden creados exitosamente, y correos enviado con exito',
        // mailEmpresa: mailEmpresa,falta crear el mail de empresa
        client: clientData,
        order: orderData 
      },
      { status: 201 }
    )

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: `Error al procesar la solicitud, ${error}` },
      { status: 500 }
    )
  }
}
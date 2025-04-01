import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/client'
import ical from 'ical-generator';
import { Resend } from 'resend';
import ClientEmail from '@/components/mail/ClientEmail';
import CompanyMail from '@/components/mail/EnterpriseMail';
import { format } from 'date-fns-tz';
import { addHours } from 'date-fns';

// GET /api/order
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('id');

  if (!orderId) {
    return new Response(JSON.stringify({ error: 'ID de pedido no proporcionado' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const supabase = createClient()

  try {

    const { data, error } = await supabase
      .from('pedidos')
      .select(`
        *,
        cliente:clientes(*)  // Esto asume que tienes una tabla 'clientes' y que 'cliente_id' es la clave foránea
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      throw error;
    }

    console.log(data)

    return NextResponse.json(data,
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: `Error al procesar la solicitud, ${error}` },
      { status: 500 }
    )
  }
}

//crear orden para guardar en la database
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
        direccion_servicio: body.direccion
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
    const eventDateObj = new Date(body.fecha_servicio); // Crear el objeto Date solo para manipulación
    const endDateObj = addHours(eventDateObj, 2); // Agregar 2 horas a la fecha de servicio

    // Extraer la hora en formato HH:mm
    const hours = eventDateObj.getUTCHours().toString().padStart(2, '0');
    const minutes = eventDateObj.getUTCMinutes().toString().padStart(2, '0');
    //extraer las horas finales formato HH:mm
    const endHours = endDateObj.getUTCHours().toString().padStart(2, '0');
    const endMinutes = endDateObj.getUTCMinutes().toString().padStart(2, '0');
    //extraer dia
    const date = endDateObj.toISOString().split('T')[0];

    const formattedEventDate = format(eventDateObj, 'd \'de\' MMMM \'de\' yyyy', { timeZone: 'UTC' });

    // // Crear el calendario
    const calendar = ical({
      prodId: '//Rise And Shine//Rise&ShineWeb//ES',
      events: [
        {
          start: `${date}T${hours}:${minutes}:00`,
          end: `${date}T${endHours}:${endMinutes}:00`,
          summary: `Servicio de Limpieza - ${formattedEventDate}`,
          description: `El servicio de limpieza ha sido agendado para el día ${formattedEventDate}`,
          organizer: {
            name: 'Manuel José Zulueta',
            email: 'Mzuluetacomparini@gmail.com'
          },
        }
      ]
    });

    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    // Enviar el correo con la hora original
    const mailCliente = await resend.emails.send({
      from: `Rise & Shine <no-reply@riseandshine.cl>`,
      to: [`${body.email}`],
      subject: `Servicio de Limpieza - ${formattedEventDate}`,
      react: await ClientEmail({
        customerName: body.nombre,
        orderNumber: orderData[0].id,
        serviceType: body.servicio,
        serviceDate: formattedEventDate,
        totalAmount: body.monto,
        serviceTime: `${hours}:${minutes}`, // Usa la hora original
        serviceLocation: body.direccion,
        paymentMethod: '',
        paymentStatus: ''
      }),
      attachments: [
        {
          filename: 'event.ics',
          content: calendar.toString(),
          contentType: 'text/calendar'
        }
      ]
    });


    const mailEmpresa = await resend.emails.send({
      from: `Rise & Shine <no-reply@riseandshine.cl>`,
      to: [`r.shine1090@outlook.com`],
      subject: `Servicio de Limpieza - ${formattedEventDate}`,
      react: await CompanyMail({
        customerName: body.nombre,
        customerEmail: body.email,
        customerPhone: body.telefono,
        orderNumber: orderData[0].id,
        serviceType: body.servicio,
        serviceDate: formattedEventDate,
        totalAmount: body.monto,
        serviceTime: `${hours}:${minutes}`,
        serviceLocation: body.direccion,
        paymentMethod: '',
        paymentStatus: ''
      }),
      attachments: [
        {
          filename: 'event.ics',
          content: calendar.toString(),
          contentType: 'text/calendar'
        }
      ]
    });

    return NextResponse.json(
      { 
        message: 'Cliente y orden creados exitosamente, y correos enviado con exito',
        mailCliente: mailCliente,
        mailEmpresa: mailEmpresa,
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
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Package, User, Mail, CreditCard } from 'lucide-react';
import { format } from 'date-fns-tz';

interface OrderDetails {
  id: number;
  cliente_id: number;
  monto: number;
  fecha_pedido: string;
  fecha_servicio: string;
  estado: string;
  servicio: string;
  direccion_servicio: string;
  cliente: {
    nombre: string;
    email: string;
  };
}

// Puedes definir metadatos para la página
export const metadata: Metadata = {
  title: 'Detalles de la Reserva',
  description: 'Detalles de la reserva del cliente',
};

const OrderDetailsPage = async ({ params }: { params: Promise<{ orderNumber: string }> }) => {
  // Esperar a que params se resuelva
  const { orderNumber } = await params;

  let orderDetails: OrderDetails | null = null;

  const formatDate = (dateString: string) => {
    // Crear un objeto Date a partir de la cadena
    const date = new Date(dateString);

    // Formatear la fecha y la hora
    const formattedDate = format(date, 'd \'de\' MMMM \'de\' yyyy', { timeZone: 'UTC' });
    
    // Extraer la hora en formato HH:mm
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${formattedDate}, ${hours}:${minutes}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  try {
    const response = await fetch(`http://www.riseandshine.cl/api/order?id=${orderNumber}`);
    if (!response.ok) {
      throw new Error('Error al obtener los detalles del pedido');
    }
    orderDetails = await response.json();
  } catch (error) {
    console.error(error);
  }

  if (!orderDetails) {
    notFound(); // Redirige a una página 404 si no se encuentran detalles
  }

  return (
<div className="min-h-screen bg-gradient-to-b from-[#99b1eb]/10 to-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#49597c]">Detalles de la Reserva</h1>
          <p className="text-[#49597c]/70">Pedido #{orderDetails.id}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-[#99b1eb]/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#3268bb] flex items-center gap-2">
                <User className="w-5 h-5" />
                Información del Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#49597c]">
                  <User className="w-4 h-4" />
                  <span className="font-medium">Nombre</span>
                </div>
                <p className="text-[#49597c]/80 pl-6">{orderDetails.cliente.nombre}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#49597c]">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">Email</span>
                </div>
                <p className="text-[#49597c]/80 pl-6">{orderDetails.cliente.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#99b1eb]/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#3268bb] flex items-center gap-2">
                <Package className="w-5 h-5" />
                Detalles del Servicio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#49597c]">
                  <Package className="w-4 h-4" />
                  <span className="font-medium">Servicio</span>
                </div>
                <Badge variant="secondary" className="bg-[#99b1eb]/20 text-[#3268bb] hover:bg-[#99b1eb]/30">
                  {orderDetails.servicio}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#49597c]">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Dirección</span>
                </div>
                <p className="text-[#49597c]/80 pl-6">{orderDetails.direccion_servicio?.toLowerCase()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#99b1eb]/20 shadow-lg md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#3268bb] flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                Detalles de la Reserva
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#49597c]">
                    <CalendarDays className="w-4 h-4" />
                    <span className="font-medium">Fecha de Servicio</span>
                  </div>
                  <p className="text-[#49597c]/80 pl-6">{formatDate(orderDetails.fecha_servicio)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#49597c]">
                    <CreditCard className="w-4 h-4" />
                    <span className="font-medium">Monto</span>
                  </div>
                  <p className="text-[#49597c]/80 pl-6 text-lg font-semibold">
                    ${formatCurrency(orderDetails.monto)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl font-bold text-[#49597c]">Detalles de la Dirección</h1>
          <p className="text-[#49597c]/70">El servicio se realizara en la siguiente dirección <b>{orderDetails.direccion_servicio?.toUpperCase()}</b></p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

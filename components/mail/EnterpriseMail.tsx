import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface EmailTemplateProps {
  customerName: string
  customerEmail?: string
  customerPhone?: string
  orderNumber: string
  serviceType: string
  serviceDate: string
  serviceTime: string
  totalAmount: string
  paymentMethod: string
  paymentStatus: string
  serviceLocation: string
  orderDateTime?: string
  companyName?: string
  companyLogo?: string
  companyPhone?: string
  companyEmail?: string
  companyAddress?: string
}


const CompanyMail: React.FC<EmailTemplateProps> = ({ 
  orderNumber,
  customerName,
  customerPhone,
  serviceType,
  serviceDate,
  serviceTime,
  totalAmount,
  serviceLocation
}) => {
  const priceFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(parseInt(totalAmount));


  return (
    <Html>
      <Head />
      <Preview>Rise & Shine: Nueva asignación de servicio - {serviceDate} {serviceTime}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-[40px] bg-white p-[20px] rounded-[8px] shadow-sm max-w-[600px]">
            {/* Header */}
            <Section className="mt-[32px]">
              <Heading className="text-[24px] font-bold text-center text-blue-600 my-[16px]">
                Rise & Shine
              </Heading>
              <Text className="text-[16px] text-center text-gray-500 italic">
                Asignación de Servicio
              </Text>
            </Section>
            
            <Hr className="border border-gray-200 my-[20px]" />
            
            {/* Main Content */}
            <Section>
              <Heading className="text-[20px] font-bold text-gray-800 mb-[16px]">
                Nueva Asignación de Servicio
              </Heading>
              
              <Text className="text-[16px] text-gray-700 mb-[16px]">
                Hola Equipo Rise&Shine,
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-[16px]">
                Se ha asignado un nuevo servicio de lavado. A continuación encontrarán todos los detalles para realizar el trabajo:
              </Text>
              
              <Section className="bg-blue-50 p-[16px] rounded-[8px] my-[24px] border-l-[4px] border-blue-500">
                <Text className="text-[16px] font-bold text-gray-800 mb-[8px]">
                  Información del Servicio:
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Id de Servicio:</strong> {orderNumber}
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Tipo de Servicio:</strong> {serviceType}
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Fecha:</strong> {serviceDate}
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Hora:</strong> {serviceTime} hrs
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Precio:</strong> {priceFormateado}
                </Text>
              </Section>
              
              <Section className="bg-gray-50 p-[16px] rounded-[8px] my-[24px]">
                <Text className="text-[16px] font-bold text-gray-800 mb-[8px]">
                  Información del Cliente y Ubicación:
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Cliente:</strong> {customerName}
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Teléfono:</strong> {customerPhone}
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Dirección:</strong> {serviceLocation}
                </Text>
              </Section>
              
              <Text className="text-[16px] text-gray-700 mb-[16px]">
                <strong>Importante:</strong> Recuerda llegar 5 a 10 minutos antes de la hora programada para preparar todo el equipo necesario.
              </Text>
            </Section>
            
            <Hr className="border border-gray-200 my-[32px]" />
            
            {/* Checklist */}
            <Section>
              <Heading className="text-[18px] font-bold text-gray-800 mb-[16px]">
                Lista de Verificación:
              </Heading>
              
              <Text className="text-[15px] text-gray-700 my-[4px]">
                ✓ Llevar todos los productos necesarios para {serviceType}
              </Text>
              <Text className="text-[15px] text-gray-700 my-[4px]">
                ✓ Verificar equipo de limpieza y herramientas
              </Text>
              <Text className="text-[15px] text-gray-700 my-[4px]">
                ✓ Tener disponible la factura/boleta para el cliente
              </Text>
              <Text className="text-[15px] text-gray-700 my-[4px]">
                ✓ Revisar ruta y tiempo estimado de llegada
              </Text>
            </Section>
            
            <Hr className="border border-gray-200 my-[32px]" />
            
            {/* Contact Info */}
            <Section>
              <Text className="text-[14px] text-gray-600 text-center">
                Si necesitas asistencia, contacta a la oficina central al <a href="tel:+56987654321" className="text-blue-600">+569 8765 4321</a>
              </Text>
              
              <Text className="text-[14px] text-gray-600 text-center mt-[16px]">
                Recuerda que la satisfacción del cliente es nuestra prioridad.
              </Text>
              
              <Hr className="border border-gray-200 my-[20px]" />
              
              <Text className="text-[12px] text-gray-500 text-center m-0">
                Rise & Shine.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                © {new Date().getFullYear()} Rise & Shine. Todos los derechos reservados.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                Este correo contiene información confidencial para uso exclusivo del personal de Rise & Shine.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// Email.PreviewProps = {
//   employeeName: "Juan Pérez",
//   customerName: "Carlos Rodríguez",
//   customerPhone: "+56 9 8765 4321",
//   serviceType: "Lavado Premium + Encerado",
//   serviceDate: "28 de marzo de 2025",
//   serviceTime: "15:30",
//   servicePrice: "$15.000",
//   serviceLocation: "Av. Providencia 1234, Santiago"
// };

export default CompanyMail;
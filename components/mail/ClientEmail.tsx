import * as React from 'react';
import {
  Body,
  Button,
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

export const ClientEmail: React.FC<EmailTemplateProps> = ({
  customerName,
  orderNumber,
  serviceType,
  serviceDate,
  serviceTime,
  totalAmount,
  serviceLocation,
  companyName = "Rise & Shine",
  companyPhone = "+56 9 92187281",
  companyEmail = "r.shine1090@outlook.com",
}) => {
  const priceFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(parseInt(totalAmount));

  return (
    <Html>
      <Head />
      <Preview>Rise & Shine: Confirmación de su servicio de lavado de auto #{orderNumber}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-[40px] bg-white p-[20px] rounded-[8px] shadow-sm max-w-[600px]">
            {/* Header */}
            <Section className="mt-[32px]">
              <Heading className="text-[24px] font-bold text-center text-blue-600 my-[16px]">
                {companyName}
              </Heading>
              <Text className="text-[16px] text-center text-gray-500 italic">
                Expertos en limpieza automotriz
              </Text>
            </Section>
            
            <Hr className="border border-gray-200 my-[20px]" />
            
            {/* Main Content */}
            <Section>
              <Heading className="text-[20px] font-bold text-gray-800 mb-[16px]">
                ¡Gracias por su compra!
              </Heading>
              
              <Text className="text-[16px] text-gray-700 mb-[16px]">
                Hola {customerName},
              </Text>
              
              <Text className="text-[16px] text-gray-700 mb-[16px]">
                Le confirmamos que su reserva para nuestro servicio de <strong>{serviceType}</strong> ha sido registrada exitosamente. A continuación, encontrará los detalles de su compra:
              </Text>
              
              <Section className="bg-gray-50 p-[16px] rounded-[8px] my-[24px]">
                <Text className="text-[16px] font-bold text-gray-800 mb-[8px]">
                  Detalles del Servicio:
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>N° de Orden:</strong> {orderNumber}
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Servicio:</strong> {serviceType}
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Fecha:</strong> {serviceDate}
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Hora:</strong> {serviceTime} hrs
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Dirección:</strong> {serviceLocation}
                </Text>
                <Text className="text-[15px] text-gray-700 my-[4px]">
                  <strong>Precio Total:</strong> {priceFormateado}
                </Text>
              </Section>
              
              <Text className="text-[16px] text-gray-700 mb-[16px]">
                Para garantizar un servicio óptimo, le recomendamos:
              </Text>

              <Text className="text-[15px] text-gray-700 my-[4px]">
                • Retirar objetos personales del vehículo antes del servicio
              </Text>
              <Text className="text-[15px] text-gray-700 my-[4px]">
                • Informarnos sobre cualquier área que requiera atención especial
              </Text>
              <Text className="text-[15px] text-gray-700 my-[4px]">
                • Llegar 5-10 minutos antes de su cita programada
              </Text>
              <Text className="text-[15px] text-gray-700 my-[4px]">
                • Para cancelaciones, por favor avise con al menos 24 horas de anticipación
              </Text>
              
              <Button
                className="bg-blue-600 text-white font-bold py-[12px] px-[20px] rounded-[4px] text-[14px] no-underline text-center block box-border mt-[24px]"
                href="https://www.riseandshine.cl/mi-reserva"
              >
                Ver mi reserva
              </Button>
            </Section>
            
            <Hr className="border border-gray-200 my-[32px]" />
            {/* Footer */}
            <Section>
              <Text className="text-[14px] text-gray-600 text-center">
                ¿Tiene alguna pregunta? Contáctenos al <a href={`tel:${companyPhone}`} className="text-blue-600">{companyPhone}</a> o por correo a <a href={`mailto:${companyEmail}`} className="text-blue-600">{companyEmail}</a>
              </Text>
              
              <Text className="text-[14px] text-gray-600 text-center mt-[16px]">
                Síganos en nuestras redes sociales para conocer promociones exclusivas:
              </Text>
              
              <Text className="text-[14px] text-gray-600 text-center">
                <a href="https://instagram.com/rise.and.shine.co" className="text-blue-600 mx-[8px]">Instagram</a>
              </Text>
              
              <Hr className="border border-gray-200 my-[20px]" />
              
              <Text className="text-[12px] text-gray-500 text-center m-0">
                © {new Date().getFullYear()} {companyName}. Todos los derechos reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ClientEmail;


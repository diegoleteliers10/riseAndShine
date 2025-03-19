import type React from "react"
import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"

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
  serviceTime = "10:00 AM",
  totalAmount,
  companyName = "Rise & Shine",
  companyLogo = "/pictures/logo.webp",
  companyPhone = "+56 9 92187281",
  companyEmail = "r.shine1090@outlook.com",
}) => {
  const previewText = `Confirmación de Servicio #${orderNumber} - ${companyName}`

  // Definición de colores
  const colors = {
    cloudLight: "#99b1eb",
    cloud: "#3268bb",
    cloudDark: "#49597c",
    white: "#ffffff",
    lightGray: "#f8f9fa",
    borderColor: "#e9ecef",
  }

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={{ ...main, backgroundColor: colors.lightGray }}>
        <Container style={container}>
          {/* Header with logo */}
          <Section style={{ ...logoContainer, backgroundColor: colors.cloud }}>
            <Img src={companyLogo || "/placeholder.svg"} width="200" height="60" alt={companyName} style={logo} />
          </Section>

          {/* Greeting */}
          <Section style={section}>
            <Heading style={{ ...heading, color: colors.cloud }}>¡Gracias por su pedido!</Heading>
            <Text style={{ ...paragraph, color: colors.cloudDark }}>
              Hola <span style={{ fontWeight: "bold" }}>{customerName}</span>,
            </Text>
            <Text style={{ ...paragraph, color: colors.cloudDark }}>
              Hemos recibido su solicitud de servicio de limpieza para su vehículo. A continuación encontrará los
              detalles de su pedido:
            </Text>
          </Section>

          {/* Order details */}
          <Section style={{ ...orderDetailsContainer, backgroundColor: colors.white }}>
            <Heading as="h2" style={{ ...subheading, color: colors.cloud }}>Detalles del Servicio</Heading>

            <Row style={orderRow}>
              <Column style={orderLabelColumn}>Número de Orden:</Column>
              <Column style={orderValueColumn}>{orderNumber}</Column>
            </Row>

            <Row style={orderRow}>
              <Column style={orderLabelColumn}>Tipo de Servicio:</Column>
              <Column style={orderValueColumn}>{serviceType}</Column>
            </Row>

            <Row style={orderRow}>
              <Column style={orderLabelColumn}>Fecha:</Column>
              <Column style={orderValueColumn}>{serviceDate}</Column>
            </Row>

            <Row style={orderRow}>
              <Column style={orderLabelColumn}>Hora:</Column>
              <Column style={orderValueColumn}>{serviceTime}</Column>
            </Row>

            <Hr style={{ ...divider, borderColor: colors.borderColor }} />

            <Row style={orderRow}>
              <Column style={orderLabelColumn}>Total:</Column>
              <Column style={orderValueColumn}>
                <strong>{totalAmount}</strong>
              </Column>
            </Row>
          </Section>

          {/* Recommendations */}
          <Section style={section}>
            <Heading as="h2" style={{ ...subheading, color: colors.cloud }}>Recomendaciones</Heading>
            <Text style={{ ...paragraph, color: colors.cloudDark }}>
              Para obtener los mejores resultados de nuestro servicio, le recomendamos:
            </Text>
            <ul style={list}>
              <li style={listItem}>Retirar objetos personales del vehículo antes del servicio</li>
              <li style={listItem}>Informarnos sobre cualquier área que requiera atención especial</li>
              <li style={listItem}>Llegar 5-10 minutos antes de su cita programada</li>
              <li style={listItem}>Para cancelaciones, por favor avise con al menos 24 horas de anticipación</li>
            </ul>
          </Section>

          {/* Call to action */}
          <Section style={ctaContainer}>
            <Link href="#" style={{ ...button, backgroundColor: colors.cloud }}>
              Ver Detalles de la Orden
            </Link>
          </Section>

          {/* Footer */}
          <Section style={{ ...footer, backgroundColor: colors.cloudDark }}>
            <Text style={{ ...footerText, color: colors.white }}>
              Si tiene alguna pregunta o necesita asistencia, no dude en contactarnos:
            </Text>
            <Text style={{ ...footerText, color: colors.white }}>
              Teléfono: {companyPhone} | Email: {companyEmail}
            </Text>
            <Hr style={{ ...divider, borderColor: colors.borderColor }} />
            <Text style={{ ...copyright, color: colors.borderColor }}>
              © {new Date().getFullYear()} {companyName}. Todos los derechos reservados.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  padding: "20px",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0 0 0 0",
  maxWidth: "600px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  overflow: "hidden",
}

const section = {
  padding: "24px 32px",
  marginBottom: "24px",
}

const logoContainer = {
  padding: "24px",
  textAlign: "center" as const,
  borderBottom: "1px solid #e9ecef",
}

const logo = {
  margin: "0 auto",
  filter: "brightness(0) invert(1)",
}

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "16px",
  marginTop: "0",
}

const subheading = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "16px",
  marginTop: "0",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "16px",
}

const orderDetailsContainer = {
  padding: "24px 32px",
  margin: "0 32px 24px 32px",
  borderRadius: "8px",
}

const orderRow = {
  marginBottom: "12px",
  display: "flex",
  flexDirection: "row" as const,
}

const orderLabelColumn = {
  width: "40%",
  fontSize: "14px",
}

const orderValueColumn = {
  width: "60%",
  fontSize: "14px",
}

const divider = {
  margin: "16px 0",
  borderWidth: "1px",
  borderStyle: "solid",
}

const list = {
  paddingLeft: "0",
  margin: "0 0 24px",
  listStyleType: "none",
}

const listItem = {
  fontSize: "14px",
  lineHeight: "24px",
  marginBottom: "12px",
  display: "flex",
}

const ctaContainer = {
  padding: "24px 32px",
  textAlign: "center" as const,
  marginBottom: "24px",
}

const button = {
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
}

const footer = {
  padding: "32px 24px",
  borderTop: "1px solid #e9ecef",
}

const footerText = {
  fontSize: "14px",
  lineHeight: "20px",
  marginBottom: "8px",
  textAlign: "center" as const,
}

const copyright = {
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  marginTop: "16px",
  marginBottom: "0",
}

export default ClientEmail


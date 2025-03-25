import { Metadata } from 'next'
import HomeLayout from '@/components/layout/homeLayout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export const metadata: Metadata = {
  title: 'Política de Privacidad | Rise and Shine',
  description: 'Política de privacidad de Rise and Shine - Protegemos la privacidad y seguridad de nuestros clientes',
}

export default function Politicas() {
  return (
    <HomeLayout>
      <div className="pt-24 bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Política de Privacidad</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Encabezado */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-cloud-dark mb-4">
                Política de Privacidad – Rise and Shine
              </h1>
              <div className="h-1 w-20 bg-cloud mx-auto"></div>
            </div>

            {/* Introducción */}
            <div className="mb-8 text-cloud-dark/80">
              <p>En Rise and Shine, nos comprometemos a proteger la privacidad y seguridad de nuestros clientes. A continuación, detallamos cómo recopilamos, usamos y protegemos su información.</p>
            </div>

            {/* Contenido */}
            <div className="space-y-8">
              {/* Sección 1 */}
              <section>
                <h2 className="text-xl font-semibold text-cloud-dark mb-4">
                  1. Información que Recopilamos
                </h2>
                <div className="space-y-4 text-cloud-dark/80">
                  <p>Para prestar nuestros servicios, podemos recopilar la siguiente información:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Datos personales: Nombre, número de teléfono, dirección de domicilio.</li>
                    <li>Datos de contacto: Correo electrónico y otros medios de comunicación proporcionados por el cliente.</li>
                    <li>Datos de pago: Si el cliente paga a través de nuestra plataforma en línea, se recopilará información de pago de forma segura.</li>
                    <li>Datos del vehículo: Fotografías del vehículo antes del servicio para documentar su estado y evitar disputas sobre daños preexistentes.</li>
                  </ul>
                </div>
              </section>

              {/* Sección 2 */}
              <section>
                <h2 className="text-xl font-semibold text-cloud-dark mb-4">
                  2. Uso de la Información
                </h2>
                <div className="space-y-4 text-cloud-dark/80">
                  <p>La información recopilada se utiliza exclusivamente para:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Gestionar reservas y prestar nuestros servicios de lavado de autos a domicilio.</li>
                    <li>Contactar a los clientes para confirmar citas, reprogramaciones o atender consultas.</li>
                    <li>Procesar pagos y emitir comprobantes cuando sea necesario.</li>
                    <li>Mejorar nuestros servicios y experiencia del cliente.</li>
                  </ul>
                </div>
              </section>

              {/* Sección 3 */}
              <section>
                <h2 className="text-xl font-semibold text-cloud-dark mb-4">
                  3. Protección y Almacenamiento de Datos
                </h2>
                <div className="space-y-2 text-cloud-dark/80">
                  <p>La información personal se almacena de manera segura y solo es accesible por personal autorizado.</p>
                  <p>No compartimos, vendemos ni divulgamos la información de nuestros clientes a terceros, excepto cuando sea necesario para procesar pagos o cumplir con obligaciones legales.</p>
                </div>
              </section>

              {/* Sección 4 */}
              <section>
                <h2 className="text-xl font-semibold text-cloud-dark mb-4">
                  4. Derechos del Cliente
                </h2>
                <div className="space-y-4 text-cloud-dark/80">
                  <p>Los clientes tienen derecho a:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Solicitar acceso a su información personal.</li>
                    <li>Pedir la corrección o eliminación de sus datos si ya no desean utilizar nuestros servicios.</li>
                    <li>Oponerse al uso de su información para ciertos fines, como promociones o publicidad.</li>
                  </ul>
                  <p>Para ejercer estos derechos, pueden contactarnos a través de nuestra página web o WhatsApp.</p>
                </div>
              </section>

              {/* Sección 5 */}
              <section>
                <h2 className="text-xl font-semibold text-cloud-dark mb-4">
                  5. Cambios en la Política de Privacidad
                </h2>
                <div className="space-y-2 text-cloud-dark/80">
                  <p>Podemos actualizar esta política en cualquier momento para mejorar la protección de la información del cliente. Cualquier cambio será notificado a través de nuestra página web o por los medios de contacto registrados.</p>
                </div>
              </section>
            </div>

            {/* Pie de página */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-cloud-dark/60 text-center">
                Última actualización: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}
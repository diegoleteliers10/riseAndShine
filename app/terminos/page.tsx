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
// import Link from "next/link"

export const metadata: Metadata = {
  title: 'Términos y Servicios | Rise and Shine',
  description: 'Términos y condiciones de servicio de Rise and Shine - Lavado de autos a domicilio en Santiago de Chile y Chicureo',
}

export default function Terminos() {
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
                  <BreadcrumbPage>Términos y Servicios</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Encabezado */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-cloud-dark mb-4">
                Términos y Servicios – Rise and Shine
              </h1>
              <div className="h-1 w-20 bg-cloud mx-auto"></div>
            </div>

            {/* Contenido */}
            <div className="space-y-8">
              {/* Sección 1 */}
              <section>
                <h2 className="text-xl font-semibold text-cloud-dark mb-4">
                  1. Ámbito de Servicio
                </h2>
                <div className="space-y-2 text-cloud-dark/80">
                  <p>Rise and Shine ofrece lavado de autos a domicilio en Santiago de Chile y Chicureo.</p>
                  <p>El servicio se realiza únicamente en casas que cuenten con salida de agua o donde se pueda hacer lavado en seco, según preferencia del cliente.</p>
                </div>
              </section>

              {/* Sección 2 */}
              <section>
                <h2 className="text-xl font-semibold text-cloud-dark mb-4">
                  2. Servicios y Precios
                </h2>
                <div className="space-y-4 text-cloud-dark/80">
                  <p>Nuestros servicios incluyen:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Lavado Exterior: $10.000</li>
                    <li>Lavado Interior: $12.000</li>
                    <li>Lavado Full (interior + exterior): $20.000</li>
                  </ul>
                  <p>Si el vehículo está en muy mal estado (exceso de suciedad, barro o mal olor), se aplicará un costo adicional, que será informado antes de iniciar el servicio.</p>
                  <p>Para vehículos superdeportivos, el precio varía y será acordado con el cliente previamente.</p>
                </div>
              </section>

              {/* Sección 3 */}
              <section>
                <h2 className="text-xl font-semibold text-cloud-dark mb-4">
                  3. Tiempo Estimado del Servicio
                </h2>
                <p className="text-cloud-dark/80">
                  Un lavado promedio dura aproximadamente 2 horas, dependiendo de la cantidad de vehículos y el tipo de servicio solicitado.
                </p>
              </section>

              {/* Sección 4 */}
              <section>
                <h2 className="text-xl font-semibold text-cloud-dark mb-4">
                  4. Reservas y Pagos
                </h2>
                <div className="space-y-2 text-cloud-dark/80">
                  <p>Los clientes pueden agendar su servicio a través de nuestra página web o mediante contacto directo.</p>
                  <p>El pago puede realizarse al finalizar el servicio en efectivo y tranferencia o mediante nuestra plataforma en línea.</p>
                </div>
              </section>

              {/* Sección 5 */}
              <section>
                <h2 className="text-xl font-semibold text-cloud-dark mb-4">
                  5. Política de Cancelación y Reprogramación
                </h2>
                <div className="space-y-2 text-cloud-dark/80">
                  <p>Las cancelaciones o reprogramaciones deben notificarse con al menos 24 horas de anticipación.</p>
                  <p>Si la cancelación se realiza con menos de 24 horas de aviso, se cobrará el 50% del servicio, salvo en casos de emergencia comprobada.</p>
                </div>
              </section>

              {/* Sección 6 */}
              <section>
                <h2 className="text-xl font-semibold text-cloud-dark mb-4">
                  6. Responsabilidad y Garantía
                </h2>
                <div className="space-y-4 text-cloud-dark/80">
                  <p>No nos hacemos responsables por la pérdida o robo de artículos dentro del vehículo. Se recomienda retirar objetos de valor antes del lavado.</p>
                  <div>
                    <p className="font-medium mb-2">Condiciones del vehículo:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Aceptamos vehículos con daños preexistentes, pero se tomarán fotografías previas antes de iniciar el servicio.</li>
                      <li>No nos hacemos responsables por daños preexistentes, a menos que se demuestre que fueron causados directamente por nuestro servicio.</li>
                    </ul>
                  </div>
                  <p>Garantía de Satisfacción: Si el cliente no queda conforme con el servicio, ofrecemos un segundo lavado a mitad de precio.</p>
                </div>
              </section>

              {/* Sección 7 */}
              <section>
                <h2 className="text-xl font-semibold text-cloud-dark mb-4">
                  7. Contacto y Atención al Cliente
                </h2>
                <p className="text-cloud-dark/80">
                  Para dudas, reclamos o reprogramaciones, los clientes pueden contactarnos a través de WhatsApp, redes sociales o nuestra página web.
                </p>
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
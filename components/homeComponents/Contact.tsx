import Image from "next/image";
import { DatePickerDemo } from "@/components/homeComponents/contact/DatePicker";

export default function Contact() {
  return (
    <section id="contacto" className="w-full py-9 md:py-20">
      <div className="px-20">
        <div className="flex md:flex-row flex-col items-center gap-8">
          <div className="flex flex-col space-y-4">
            <h2 className="section_title">Contáctanos</h2>
            <p className="section_subtitle">
              Estamos aquí para atender todas tus consultas. Contáctanos por
              cualquiera de estos medios o visítanos en nuestro local.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-cloud mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="contact_text">Av. Principal 123, Ciudad</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-cloud mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span className="contact_text">+1 234 567 890</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-cloud mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="contact_text">info@autospaelite.com</span>
              </div>
            </div>
            <Image
              alt="Selection Ilustration"
              src="/selectionIlustration.svg"
              width={350}
              height={350}
              className="mt-10"
            />
          </div>
          <div
            className="md:w-1/2 bg-white rounded-lg shadow-lg p-8 border border-cloud/20"
            data-aos="fade-left"
          >
            <h3 className="text-2xl font-bold text-cloud-dark mb-6">
              Agenda tu Lavado
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-cloud-dark mb-2">Nombre</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cloud"
                  placeholder="Ej. Juan Perez"
                />
              </div>
              <div>
                <label className="block text-cloud-dark mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cloud"
                  placeholder="Ej. xxxxx@xxxx.com"
                />
              </div>

              <div>
                <label className="block text-cloud-dark mb-2">Telefono</label>
                <input
                  type="text"
                  id="telefono"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cloud"
                  placeholder="Ej. +56 9 xxxxxxxx"
                />
              </div>
              {/* <!-- <div>
                <label className="block text-cloud-dark mb-2"
                  >Mensaje</label
                >
                <textarea
                  id="message"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cloud"
                  placeholder="Escribe tu mensaje aquí, junto con la hora a la que quieres que sea tu lavado"
                ></textarea>
              </div> --> */}
              <div>
                <label className="block text-cloud-dark mb-2"
                  >Elija su opción de precio</label
                >
                <select
                  id="pricing"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cloud text-cloud-dark/80"
                >
                  <option value="" defaultValue="" disabled>Elige tu servicio</option>
                  <option value="lavado-interior">Lavado Interior</option>
                  <option value="lavado-exterior">Lavado Exterior</option>
                  <option value="servicio-completo">Servicio Completo</option>
                </select>
              </div>
              <div>
                <label className="block text-cloud-dark mb-2"
                  >Selecciona tu fecha</label
                >
                <div className="w-full justify-center">
                  <DatePickerDemo />
                </div>
              </div>
              <p className="text-[10px] text-cloud-dark">
                *Si quieres dar alguna especificación del lavado, contáctanos por
                mensaje.
              </p>
              <button
                type="submit"
                className="w-full bg-cloud text-white py-2 rounded-full hover:bg-cloud-dark transition duration-300"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
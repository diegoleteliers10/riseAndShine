'use client'
import Image from "next/image";
import { DatePickerDemo } from "@/components/homeComponents/contact/DatePicker";
import { useState, FormEvent, Suspense, useId } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { combineDateTime } from "@/utils/utils";
import { Input } from "@/components/ui/input"

function ContactContent() {
  const [time_servicio, setTime] = useState('12:00');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading,setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Datos del cliente
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    // Datos de la orden
    servicio: '',
    precio: 0,
    fecha_servicio: '',
  });
  const searchParams = useSearchParams();
  const dateService = searchParams.get('fecha_servicio') || '';

  const combineDate = dateService && time_servicio 
    ? combineDateTime(dateService, time_servicio)
    : '';
  const id = useId();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    toast.custom(() => (
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-lg border border-cloud-light/20">
        <span className="loading loading-spinner loading-md"></span>
        <div>
          <p className="font-medium text-cloud-dark">Procesando pedido</p>
          <p className="text-sm text-cloud-dark/70">Tu pedido esta siendo procesado y agendado.</p>
        </div>
      </div>
    ), {
      duration: 3000,
      position: 'top-center'
    });

    // Extraer el precio del string del servicio seleccionado
    const precioStr = formData.servicio.split(' ')[1];
    const precio = parseInt(precioStr);
    console.log(precio)

    // Crear el objeto
    const bodyData = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion,
        servicio: formData.servicio.split(' ')[0],
        monto: precio,
        fecha_servicio: combineDate,
    };

    try {
      const response = await fetch('https://www.riseandshine.cl/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      // Limpiar el formulario después del éxito
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        servicio: '',
        precio: 0,
        fecha_servicio: '',
      });

      setLoading(false);

      toast.custom(() => (
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-lg border border-cloud-light/20">
          <CheckCircle className="w-5 h-5 text-cloud-dark" />
          <div>
            <p className="font-medium text-cloud-dark">Pedido Exitoso</p>
            <p className="text-sm text-cloud-dark/70">Tu pedido ha sido enviado con exito. Pronto nos pondremos en contacto.</p>
          </div>
        </div>
      ), {
        duration: 4000,
        position: 'top-center'
      });
    } catch (error) {
      console.error('Error:', error);
      setLoading(false)
      toast.custom(() => (
        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="font-medium text-red-600">Error</p>
            <p className="text-sm text-red-400">Tu pedido no pudo ser enviado. Por favor, intenta nuevamente.</p>
          </div>
        </div>
      ), {
        duration: 4000,
        position: 'top-center',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <section id="contacto" className="w-full py-9 md:py-20">
      <div className="px-8 lg:px-20">
        <div className="flex lg:flex-row flex-col items-center gap-8 justify-center">
          <div className="flex flex-col space-y-4">
            <h2 className="section_title">Contáctanos</h2>
            <p className="section_subtitle">
              Estamos aquí para atender todas tus consultas. Contáctanos por
              cualquiera de estos medios.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center lg:justify-normal">
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
                <span className="contact_text">+56 9 92187281</span>
              </div>
              <div className="flex items-center justify-center lg:justify-normal">
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
                <span className="contact_text">r.shine1090@outlook.com</span>
              </div>
            </div>
            <Image
              alt="Selection Ilustration"
              src="/selectionIlustration.svg"
              width={350}
              height={350}
              className="mt-10 object-cover xl:w-[610px] xl:h-[580px] mx-auto lg:mx-0"
            />
          </div>
          <div
            className="md:w-1/2 bg-white rounded-lg shadow-lg p-8 border border-cloud/20 aos-init"
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <h3 className="text-2xl font-bold text-cloud-dark mb-6">
              Agenda tu Lavado
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-cloud-dark mb-2">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cloud"
                  placeholder="Ej. Juan Perez"
                  required
                  aria-label="Nombre completo"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-cloud-dark mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cloud"
                  placeholder="Ej. xxxxx@xxxx.com"
                  required
                  aria-label="Correo electrónico"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-cloud-dark mb-2">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cloud"
                  placeholder="Ej. +56 9 xxxxxxxx"
                  required
                  aria-label="Número de teléfono"
                />
              </div>
              <div>
                <label htmlFor="direccion" className="block text-cloud-dark mb-2">Dirección del Lavado</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cloud"
                  placeholder="Ej. Av. Principal 123, Comuna"
                  required
                  aria-label="Dirección del servicio"
                />
              </div>
              <div>
                <label htmlFor="servicio" className="block text-cloud-dark mb-2">Elija su servicio</label>
                <select
                  id="servicio"
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-cloud text-cloud-dark/80"
                  required
                  aria-label="Tipo de servicio"
                >
                  <option value="" disabled>Elige tu servicio</option>
                  <option value="Interior 12000">Lavado Interior - $12.000</option>
                  <option value="Exterior 10000">Lavado Exterior - $10.000</option>
                  <option value="Completo 20000">Servicio Completo - $20.000</option>
                </select>
              </div>
              <div>
                <div>
                  <label className="block text-cloud-dark mb-2"
                    >Selecciona tu fecha</label
                  >
                  <div className="w-full justify-center">
                    <DatePickerDemo />
                  </div>
                </div>
                <div className="flex gap-3 flex-col">
                  <label htmlFor={id} className="block text-cloud-dark mb-2">Selecciona tu hora</label>
                  <div className="relative max-w-[240px]">
                    <Input
                      id={id}
                      name="time_servicio"
                      type="time"
                      step="60"
                      value={time_servicio}
                      onChange={(e) => {
                        const newTime = e.target.value;
                        console.log('Nueva hora seleccionada:', newTime);
                        setTime(newTime);
                      }}
                      className="peer ps-9 [&::-webkit-calendar-picker-indicator]:hidden border rounded-lg focus:outline-none text-cloud-dark/80 focus-visible:outline-none"
                      required
                      min="09:00"
                      max="20:00"
                      aria-label="Hora del servicio"
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                      <Clock size={16} strokeWidth={2} aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="md:text-[12px] xl:text-md text-cloud-dark">
                *Si quieres dar alguna especificación del lavado, contáctanos por
                mensaje.
              </p>
              <button
                type="submit"
                className="w-full h-[30px] bg-cloud text-white py-2 rounded-full hover:bg-cloud-dark transition duration-300 flex items-center justify-center"
                aria-label="Agendar Servicio"
                onClick={()=> setLoading(true)}
              >
                Agendar Servicio
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Contact() {
  return (
    <Suspense fallback={<div>Cargando formulario...</div>}>
      <ContactContent />
    </Suspense>
  );
}
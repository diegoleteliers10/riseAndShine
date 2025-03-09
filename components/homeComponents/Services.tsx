import { services } from "@/utils/data";

export default function Services() {
  return (
    <section id="servicios" className="w-full py-9 md:py-20 md:px-6">
      <div className="flex flex-col items-center px-10">
        <h2 className="section_title">Nuestros Servicios</h2>
        <p className="section_subtitle text-center">
          Nos enfocamos en brindarte una experiencia de limpieza
          unica para tu vehículo. Nuestros servicios están diseñados para
          satisfacer tus necesidades específicas, desde una limpieza exterior hasta
          una limpieza interior detallada. ¡Confía en nosotros para devolverle el
          brillo a tu vehículo!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {
            services.map((service, index) => (
              <div
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-cloud/20"
                data-aos="fade-down"
                data-aos-delay={index * 100}
                key={service.title}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-cloud-dark mb-2">
                  {service.title}
                </h3>
                <p className="text-cloud mb-4">{service.description}</p>
              </div>
            ))
          }
        </div>
      </div>
    </section>

  )
}
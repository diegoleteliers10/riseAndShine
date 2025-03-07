import Image from "next/image";


export default function Hero() {
  return (
    <section
      id="inicio"
      className="w-full py-12 md:py-24 bg-linear-to-b from-white to-cloud-light/20"
    >
      <div className="flex px-16">
        <div className="flex flex-col">
          <p className="hero_pretitle slogan" data-aos="fade-top" data-aos-delay="200">
            Deja las colas de lado, nosotros llegamos a ti!
          </p>
          <h1 className="hero_title" data-aos="fade-top" data-aos-delay="400">
            Hacemos brillar tu vehículo por dentro y por fuera
          </h1>
          <p className="hero_subtitle" data-aos="fade-top" data-aos-delay="600">
            En Rise & Shine nos especializamos en darle a tu auto el cuidado que
            merece, con servicios personalizados que se adaptan a tus necesidades.
          </p>
          <div className="flex md:items-center space-x-4 mt-6">
            <a
              href="#servicios"
              className="bg-cloud text-white rounded-full hover:bg-cloud-dark transition duration-300 button_hero py-3 px-6 border-cloud border-2 hover:border-cloud-dark"
            >
              Nuestros Servicios
            </a>
            <a
              href="#contacto"
              className="border-2 border-cloud text-cloud rounded-full hover:bg-cloud hover:text-white transition duration-300 button_hero py-3 px-6"
            >
              Contáctanos
            </a>
          </div>
        </div>
        <Image
          src="/carHero.png"
          alt="Rise & Shine"
          width={650}
          height={650}
          className="ml-auto relative left-10"
          loading="lazy"
          data-aos="fade-left"
        />
      </div>
    </section>
  )
}
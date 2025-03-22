import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="w-full pt-24 pb-18 md:py-24 xl:py-32 2xl:py-40 bg-linear-to-b from-white to-cloud-light/20"
    >
      <div className="flex flex-col lg:flex-row px-6 md:px-16">
        <div className="flex flex-col text-center lg:text-left justify-center lg:justify-none">
          <p className="hero_pretitle slogan" data-aos="fade-top" data-aos-delay="200">
            Deja las colas de lado, nosotros llegamos a ti!
          </p>
          <h1 className="hero_title" data-aos="fade-top" data-aos-delay="400">
            Hacemos brillar tu vehículo por dentro y por fuera
          </h1>
          <p className="hero_subtitle" data-aos="fade-top" data-aos-delay="600">
            En Rise & Shine nos especializamos en darle a tu auto el cuidado que
            merece, con servicios de alta calidad a precios accesibles.
          </p>
          <div className="flex justify-center lg:justify-normal space-x-4 mt-6">
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
          <p className="text-[12px] mt-4">* Valido solo para las comunas de las condes, vitacura, y lo barnechea.</p>
        </div>
        <Image
          src="/carHero.png"
          alt="Rise & Shine"
          width={650}
          height={650}
          className="object-cover md:ml-auto md:relative lg:left-10 2xl:w-[800px] 2xl:h-[700px]"
          loading="lazy"
          data-aos="fade-left"
        />
      </div>
    </section>
  )
}
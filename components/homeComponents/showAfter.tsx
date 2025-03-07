import { Slider } from "./images/imageSlide";


export default function showAfter() {
  return (
    <section
      className="w-full py-9 md:py-20 bg-linear-to-b to-white from-cloud-light/20"
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="section_title">
          No crees en los cambios? ¡Míralos por ti mismo!
        </h2>
        <p className="section_subtitle">
          Descubre cómo nuestros servicios pueden hacer la diferencia.
        </p>
        <Slider/>
      </div>
    </section>
  )
}
// import { Slider } from "./images/imageSlide";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/homeComponents/images/image-comparison";

export default function showAfter() {
  return (
    <section
      className="w-full pt-4 pb-18 md:py-20 px-6 lg:px-0 bg-linear-to-b to-white from-cloud-light/20"
    >
      <div className="flex flex-col items-center justify-center">
        <h2 className="section_title">
          No crees en los cambios? ¡Míralos por ti mismo!
        </h2>
        <p className="section_subtitle">
          Descubre cómo nuestros servicios pueden hacer la diferencia.
        </p>
        {/* <Slider/> */}
        <ImageComparison className="mt-5 aspect-[4/3] w-full rounded-lg border border-zinc-200 dark:border-zinc-800">
          <ImageComparisonImage
            src="/pictures/carBefore.webp"
            alt="Motion Primitives Dark"
            position="left"
          />
          <ImageComparisonImage
            src="/pictures/carAfter.webp"
            alt="Motion Primitives Light"
            position="right"
          />
          <ImageComparisonSlider className="w-2 bg-white/50 backdrop-blur-sm transition-colors hover:bg-white/80">
            <div className="absolute left-1/2 top-1/2 h-8 w-6 -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-white" />
          </ImageComparisonSlider>
        </ImageComparison>
      </div>
    </section>
  )
}


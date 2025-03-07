'use client'

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Definimos un array de imágenes de ejemplo
const images = [
  { src: "/pictures/car1.webp", alt: "Imagen 1" },
  { src: "/pictures/car2.webp", alt: "Imagen 2" },
  { src: "/pictures/car3.webp", alt: "Imagen 3" },
  { src: "/pictures/car4.webp", alt: "Imagen 4" },
  { src: "/pictures/car5.webp", alt: "Imagen 5" },
  { src: "/pictures/car6.webp", alt: "Imagen 6" },
]

export function ImageCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div data-aos="zoom-in">
      <div>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="border-none">
                <CardContent className="flex aspect-[6/3] items-center justify-center p-0 overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground">
        {current} de {count}
      </div>
      <div className="flex justify-center mt-2 space-x-1">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 ease-in-out",
              current === index + 1 ? "bg-cloud/70 w-4" : "bg-cloud-light/30"
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import React from 'react'
import { Car, Clock, Heart, Home, Star, Users } from 'lucide-react';
import HomeLayout from '@/components/layout/homeLayout';
import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Rise and Shine',
  description: 'Sobre nosotros de Rise and Shine - Servicio de lavado de autos a domicilio en Santiago de Chile sector oriente y Chicureo',
}

const AboutUs = () => {
  return (
    <HomeLayout>
      <div className="pt-24 bg-gray-50 py-12">
        <div className="max-w-full">

          <div className="mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Sobre Nosotros</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>


          <div className="min-h-screen bg-[#f8faff]">
            {/* Hero Section */}
            <div className="relative px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-[#3268bb] mb-6">Sobre Nosotros</h1>
                  <div className="w-24 h-1 bg-[#99b1eb] mx-auto mb-12"></div>
                </div>
              </div>
            </div>

            {/* Story Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 md:p-12">
                    <h2 className="text-3xl font-semibold text-[#3268bb] mb-6">Nuestra Historia</h2>
                    <div className="prose text-[#49597c] space-y-4">
                      <p className="leading-relaxed">
                        Mi nombre es Manuel José Zulueta y en 2021 fundé <b>Rise and Shine</b> con una misión clara:
                        <b> ofrecer una solución eficiente y de calidad para el lavado de autos a domicilio</b>.
                      </p>
                      <p className="leading-relaxed">
                        La idea nació al notar la gran cantidad de tiempo que las personas debían invertir en los centros de lavado
                        tradicionales, lo que me llevó a crear un servicio más cómodo, rápido y eficaz.
                      </p>
                      <p className="leading-relaxed">
                        Desde nuestros inicios, hemos trabajado arduamente para ganar la confianza de nuestros
                        clientes, mejorando continuamente nuestros productos, técnicas y eficiencia en cada
                        servicio.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      src="/pictures/fotoNosotros.webp"
                      width={500}
                      height={500}
                      alt="Car washing service"
                    className="h-[430px] w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Values Section */}
            <div className="bg-[#3268bb] py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 text-white">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <Clock className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Eficiencia</h3>
                    <p className="text-[#99b1eb]">Servicio rápido y profesional</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <Star className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Calidad</h3>
                    <p className="text-[#99b1eb]">Los mejores productos y técnicas</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <Heart className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Compromiso</h3>
                    <p className="text-[#99b1eb]">Dedicación en cada servicio</p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <Users className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Confianza</h3>
                    <p className="text-[#99b1eb]">Respaldo de nuestros clientes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center max-w-3xl mx-auto">
                <Car className="w-16 h-16 text-[#3268bb] mx-auto mb-6" />
                <p className="text-xl text-[#49597c] italic">
                  &quot;Hoy, Rise and Shine es sinónimo de compromiso, calidad y atención
                  personalizada, brindando a cada cliente la mejor experiencia posible.
                  Nos enorgullece seguir creciendo y perfeccionando nuestro trabajo día a día,
                  siempre con el objetivo de facilitar la vida de quienes confían en nosotros.&quot;
                </p>
                <div className="mt-6">
                  <p className="text-[#3268bb] font-semibold">Manuel José Zulueta</p>
                  <p className="text-[#99b1eb]">Fundador de Rise and Shine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default AboutUs
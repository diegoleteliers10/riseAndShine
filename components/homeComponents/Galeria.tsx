import React from 'react'
import { ImageCarousel } from '../homeImages/imageCarousel'

export default function Galeria() {
  return (
    <section className="w-full py-9 md:py-20">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <h2 className="section_title">Nuestros Trabajos de Lavado</h2>
          <p className="section_subtitle">
            ¡Descubra la transformación que puede revolucionar su vehículo!
          </p>
        </div>
        <div className="max-w-[900px]">
          <ImageCarousel />
        </div>
        <p className="slogan little_text">
          Nuestro equipo se asegura de que cada vehículo reciba un tratamiento
          excepcional, dejándolo impecable tanto por dentro como por fuera.
        </p>
      </div>
    </section>
  )
}
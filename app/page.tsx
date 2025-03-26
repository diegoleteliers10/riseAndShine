import Contact from "@/components/homeComponents/Contact";
import Galeria from "@/components/homeComponents/Galeria";
import Hero from "@/components/homeComponents/Hero";
import Pricing from "@/components/homeComponents/Pricing";
import Services from "@/components/homeComponents/Services";
import ShowAfter from "@/components/homeComponents/showAfter";
import HomeLayout from "@/components/layout/homeLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://riseandshine.cl'),
  keywords:["lavado de autos", "lavado a domicilio", "barato", "limpieza de vehículos", "lavado economico"],
  title: 'Rise & Shine | Servicio de Lavado de Autos a Domicilio',
  description: 'Expertos en lavado de autos a domicilio. Ofrecemos servicios de limpieza interior, exterior y completa para tu vehículo con la mayor calidad y comodidad.',
};

export default function Home() {
  return (
    <HomeLayout>
      <Hero />
      <ShowAfter/>
      <Services />
      <Pricing />
      <Galeria />
      <Contact />
    </HomeLayout>
  );
}

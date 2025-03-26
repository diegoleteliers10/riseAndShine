import Contact from "@/components/homeComponents/Contact";
import Galeria from "@/components/homeComponents/Galeria";
import Hero from "@/components/homeComponents/Hero";
import Pricing from "@/components/homeComponents/Pricing";
import Services from "@/components/homeComponents/Services";
import ShowAfter from "@/components/homeComponents/showAfter";
import HomeLayout from "@/components/layout/homeLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Rise & Shine',
  description: 'Rise & Shine, servicio dedicado al lavado de autos velando por la calidad y el confort de nuestros clientes a costos accesibles.',
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

import Contact from "@/components/homeComponents/Contact";
import Galeria from "@/components/homeComponents/Galeria";
import Hero from "@/components/homeComponents/Hero";
import Pricing from "@/components/homeComponents/Pricing";
import Services from "@/components/homeComponents/Services";
import ShowAfter from "@/components/homeComponents/showAfter";
import HomeLayout from "@/components/layout/homeLayout";

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

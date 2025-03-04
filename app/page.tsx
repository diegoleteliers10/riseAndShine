import Contact from "@/components/homeComponents/Contact";
import Galeria from "@/components/homeComponents/Galeria";
import HomeLayout from "@/components/layout/homeLayout";

export default function Home() {
  return (
    <HomeLayout>
      {/* <Hero />
      <ShowAfter/>
      <Services />
      <Pricing /> */}
      <Galeria />
      <Contact />
    </HomeLayout>
  );
}

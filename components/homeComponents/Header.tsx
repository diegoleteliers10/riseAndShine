import Image from "next/image"

function Header() {
  return (
    <header id="navbar" className="fixed w-full bg-white shadow-md z-50 transition duration-300 ease-in-out">
      <nav className="container mx-auto">
        <div className="flex items-center justify-between px-3 md:px-0">
          <Image 
            src="/pictures/logo.webp"
            alt="Rise & Shine"
            width={80}
            height={80}  
            loading="lazy"
          />
          {/* <!-- <div className="text-2xl font-bold text-cloud">
            Rise & Shine
          </div> --> */}
          <div className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-cloud-dark hover:text-cloud">Inicio</a>
            <a href="#servicios" className="text-cloud-dark hover:text-cloud">Servicios</a>
            <a href="#precios" className="text-cloud-dark hover:text-cloud">Precios</a>
            <a href="#contacto" className="text-cloud-dark hover:text-cloud">Contacto</a>
          </div>
          <a href="#contacto" className="bg-cloud text-white px-6 py-2 rounded-full hover:bg-cloud-dark transition duration-300">
            Reservar Ahora
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header
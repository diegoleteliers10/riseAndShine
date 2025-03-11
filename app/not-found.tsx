import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">
          Página no encontrada
        </h2>
        <p className="text-gray-600">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-cloud text-white rounded-lg hover:bg-cloud-dark transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

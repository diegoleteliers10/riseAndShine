'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AlertCircle, Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Primer toast - Iniciando sesión
      const loadingToast = toast.loading('Iniciando sesión...', {
        duration: 1000,
      })

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Credenciales inválidas')
      }

      // Eliminamos el toast de carga
      toast.dismiss(loadingToast)

      // Segundo toast - Login exitoso
      toast.success('¡Login exitoso!', {
        duration: 1000,
        icon: <CheckCircle className="h-5 w-5" />,
      })

      // Pequeño delay para que se vean los toasts
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Eliminamos todos los toasts antes de cambiar de ruta
      toast.dismiss()

      router.push('/dashboard')
      router.refresh()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Email o contraseña incorrectos')
      setTimeout(() => {
        setError('')
      }, 3000)
      toast.dismiss()
      toast.error('Error al iniciar sesión', {
        description: 'Email o contraseña incorrectos',
        icon: <AlertCircle className="h-5 w-5" />,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Image
            className="mx-auto"
            src="/pictures/logo.webp"
            alt="Rise & Shine"
            width={120}
            height={120}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-cloud-dark">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-cloud-dark/60">
            Accede al panel de administración
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-cloud-light/20 placeholder-cloud-dark/40 text-cloud-dark rounded-t-md focus:outline-none focus:ring-cloud-light focus:border-cloud-light focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-cloud-light/20 placeholder-cloud-dark/40 text-cloud-dark rounded-b-md focus:outline-none focus:ring-cloud-light focus:border-cloud-light sm:text-sm pr-10"
                placeholder="Contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-cloud-dark/40 hover:text-cloud-dark transition-colors z-20 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cloud hover:bg-cloud-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cloud-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
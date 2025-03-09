'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const loadingToast = toast.loading('Cerrando sesión...', {
        duration: 1000,
      })

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Error al cerrar sesión')
      }

      // Eliminamos el toast de carga
      toast.dismiss(loadingToast)

      toast.success('Sesión cerrada exitosamente', {
        duration: 1000,
      })

      // Pequeño delay para mostrar el toast de éxito
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Eliminamos todos los toasts antes de cambiar de ruta
      toast.dismiss()
      
      router.push('/login')
      router.refresh()
    } catch (error) {
      toast.error('Error al cerrar sesión')
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
    >
      <LogOut className="h-4 w-4" />
      Cerrar Sesión
    </button>
  )
}
'use client'

import { useEffect, useState } from 'react'

export function DateDisplay() {
  const [formattedDate, setFormattedDate] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateMedia = () => {
      setIsMobile(window.innerWidth < 768)
    }

    updateMedia()
    window.addEventListener('resize', updateMedia)

    return () => {
      window.removeEventListener('resize', updateMedia)
    }
  }, [])

  useEffect(() => {
    const date = new Date()
    let formatted

    if (isMobile) {
      formatted = date.toLocaleDateString("es-ES", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    } else {
      formatted = date.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }

    setFormattedDate(formatted)
  }, [isMobile])

  return (
    <span className="text-sm text-cloud-dark/60 bg-white/40 px-4 py-2 rounded-lg backdrop-blur-xs border border-cloud-light/20 md:order-1 order-2">
      {formattedDate}
    </span>
  )
} 
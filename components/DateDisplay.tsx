'use client'

import { useEffect, useState } from 'react'

export function DateDisplay() {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    const date = new Date()
    const formatted = date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    setFormattedDate(formatted)
  }, [])

  return (
    <span className="text-sm text-cloud-dark/60 bg-white/40 px-4 py-2 rounded-lg backdrop-blur-xs border border-cloud-light/20">
      {formattedDate}
    </span>
  )
} 
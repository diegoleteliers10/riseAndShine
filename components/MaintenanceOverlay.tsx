"use client";

import React, { useEffect } from "react";
import { MAINTENANCE_CONFIG } from "@/lib/maintenance";

interface MaintenanceOverlayProps {
  isActive: boolean;
}

const MaintenanceOverlay: React.FC<MaintenanceOverlayProps> = ({
  isActive,
}) => {
  // Bloquear scroll cuando el overlay está activo
  useEffect(() => {
    if (isActive) {
      // Guardar los estilos actuales
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      // Bloquear scroll en body e html
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        // Restaurar scroll cuando se desmonte o desactive
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [isActive]);

  if (!isActive) return null;

  const { title, message, contact, style } = MAINTENANCE_CONFIG;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-300">
      {/* Backdrop con blur */}
      <div
        className={`absolute inset-0 ${style.backgroundColor} ${style.blurIntensity}`}
      />

      {/* Contenido del mensaje de mantenimiento */}
      <div className="relative z-10 max-w-md mx-4 p-6 sm:p-8 bg-white rounded-2xl shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-300 delay-100">
        <div className="text-center">
          {/* Icono de mantenimiento */}
          <div className="mx-auto mb-6 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
            <svg
              className="w-8 h-8 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          {/* Título */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-dancing-script">
            {title}
          </h2>

          {/* Mensaje */}
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
            {message.primary}
          </p>

          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
            {message.secondary}
          </p>

          {/* Información de contacto */}
          {contact.showContact && (
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Para consultas, contáctanos al:
              </p>
              <p className="text-sm font-semibold text-gray-700 mt-1">
                {contact.phone}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceOverlay;

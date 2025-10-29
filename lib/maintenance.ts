// Configuración del modo mantenimiento
export const MAINTENANCE_CONFIG = {
  // Cambiar a true para activar el modo mantenimiento
  isEnabled: true,

  // Mensaje personalizable
  title: "Servicio Temporalmente Suspendido",

  message: {
    primary:
      "Estimados clientes, informamos que suspenderemos temporalmente nuestros servicios de lavado de autos.",
    secondary:
      "Agradecemos su comprensión y les comunicaremos cuando retomemos nuestras actividades.",
  },

  // Información de contacto
  contact: {
    phone: "+56 9 9218 7281",
    showContact: false,
  },

  // Estilo del overlay
  style: {
    blurIntensity: "backdrop-blur-md", // backdrop-blur-sm, backdrop-blur-md, backdrop-blur-lg
    backgroundColor: "bg-black/30", // Transparencia del fondo
  },
};

// Función helper para verificar si el mantenimiento está activo
export const isMaintenanceModeActive = (): boolean => {
  return MAINTENANCE_CONFIG.isEnabled;
};

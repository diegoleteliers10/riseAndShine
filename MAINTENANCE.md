# Sistema de Mantenimiento - Rise & Shine

Este documento explica cómo usar el sistema de mantenimiento para suspender temporalmente los servicios de la aplicación.

## ¿Cómo funciona?

El sistema de mantenimiento muestra una pantalla de overlay con efecto blur sobre toda la aplicación cuando está activado, impidiendo que los usuarios accedan al contenido mientras muestran un mensaje informativo.

## Activar/Desactivar Modo Mantenimiento

### Método Simple

1. Abre el archivo `lib/maintenance.ts`
2. Cambia el valor de `isEnabled`:
   - `isEnabled: true` → Activa el modo mantenimiento
   - `isEnabled: false` → Desactiva el modo mantenimiento

```typescript
export const MAINTENANCE_CONFIG = {
  isEnabled: true, // Cambiar a false para desactivar
  // ... resto de configuración
};
```

## Personalización

### Modificar el Mensaje

Puedes personalizar los mensajes editando el objeto `message` en `lib/maintenance.ts`:

```typescript
message: {
  primary: "Tu mensaje principal aquí",
  secondary: "Tu mensaje secundario aquí"
}
```

### Cambiar el Título

```typescript
title: "Tu título personalizado",
```

### Información de Contacto

```typescript
contact: {
  phone: "+56 9 9218 7281",
  showContact: false // Por defecto está desactivado
}
```

### Personalizar el Estilo

```typescript
style: {
  blurIntensity: "backdrop-blur-md", // backdrop-blur-sm, backdrop-blur-md, backdrop-blur-lg
  backgroundColor: "bg-black/30" // Ajustar transparencia: bg-black/10, bg-black/20, bg-black/50
}
```

## Ejemplos de Configuración

### Mantenimiento Programado
```typescript
export const MAINTENANCE_CONFIG = {
  isEnabled: true,
  title: "Mantenimiento Programado",
  message: {
    primary: "Estamos realizando mejoras en nuestro sistema.",
    secondary: "Estaremos de vuelta el lunes a las 9:00 AM."
  },
  // ... resto de configuración
};
```

### Suspensión Temporal de Servicios
```typescript
export const MAINTENANCE_CONFIG = {
  isEnabled: true,
  title: "Servicios Temporalmente Suspendidos",
  message: {
    primary: "Debido a circunstancias especiales, hemos suspendido temporalmente nuestros servicios.",
    secondary: "Te notificaremos cuando retomemos las actividades."
  },
  // ... resto de configuración
};
```

### Vacaciones o Feriados
```typescript
export const MAINTENANCE_CONFIG = {
  isEnabled: true,
  title: "Vacaciones de Verano",
  message: {
    primary: "Nos tomamos un descanso para recargarnos.",
    secondary: "Volveremos con más energía el 15 de marzo."
  },
  // ... resto de configuración
};
```

## Archivos Involucrados

- `lib/maintenance.ts` - Configuración principal
- `components/MaintenanceOverlay.tsx` - Componente visual
- `app/layout.tsx` - Integración en el layout principal

## Notas Importantes

1. **Efecto Inmediato**: Los cambios se aplican inmediatamente después de guardar el archivo.
2. **SEO Friendly**: El contenido sigue siendo indexable por motores de búsqueda.
3. **Responsive**: El overlay se adapta a diferentes tamaños de pantalla.
4. **Accesible**: Incluye elementos semánticos y ARIA labels.
5. **Scroll Bloqueado**: Impide que los usuarios hagan scroll cuando está activo.
6. **Sin Interacciones**: El contenido principal no es interactivo mientras está en mantenimiento.

## Despliegue

Después de hacer cambios:

1. Guarda los archivos modificados
2. Haz commit de los cambios
3. Despliega a producción

El modo mantenimiento se activará automáticamente una vez que se complete el despliegue.

## Consejos

- Siempre prueba en desarrollo antes de activar en producción
- Considera avisar a los usuarios con anticipación
- Activa la información de contacto solo si es necesario (`showContact: true`)
- Desactiva el modo tan pronto como sea posible
- El scroll se bloquea automáticamente para evitar distracciones

## Troubleshooting

### El overlay no aparece
- Verifica que `isEnabled: true` en `lib/maintenance.ts`
- Asegúrate de que no hay errores en la consola del navegador

### El blur no funciona
- Verifica que las clases de Tailwind CSS estén disponibles
- Revisa que no haya conflictos de CSS

### El mensaje no se actualiza
- Limpia la caché del navegador
- Verifica que el archivo se haya guardado correctamente
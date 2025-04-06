"use client"

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Suspense } from 'react';
import { useQueryState, parseAsIsoDate } from 'nuqs';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Lista de feriados en Chile 2025 (ajusta según fuente oficial)
const feriadosChile2025 = [
  new Date(2025, 0, 1),   // 1 de enero - Año Nuevo (miércoles)
  new Date(2025, 3, 18),  // 18 de abril - Viernes Santo (viernes)
  new Date(2025, 3, 19),  // 19 de abril - Sábado Santo (sábado)
  new Date(2025, 4, 1),   // 1 de mayo - Día del Trabajo (jueves)
  new Date(2025, 4, 21),  // 21 de mayo - Día de las Glorias Navales (miércoles)
  new Date(2025, 5, 20),  // 20 de junio - Día Nacional de los Pueblos Indígenas (viernes)
  new Date(2025, 5, 29),  // 29 de junio - San Pedro y San Pablo / Elecciones Primarias (domingo)
  new Date(2025, 6, 16),  // 16 de julio - Virgen del Carmen (miércoles)
  new Date(2025, 7, 15),  // 15 de agosto - Asunción de la Virgen (viernes)
  new Date(2025, 8, 18),  // 18 de septiembre - Independencia Nacional (jueves)
  new Date(2025, 8, 19),  // 19 de septiembre - Glorias del Ejército (viernes)
  new Date(2025, 9, 12),  // 12 de octubre - Encuentro de Dos Mundos (domingo)
  new Date(2025, 9, 31),  // 31 de octubre - Iglesias Evangélicas y Protestantes (viernes)
  new Date(2025, 10, 1),  // 1 de noviembre - Todos los Santos (sábado)
  new Date(2025, 11, 8),  // 8 de diciembre - Inmaculada Concepción (lunes)
  new Date(2025, 11, 25), // 25 de diciembre - Navidad (jueves)
  // Agrega elecciones si las fechas se confirman (ej. 23 y 30 de noviembre para presidenciales)
];

function DatePickerContent() {
  const defaultClassNames = getDefaultClassNames();
  const [date, setDate] = useQueryState('fecha_servicio', parseAsIsoDate);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate || null);
  };
  // Function to disable weekends and holidays
  const disableWeekendsAndHolidays = (date: Date) => {
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6; // 0 = Sunday, 6 = Saturday

    // Compares the date with holidays (ignoring the time)
    const isHoliday = feriadosChile2025.some(
      (holiday) =>
        holiday.getDate() === date.getDate() &&
        holiday.getMonth() === date.getMonth() &&
        holiday.getFullYear() === date.getFullYear()
    );

    return isWeekend || isHoliday;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal text-cloud-dark/80",
            !date && "text-muted-foreground"
          )}
          id="dayButton"
        >
          <CalendarIcon className="mr-2 h-[18px] w-[18px] text-cloud-dark/60" />
          {date ? `Día seleccionado: ${date.toLocaleDateString()}` : <span className="text-cloud-dark/80">Seleccione un día</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DayPicker
          mode="single"
          selected={date || undefined}
          onSelect={handleDateSelect}
          classNames={{
            today: `text-cloud font-bold`,
            selected: `text-white bg-cloud-light rounded-full`,
            root: `${defaultClassNames.root} px-5 py-2 border-none text-cloud-dark`,
            chevron: `${defaultClassNames.chevron} fill-cloud-dark`,
            caption_label: `${defaultClassNames.caption_label} text-cloud-DEFAULT font-semibold`,
            weekday: `${defaultClassNames.weekday} text-cloud-light`,
          }}
          disabled={disableWeekendsAndHolidays}
        />
      </PopoverContent>
    </Popover>
  );
}

export function DatePickerDemo() {
  return (
    <Suspense fallback={<div>Cargando selector de fecha...</div>}>
      <DatePickerContent />
    </Suspense>
  );
}


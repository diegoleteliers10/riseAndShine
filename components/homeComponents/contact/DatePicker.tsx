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

function DatePickerContent() {
  const defaultClassNames = getDefaultClassNames();
  const [date, setDate] = useQueryState('fecha_servicio', parseAsIsoDate);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate || null);
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


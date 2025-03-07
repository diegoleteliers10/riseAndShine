"use client"

// import { useState } from "react";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

// export const DatePickerDemo = () => {
//   const defaultClassNames = getDefaultClassNames();
//   const [selected, setSelected] = useState<Date>();

//   return (
//     <DayPicker
//       mode="single"
//       selected={selected}
//       onSelect={setSelected}
//       footer={
//         selected ? `Dia seleccionado: ${selected.toLocaleDateString()}` : "Seleccione un día"
//       }
//       classNames={{
//         today: `text-cloud font-bold`,
//         selected: `text-white bg-cloud-light rounded-full`,
//         root: `${defaultClassNames.root} px-5 py-2 border rounded-lg text-cloud-dark`,
//         chevron: `${defaultClassNames.chevron} fill-cloud-dark`,
//         caption_label: `${defaultClassNames.caption_label} text-cloud-DEFAULT font-semibold`,
//         weekday: `${defaultClassNames.weekday} text-cloud-light`,
//       }}
//     />
//   );
// }

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()
  const defaultClassNames = getDefaultClassNames();

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
          {date ? `Día seleccionado: ${date.toLocaleDateString()}` : <span className="text-cloud-dark/80">Seleccione un día</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
     <DayPicker
      mode="single"
      selected={date}
      onSelect={setDate}
      classNames={{
        today: `text-cloud font-bold`,
        selected: `text-white bg-cloud-light rounded-full`,
        root: `${defaultClassNames.root} px-5 py-2 border rounded-lg text-cloud-dark`,
        chevron: `${defaultClassNames.chevron} fill-cloud-dark`,
        caption_label: `${defaultClassNames.caption_label} text-cloud-DEFAULT font-semibold`,
        weekday: `${defaultClassNames.weekday} text-cloud-light`,
      }}
    />
      </PopoverContent>
    </Popover>
  )
}


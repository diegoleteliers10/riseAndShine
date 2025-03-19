'use client'

import Image from "next/image";
import { useState } from "react";

export const Slider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full relative mt-6 " onMouseUp={handleMouseUp} data-aos="fade-left">
      <div
        className="relative w-full md:w-[700px] 2xl:w-[900px] aspect-[70/50] m-auto overflow-hidden select-none rounded-lg"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
      >
        <Image
          alt="carBefore"
          className='object-cover md:w-[700px] md:h-[700px] 2xl:w-[900px] 2xl:h-[900px]'
          width={600}
          height={600}
          loading="lazy"
          draggable={false}
          src="/pictures/carBefore.webp"
        />

        <div
          className="absolute top-0 left-0 right-0 w-full md:w-[700px] 2xl:w-[900px] aspect-[70/50] m-auto overflow-hidden select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            className='object-cover md:w-[700px] md:h-[700px] 2xl:w-[900px] 2xl:h-[900px]'
            width={600}
            height={600}
            loading="lazy"
            draggable={false}
            alt="carAfter"
            src="/pictures/carAfter.webp"
          />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div>
      </div>
    </div>
  );
};
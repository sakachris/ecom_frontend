// src/components/products/ProductDetailGallery.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ProductDetailGallery({
  images,
  primary,
}: {
  images: string[];
  primary: string;
}) {
  const normalized = images.length ? images : [primary];
  const [mainIndex, setMainIndex] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      {/* LEFT THUMBNAILS (desktop) */}
      <div className="hidden md:flex flex-col col-span-1 h-[520px] justify-between">
        {normalized.slice(0, 3).map((src, i) => (
          <button
            key={i}
            onClick={() => setMainIndex(i)}
            className={`rounded-xl overflow-hidden border bg-white
        transition w-full h-[160px]
        ${i === mainIndex ? "ring-2 ring-black" : "border-gray-200"}
      `}
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`thumb-${i}`}
                fill
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="md:col-span-4 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="relative w-full h-[520px]">
          <Image
            src={normalized[mainIndex]}
            alt="Product"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* MOBILE thumbnails */}
      <div className="flex md:hidden gap-3 mt-2 overflow-x-auto col-span-full">
        {normalized.slice(0, 3).map((src, i) => (
          <button
            key={i}
            onClick={() => setMainIndex(i)}
            className={`rounded-xl overflow-hidden border flex-shrink-0 
              ${i === mainIndex ? "ring-2 ring-black" : "border-gray-200"}
            `}
            style={{ width: 90, height: 90 }}
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`mobile-thumb-${i}`}
                fill
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

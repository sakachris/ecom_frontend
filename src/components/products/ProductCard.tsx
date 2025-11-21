// src/components/products/ProductCard.tsx
import { Product } from "@/lib/types";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="bg-white rounded-xl p-4 shadow-sm flex flex-col">
      <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
        <img
          src={p.primary_image}
          alt={p.name}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-sm font-medium line-clamp-2">{p.name}</h3>
      <p className="text-xs text-gray-500">{p.category_name}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="text-lg font-semibold">
          ${Number(p.price).toFixed(2)}
        </div>
        <button className="px-3 py-1 text-sm rounded bg-black text-white">
          View
        </button>
      </div>
    </article>
  );
}

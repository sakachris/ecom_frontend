// src/components/products/ProductCard.tsx
import Image from "next/image";
import { Product } from "@/lib/types";
import Link from "next/link";
import StarRating from "@/components/common/StarRating";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article
      className="
      bg-white 
      rounded-2xl 
      p-4 
      shadow-sm 
      hover:shadow-md 
      transition-shadow 
      border 
      border-gray-100 
      flex 
      flex-col
      gap-3
    "
    >
      {/* Image */}
      <div
        className="
        w-full 
        aspect-square 
        bg-gray-50 
        rounded-xl 
        overflow-hidden 
        relative
      "
      >
        <Image
          src={p.primary_image}
          alt={p.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>

      {/* Name + Category */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {p.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{p.category_name}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <StarRating rating={p.average_rating} size={12} />
        <span className="text-xs text-gray-600">
          {Number(p.average_rating).toFixed(1)}/5
        </span>
      </div>

      {/* Price + CTA */}
      <div className="mt-auto flex items-center justify-between">
        <div className="text-lg font-bold text-gray-900">
          ${Number(p.price).toFixed(2)}
        </div>

        <Link href={`/products/${p.product_id}`} passHref>
          <button
            className="
              px-4 
              py-2 
              text-xs 
              font-medium 
              rounded-full 
              bg-black 
              text-white 
              hover:bg-gray-900 
              transition
            "
          >
            View
          </button>
        </Link>
      </div>
    </article>
  );
}

// import Image from "next/image";
// import { Product } from "@/lib/types";
// import Link from "next/link";
// import StarRating from "../common/StarRating";

// export default function ProductCard({ p }: { p: Product }) {
//   return (
//     <article className="bg-white rounded-xl p-4 shadow-sm flex flex-col">
//       <div className="w-full aspect-square bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden relative">
//         <Image
//           src={p.primary_image}
//           alt={p.name}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
//         />
//       </div>

//       <h3 className="text-sm font-medium line-clamp-2">{p.name}</h3>
//       <p className="text-xs text-gray-500">{p.category_name}</p>
//       <StarRating rating={p.average_rating} size={12} />

//       <div className="mt-auto flex items-center justify-between">
//         <div className="text-lg font-semibold">
//           ${Number(p.price).toFixed(2)}
//         </div>
//         <Link href={`/products/${p.product_id}`} passHref>
//           <button className="px-3 py-1 text-sm rounded bg-black text-white">
//             View
//           </button>
//         </Link>
//       </div>
//     </article>
//   );
// }

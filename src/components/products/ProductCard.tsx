// src/components/products/ProductCard.tsx
import Image from "next/image";
import { Product } from "@/lib/types";
import Link from "next/link";
import StarRating from "@/components/common/StarRating";
import { ShoppingCart } from "lucide-react";

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
      <Link href={`/products/${p.product_id}`} passHref>
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
      </Link>

      {/* Name + Category */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {p.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{p.category_name}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center h-3">
          <StarRating rating={p.average_rating} size={12} />
        </div>
        <span className="text-xs text-gray-600 leading-2">
          {Number(p.average_rating).toFixed(1)}/5 ({p.reviews_count})
        </span>
      </div>

      {/* PRICE */}
      <div className="mt-auto">
        <div className="text-lg font-bold text-gray-900">
          ${Number(p.price).toFixed(2)}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center justify-between gap-3">
        {/* VIEW BUTTON */}
        <Link href={`/products/${p.product_id}`} passHref>
          <button
            className="
              flex-1 
              px-3 
              py-2 
              text-xs 
              font-medium 
              rounded-full 
              bg-black 
              text-white 
              hover:bg-gray-500 
              active:scale-[0.98] 
              transition-all
            "
          >
            View
          </button>
        </Link>

        {/* ADD TO CART BUTTON */}
        <button
          className="
            w-10 
            h-10 
            flex 
            items-center 
            justify-center 
            rounded-full 
            border 
            border-gray-300 
            hover:border-black 
            hover:bg-gray-100 
            active:scale-[0.95] 
            transition-all
          "
        >
          <ShoppingCart className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* <div className="mt-auto flex items-center justify-between">
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
      </div> */}
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

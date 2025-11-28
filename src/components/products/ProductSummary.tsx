// src/components/products/ProductSummary.tsx

"use client";

import React, { useState } from "react";
import StarRating from "@/components/common/StarRating";

type Product = {
  product_id: string;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  category_name?: string;
  average_rating?: number;
  reviews_count?: number;
  created_at?: string;
};

type Props = {
  product: Product;
};

export default function ProductSummary({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock_quantity <= 0;

  const handleIncrease = () => {
    if (!isOutOfStock && quantity < product.stock_quantity) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  return (
    <div className="lg:col-span-5 h-[520px]">
      <div className="flex flex-col h-full space-y-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {product.name}
        </h1>

        {product.average_rating != null && product.reviews_count != null ? (
          <div className="flex items-center gap-3">
            <div className="text-yellow-500 text-lg mr-3">
              <StarRating rating={product.average_rating} size={20} />
            </div>
            <div className="text-sm text-gray-600">
              {product.average_rating.toFixed(1)}/5
              {product.reviews_count > 0 && (
                <span className="ml-2">({product.reviews_count} reviews)</span>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">No reviews yet</div>
        )}

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-black">
            ${Number(product.price).toFixed(2)}
          </div>

          {isOutOfStock ? (
            <div className="text-sm text-red-600 font-bold mt-2">
              Out of stock
            </div>
          ) : (
            <div className="text-sm text-green-600 font-medium mt-2">
              Remaining stock: {product.stock_quantity}
            </div>
          )}
        </div>

        <p className="text-gray-700">{product.description}</p>

        <div className="flex-grow" />

        <div>
          <div className="flex items-center gap-4 mt-6">
            <div
              className={`inline-flex items-center rounded-full border shadow-sm overflow-hidden transition ${
                isOutOfStock
                  ? "bg-gray-200 border-gray-300"
                  : "bg-gray-100 border-gray-500"
              }`}
            >
              <button
                onClick={handleDecrease}
                disabled={isOutOfStock || quantity === 1}
                className={`px-4 py-2 text-lg transition ${
                  isOutOfStock || quantity === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-300 active:scale-95"
                }`}
              >
                −
              </button>

              <div className="px-5 py-2 border-x border-gray-200 font-medium">
                {quantity}
              </div>

              <button
                onClick={handleIncrease}
                disabled={isOutOfStock || quantity >= product.stock_quantity}
                className={`px-4 py-2 text-lg transition ${
                  isOutOfStock || quantity >= product.stock_quantity
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-300 active:scale-95"
                }`}
              >
                +
              </button>
            </div>

            <button
              disabled={isOutOfStock}
              className={`flex-1 rounded-full px-6 py-3 text-sm font-semibold transition-all shadow-md ${
                isOutOfStock
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:shadow-lg hover:bg-gray-900 active:scale-[0.97]"
              }`}
            >
              {isOutOfStock ? "Unavailable" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import ClientDate from "@/components/common/ClientDate";
// import StarRating from "@/components/common/StarRating";

// type Product = {
//   product_id: string;
//   name: string;
//   description: string;
//   price: string;
//   stock_quantity: number;
//   category_name?: string;
//   average_rating?: number;
//   reviews_count?: number;
//   created_at?: string;
// };

// type Props = {
//   product: Product;
// };

// export default function ProductSummary({ product }: Props) {
//   return (
//     <div className="lg:col-span-5 h-[520px]">
//       <div className="flex flex-col h-full space-y-4">
//         <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
//           {product.name}
//         </h1>

//         {/* rating placeholder (you can compute actual avg later) */}
//         {product.average_rating != null && product.reviews_count != null ? (
//           <div className="flex items-center gap-3">
//             <div className="flex items-center text-yellow-500 text-lg">
//               <span className="mr-3">
//                 <StarRating rating={product.average_rating} size={20} />
//               </span>
//             </div>
//             <div className="text-sm text-gray-600">
//               {product.average_rating.toFixed(1)}/5
//               {product.reviews_count > 0 && (
//                 <span className="ml-2">({product.reviews_count} reviews)</span>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="text-sm text-gray-500">No reviews yet</div>
//         )}

//         {/* price + stock */}
//         <div>
//           <div className="text-2xl sm:text-3xl font-extrabold text-black">
//             KSh {Number(product.price).toFixed(2)}
//           </div>
//           <div className="text-sm text-green-600 font-medium mt-2">
//             Remaining Stock: {product.stock_quantity}
//           </div>
//         </div>

//         {/* short description */}
//         <p className="text-gray-700">{product.description}</p>

//         {/* Spacer to push content below to the bottom */}
//         <div className="flex-grow" />

//         <div>
//           {/* Action Area */}
//           <div className="flex items-center gap-4 mt-6">
//             {/* Quantity Control */}
//             <div className="inline-flex items-center rounded-full bg-gray-100 border border-gray-500 shadow-sm overflow-hidden">
//               <button className="px-4 py-2 text-lg hover:bg-gray-300 active:scale-95 transition">
//                 −
//               </button>

//               <div className="px-5 py-2 border-x border-gray-200 font-medium">
//                 1
//               </div>

//               <button className="px-4 py-2 text-lg hover:bg-gray-300 active:scale-95 transition">
//                 +
//               </button>
//             </div>

//             {/* Add to Cart Button */}
//             <button
//               className="flex-1 bg-black text-white rounded-full px-6 py-3 text-sm font-semibold
//       shadow-md hover:shadow-lg hover:bg-gray-900 active:scale-[0.97] transition-all"
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

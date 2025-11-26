// src/components/Header.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User, LogOut, LogIn, UserPlus } from "lucide-react";

export default function Header() {
  // simulate user login state (replace later with real auth)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          ELECTROCO
        </Link>

        {/* Search bar (optional but nice to have) */}
        <div className="hidden md:flex flex-1 mx-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition"
          />
        </div>

        {/* Right-side icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ShoppingCart className="w-6 h-6" />

            {/* fake count: replace with real number */}
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              2
            </span>
          </Link>

          {/* User Account */}
          <div className="relative group">
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <User className="w-6 h-6" />
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg border hidden group-hover:block transition">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/signin"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm"
                  >
                    <LogIn size={16} /> Sign In
                  </Link>

                  <Link
                    href="/signup"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm"
                  >
                    <UserPlus size={16} /> Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/account"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-sm"
                  >
                    <User size={16} /> My Account
                  </Link>

                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="flex items-center w-full gap-2 px-4 py-2 hover:bg-gray-50 text-sm text-left"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 pb-3 md:hidden">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-black focus:ring-1 focus:ring-black transition"
        />
      </div>
    </header>
  );
}

// "use client";
// import Link from "next/link";
// export default function Header() {
//   return (
//     <header className="bg-white border-b">
//       <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//         <Link href="/">
//           <div className="text-2xl font-bold">ELECTROCO</div>
//         </Link>
//         <nav className="hidden md:flex gap-6 text-sm">
//           <a>Shop</a>
//           <a>On Sale</a>
//           <a>New</a>
//           <a>Brands</a>
//         </nav>
//       </div>
//     </header>
//   );
// }

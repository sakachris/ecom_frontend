// src/components/Header.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User, LogOut, LogIn, UserPlus } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout } from "@/store/authSlice";

export default function Header() {
  const [open, setOpen] = useState(false);
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const isLoggedIn = Boolean(auth.access && auth.email);

  return (
    <>
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
                0
              </span>
            </Link>

            {/* User Account */}
            <div className="relative group">
              <div>
                {!isLoggedIn ? (
                  <>
                    <button
                      onClick={() => setOpen(true)}
                      className="p-2 rounded-full hover:bg-gray-100 transition flex items-center gap-2"
                    >
                      <LogIn size={20} className="w-6 h-6" /> Login
                    </button>
                    {/* <button
                      onClick={() => setOpen(true)}
                      className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <UserPlus className="w-6 h-6" />
                    </button> */}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <Link
                        href="/account"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <User size={16} /> {auth.first_name}
                      </Link>

                      <button
                        onClick={() => dispatch(logout())}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
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
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

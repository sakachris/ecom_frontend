// src/components/Header.tsx
"use client";
import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="text-2xl font-bold">ELECTROCO</div>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <a>Shop</a>
          <a>On Sale</a>
          <a>New</a>
          <a>Brands</a>
        </nav>
      </div>
    </header>
  );
}

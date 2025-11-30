"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <h2 className="font-extrabold text-2xl tracking-tight mb-3">
              ELECTROCO
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your trusted online marketplace for premium electronics. Discover
              quality gadgets, unbeatable prices, and a seamless shopping
              experience.
            </p>
          </div>

          {/* SHOP LINKS */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Deals & Discounts
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-black">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-black">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+254 700 123 456</span>
              </li>

              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@electroco.com</span>
              </li>

              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>

            {/* SOCIAL MEDIA */}
            <div className="flex gap-4 mt-6">
              <Link href="#" aria-label="Facebook" className="hover:text-black">
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="hover:text-black"
              >
                <Instagram size={20} />
              </Link>
              <Link href="#" aria-label="Twitter" className="hover:text-black">
                <Twitter size={20} />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-black">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* LINE */}
        <div className="border-t mt-12 pt-6 text-center text-sm text-gray-500">
          © {year} ELECTROCO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

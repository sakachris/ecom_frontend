// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User, LogOut, LogIn, UserCheck } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import ProfileModal from "@/components/profile/ProfileModal";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout } from "@/store/authSlice";
import HeaderSearch from "./HeaderSearch";

export default function Header() {
  const [open, setOpen] = useState(false); // for AuthModal (login)
  const [profileOpen, setProfileOpen] = useState(false); // for ProfileModal
  const auth = useAppSelector((s) => s.auth);
  const profile = useAppSelector((s) => s.profile.data);
  const profileLoading = useAppSelector((s) => s.profile.loading);
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

          <div className="hidden md:block w-full max-w-sm mx-4">
            <HeaderSearch />
          </div>

          {/* Right-side icons */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ShoppingCart className="w-6 h-6" />

              {/* fake count */}
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                0
              </span>
            </Link>

            {/* User Account */}
            <div className="relative group">
              <div>
                {!isLoggedIn ? (
                  <button
                    onClick={() => setOpen(true)}
                    className="p-2 rounded-full hover:bg-gray-100 transition flex items-center gap-2 text-sm"
                  >
                    <LogIn size={18} />
                    <span className="hidden sm:inline">Login</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    {/* Profile button (opens modal) */}
                    <button
                      onClick={() => setProfileOpen(true)}
                      className="p-2 rounded-full hover:bg-gray-100 transition flex items-center gap-2"
                      title="View profile"
                    >
                      <UserCheck className="w-5 h-5" />
                      {/* show name on md+ screens */}
                      <span className="hidden md:inline text-sm">
                        {/* {auth.first_name} */}
                        {/* {profile?.first_name} */}
                        {profileLoading
                          ? "..."
                          : profile?.first_name || auth.email}
                      </span>
                    </button>

                    {/* link to account page */}
                    <Link
                      href="/account"
                      className="hidden lg:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm rounded-md"
                    >
                      <User size={16} /> Account
                    </Link>

                    <button
                      onClick={() => dispatch(logout())}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm rounded-md"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="block md:hidden px-4 pb-3">
          <HeaderSearch />
        </div>
      </header>

      {/* Modals */}
      <AuthModal open={open} onClose={() => setOpen(false)} />
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        accessToken={auth.access ?? null}
      />
    </>
  );
}

// // src/components/Header.tsx

// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { ShoppingCart, User, LogOut, LogIn } from "lucide-react";
// import AuthModal from "@/components/auth/AuthModal";
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import { logout } from "@/store/authSlice";
// import HeaderSearch from "./HeaderSearch";

// export default function Header() {
//   const [open, setOpen] = useState(false);
//   const auth = useAppSelector((s) => s.auth);
//   const dispatch = useAppDispatch();

//   const isLoggedIn = Boolean(auth.access && auth.email);

//   return (
//     <>
//       <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="text-2xl font-extrabold tracking-tight">
//             ELECTROCO
//           </Link>
//           <div className="hidden md:block w-full max-w-sm mx-4">
//             <HeaderSearch />
//           </div>

//           {/* Right-side icons */}
//           <div className="flex items-center gap-4">
//             {/* Cart */}
//             <Link
//               href="/cart"
//               className="relative p-2 rounded-full hover:bg-gray-100 transition"
//             >
//               <ShoppingCart className="w-6 h-6" />

//               {/* fake count */}
//               <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
//                 0
//               </span>
//             </Link>

//             {/* User Account */}
//             <div className="relative group">
//               <div>
//                 {!isLoggedIn ? (
//                   <>
//                     <button
//                       onClick={() => setOpen(true)}
//                       className="p-2 rounded-full hover:bg-gray-100 transition flex items-center gap-2"
//                     >
//                       <LogIn size={20} className="w-6 h-6" /> Login
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <div className="flex items-center gap-3">
//                       <Link
//                         href="/account"
//                         className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
//                       >
//                         <User size={16} /> {auth.first_name}
//                       </Link>

//                       <button
//                         onClick={() => dispatch(logout())}
//                         className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm"
//                       >
//                         <LogOut size={16} /> Logout
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         <div className="block md:hidden px-4 pb-3">
//           <HeaderSearch />
//         </div>
//       </header>
//       <AuthModal open={open} onClose={() => setOpen(false)} />
//     </>
//   );
// }

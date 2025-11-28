// src/app/login/page.tsx

"use client";

import React, { Suspense, useEffect, useState } from "react";
import SignInForm from "@/components/auth/SignInForm";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import LoginParamsReader from "@/components/auth/LoginParamsReader";

export default function LoginPage() {
  const isAuth = useAppSelector((s) => s.auth.isAuthenticated);
  const router = useRouter();

  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [prefilledEmail, setPrefilledEmail] = useState<string | null>(null);

  useEffect(() => {
    if (isAuth) router.push("/");
  }, [isAuth, router]);

  if (isAuth) return null;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      {/* ⬇ This is required by Next.js 16 */}
      <Suspense fallback={null}>
        <LoginParamsReader
          onParams={({ verified, already, expired, invalid, email }) => {
            if (email) setPrefilledEmail(email);

            if (verified)
              setInfoMessage(
                "Your email has been verified. You can now sign in."
              );
            else if (already)
              setInfoMessage("Your email is already verified. Please sign in.");
            else if (expired)
              setInfoMessage(
                "Your verification link has expired. Request a new one."
              );
            else if (invalid) setInfoMessage("Invalid verification link.");
          }}
        />
      </Suspense>

      <div className="w-full max-w-md bg-white border rounded-lg p-6 shadow">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Sign In to ELECTROCO
        </h1>

        <SignInForm
          onSuccess={() => router.push("/")}
          infoMessage={infoMessage}
          prefilledEmail={prefilledEmail}
        />
      </div>
    </div>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import SignInForm from "@/components/auth/SignInForm";
// import { useAppSelector } from "@/store/store";
// import { useRouter } from "next/navigation";
// import LoginParamsReader from "@/components/auth/LoginParamsReader";

// export default function LoginPage() {
//   const isAuth = useAppSelector((s) => s.auth.isAuthenticated);
//   const router = useRouter();

//   const [infoMessage, setInfoMessage] = useState<string | null>(null);
//   const [prefilledEmail, setPrefilledEmail] = useState<string | null>(null);

//   // Handle login redirect
//   useEffect(() => {
//     if (isAuth) router.push("/");
//   }, [isAuth, router]);

//   if (isAuth) return null;

//   return (
//     <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
//       <LoginParamsReader
//         onParams={({ verified, already, expired, invalid, email }) => {
//           if (email) setPrefilledEmail(email);

//           if (verified)
//             setInfoMessage(
//               "Your email has been verified. You can now sign in."
//             );
//           else if (already)
//             setInfoMessage("Your email is already verified. Please sign in.");
//           else if (expired)
//             setInfoMessage(
//               "Your verification link has expired. Request a new one."
//             );
//           else if (invalid) setInfoMessage("Invalid verification link.");
//         }}
//       />

//       <div className="w-full max-w-md bg-white border rounded-lg p-6 shadow">
//         <h1 className="text-2xl font-semibold text-center mb-4">
//           Sign In to ELECTROCO
//         </h1>

//         <SignInForm
//           onSuccess={() => router.push("/")}
//           infoMessage={infoMessage}
//           prefilledEmail={prefilledEmail}
//         />
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useState, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import SignInForm from "@/components/auth/SignInForm";
// import { useAppSelector } from "@/store/store";

// function LoginContent() {
//   const isAuth = useAppSelector((s) => s.auth.isAuthenticated);

//   const router = useRouter();
//   const params = useSearchParams();

//   const [infoMessage, setInfoMessage] = useState<string | null>(null);
//   const [prefilledEmail, setPrefilledEmail] = useState<string | null>(null);

//   // Run ONLY on client → avoids hydration mismatch
//   useEffect(() => {
//     const verified = params.get("verified");
//     const already = params.get("already");
//     const expired = params.get("expired");
//     const invalid = params.get("invalid");
//     const encoded = params.get("email");

//     if (encoded) {
//       try {
//         setPrefilledEmail(atob(encoded));
//       } catch {
//         // ignore decoding errors
//       }
//     }

//     if (verified)
//       setInfoMessage("Your email has been verified. You can now sign in.");
//     else if (already)
//       setInfoMessage("Your email is already verified. Please sign in.");
//     else if (expired)
//       setInfoMessage("Your verification link has expired. Request a new one.");
//     else if (invalid) setInfoMessage("Invalid verification link.");
//   }, [params]);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (isAuth) router.push("/");
//   }, [isAuth, router]);

//   if (isAuth) return null;

//   return (
//     <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-md bg-white border rounded-lg p-6 shadow">
//         <h1 className="text-2xl font-semibold text-center mb-4">
//           Sign In to ELECTROCO
//         </h1>

//         <SignInForm
//           onSuccess={() => router.push("/")}
//           infoMessage={infoMessage}
//           prefilledEmail={prefilledEmail}
//         />
//       </div>
//     </div>
//   );
// }

// export default function LoginPage() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <LoginContent />
//     </Suspense>
//   );
// }

// "use client";

// import React, { useEffect, useState, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import SignInForm from "@/components/auth/SignInForm";
// import { useAppSelector } from "@/store/store";

// function LoginContent() {
//   const isAuth = useAppSelector((s) => s.auth.isAuthenticated);

//   const router = useRouter();
//   const params = useSearchParams();

//   const [infoMessage, setInfoMessage] = useState<string | null>(null);
//   const [prefilledEmail, setPrefilledEmail] = useState<string | null>(null);

//   useEffect(() => {
//     const verified = params.get("verified");
//     const already = params.get("already");
//     const expired = params.get("expired");
//     const invalid = params.get("invalid");

//     const encoded = params.get("email");
//     const email = encoded ? atob(encoded) : null;

//     if (email) setPrefilledEmail(email);

//     if (verified)
//       setInfoMessage("Your email has been verified. You can now sign in.");
//     else if (already)
//       setInfoMessage("Your email is already verified. Please sign in.");
//     else if (expired)
//       setInfoMessage("Your verification link has expired. Request a new one.");
//     else if (invalid) setInfoMessage("Invalid verification link.");
//   }, [params]);

//   useEffect(() => {
//     if (isAuth) router.push("/");
//   }, [isAuth, router]);

//   if (isAuth) return null;

//   return (
//     <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-md bg-white border rounded-lg p-6 shadow">
//         <h1 className="text-2xl font-semibold text-center mb-4">
//           Sign In to ELECTROCO
//         </h1>

//         <SignInForm
//           onSuccess={() => router.push("/")}
//           infoMessage={infoMessage}
//           prefilledEmail={prefilledEmail}
//         />
//       </div>
//     </div>
//   );
// }

// export default function LoginPage() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <LoginContent />
//     </Suspense>
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import SignInForm from "@/components/auth/SignInForm";
// import { useAppSelector } from "@/store/store";

// export default function LoginPage() {
//   const isAuth = useAppSelector((s) => s.auth.isAuthenticated);

//   const router = useRouter();
//   const params = useSearchParams();

//   const [infoMessage, setInfoMessage] = useState<string | null>(null);
//   const [prefilledEmail, setPrefilledEmail] = useState<string | null>(null);

//   // Handle verification redirect states
//   useEffect(() => {
//     const verified = params.get("verified");
//     const already = params.get("already");
//     const expired = params.get("expired");
//     const invalid = params.get("invalid");
//     const encoded = params.get("email");
//     const email = encoded ? atob(encoded) : null;

//     if (email) setPrefilledEmail(email);

//     if (verified) {
//       setInfoMessage("Your email has been verified. You can now sign in.");
//     } else if (already) {
//       setInfoMessage("Your email is already verified. Please sign in.");
//     } else if (expired) {
//       setInfoMessage(
//         "Your verification link has expired. Request a new one below."
//       );
//     } else if (invalid) {
//       setInfoMessage("Invalid verification link.");
//     }
//   }, [params]);

//   // On successful login → redirect home
//   const handleSuccess = () => {
//     router.push("/");
//   };

//   // If already authenticated, redirect to home
//   useEffect(() => {
//     if (isAuth) {
//       router.push("/");
//     }
//   }, [isAuth, router]);

//   if (isAuth) {
//     return null;
//   }

//   return (
//     <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-md bg-white border rounded-lg p-6 shadow">
//         <h1 className="text-2xl font-semibold text-center mb-4">
//           Sign In to ELECTROCO
//         </h1>

//         <SignInForm
//           onSuccess={handleSuccess}
//           infoMessage={infoMessage}
//           prefilledEmail={prefilledEmail}
//         />
//       </div>
//     </div>
//   );
// }

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

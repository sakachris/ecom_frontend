// src/components/auth/AuthModal.tsx

"use client";

import React, { useState } from "react";
import SignInForm from "./SignInForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-50 w-full max-w-md mx-4 bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {mode === "login" ? "Sign in to ELECTROCO" : "Create your account"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {mode === "login" ? (
          <SignInForm
            infoMessage={infoMessage}
            onSuccess={onClose}
            prefilledEmail={registeredEmail}
          />
        ) : (
          <RegisterForm
            onSuccess={(msg, email) => {
              setInfoMessage(msg);
              setRegisteredEmail(email);
              setMode("login");
            }}
          />
        )}

        <div className="mt-4 text-sm text-gray-600 text-center">
          {mode === "login" ? (
            <>
              Don`t have an account?{" "}
              <button
                className="text-black underline"
                onClick={() => setMode("register")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-black underline"
                onClick={() => setMode("login")}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

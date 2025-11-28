// src/components/auth/RegisterForm.tsx

"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { registerUser } from "@/store/authSlice";

export default function RegisterForm({
  onSuccess,
}: {
  onSuccess?: (msg: string, email: string) => void;
}) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  const [localError, setLocalError] = useState<string | null>(null);
  const [localSuccess, setLocalSuccess] = useState<string | null>(null);
  const [loadingRegister, setLoadingRegister] = useState(false);

  function updateField(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setLocalSuccess(null);
    setLoadingRegister(true);

    if (form.password !== form.confirm_password) {
      setLocalError("Passwords do not match.");
      return;
    }

    try {
      const payload = {
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        phone_number: form.phone_number || null,
        password: form.password,
      };

      const res = await dispatch(registerUser(payload)).unwrap();

      setLocalSuccess(res);
      if (onSuccess) onSuccess(res, form.email);
      //     } catch (err: unknown) {
      //   const message =
      //     err instanceof Error ? err.message : "Registration failed";
      //   setLocalError(message);
      // }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError(String(err) || "Registration failed");
      }
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          required
          value={form.first_name}
          onChange={(e) => updateField("first_name", e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          required
          value={form.last_name}
          onChange={(e) => updateField("last_name", e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Phone (optional) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Phone Number (optional)
        </label>
        <input
          type="text"
          value={form.phone_number}
          onChange={(e) => updateField("phone_number", e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          required
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          required
          value={form.confirm_password}
          onChange={(e) => updateField("confirm_password", e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Error & Success messages */}
      {localError && <div className="text-sm text-red-600">{localError}</div>}
      {auth.registerStatus === "failed" && auth.registerMessage && (
        <div className="text-sm text-red-600">
          {String(auth.registerMessage)}
        </div>
      )}

      {localSuccess && (
        <div className="text-sm text-green-600">{localSuccess}</div>
      )}

      {/* Submit button */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loadingRegister}
          className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-900 transition"
        >
          {loadingRegister ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full"></span>
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </button>
      </div>
    </form>
  );
}

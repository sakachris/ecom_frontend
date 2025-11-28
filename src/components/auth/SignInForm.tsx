"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { loginUser, resendVerification } from "@/store/authSlice";

export default function SignInForm({
  onSuccess,
  infoMessage,
  prefilledEmail,
}: {
  onSuccess?: () => void;
  infoMessage?: string | null;
  prefilledEmail?: string | null;
}) {
  const dispatch = useAppDispatch();
  // const auth = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState(prefilledEmail || "");
  const [password, setPassword] = useState("");
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  const [showResendOption, setShowResendOption] = useState(false);

  useEffect(() => {
    if (prefilledEmail) setEmail(prefilledEmail);
  }, [prefilledEmail]);

  useEffect(() => {
    if (!infoMessage) {
      setShowResendOption(false);
      return;
    }

    const msg = infoMessage.toLowerCase();

    const includesExpired =
      msg.includes("link has expired") ||
      msg.includes("verification email sent");

    setShowResendOption(includesExpired);
  }, [infoMessage]);

  const handleResend = async () => {
    setResendMessage(null);
    setResendError(null);
    setLoadingResend(true);

    try {
      const res = await dispatch(resendVerification(email)).unwrap();
      setResendMessage(res);
      // } catch (error: any) {
      //   setResendError(error?.message || "Failed to resend verification email");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to resend verification email";
      setResendError(message);
    } finally {
      setLoadingResend(false);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setErrorLocal(null);
  //   setLoadingLogin(true);

  //   try {
  //     const result = await dispatch(loginUser({ email, password })).unwrap();
  //     if (onSuccess) onSuccess();
  //   } catch (err: any) {
  //     let message = "Login failed";
  //     setShowResendOption(false);

  //     if (err?.detail) {
  //       message = Array.isArray(err.detail) ? err.detail.join(" ") : err.detail;
  //     }

  //     // detect unverified email error
  //     if (message.toLowerCase().includes("not verified")) {
  //       setShowResendOption(true);
  //     }

  //     setErrorLocal(message);
  //   } finally {
  //     setLoadingLogin(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorLocal(null);
    setLoadingLogin(true);

    try {
      await dispatch(loginUser({ email, password })).unwrap();

      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      let message = "Login failed";
      setShowResendOption(false);

      // Try to safely extract `.detail` from RTK rejectWithValue error
      if (typeof err === "object" && err !== null && "detail" in err) {
        const detail = (err as { detail?: string | string[] }).detail;
        if (detail) {
          message = Array.isArray(detail) ? detail.join(" ") : detail;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      // detect unverified email
      if (message.toLowerCase().includes("not verified")) {
        setShowResendOption(true);
      }

      setErrorLocal(message);
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {infoMessage && (
        <div className="p-3 rounded bg-green-100 text-green-700 text-sm mb-3 text-center">
          {infoMessage}
          {showResendOption && (
            <div className="mt-2 flex items-center gap-1 justify-center">
              {/* <span>Didn`t receive the email?</span> */}
              <button
                type="button"
                disabled={loadingResend}
                onClick={handleResend}
                className="underline text-black hover:text-gray-700 disabled:opacity-50"
              >
                {loadingResend ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 border-2 border-black border-t-transparent animate-spin rounded-full"></span>
                    Sending...
                  </span>
                ) : (
                  "Resend verification email"
                )}
              </button>
            </div>
          )}

          {resendMessage && (
            <div className="mt-2 text-green-700 text-sm">{resendMessage}</div>
          )}

          {resendError && (
            <div className="mt-2 text-red-600 text-sm">{resendError}</div>
          )}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Error message */}
      {errorLocal && (
        <div className="bg-red-100 p-3 rounded text-sm text-red-600 space-y-1">
          <p>{errorLocal}</p>
          {showResendOption && (
            <button
              type="button"
              disabled={loadingResend}
              onClick={handleResend}
              className="underline text-black hover:text-gray-700 disabled:opacity-50"
            >
              {loadingResend ? (
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 border-2 border-black border-t-transparent animate-spin rounded-full"></span>
                  Sending...
                </span>
              ) : (
                "Resend verification email"
              )}
            </button>
          )}
          {resendMessage && (
            <div className="mt-2 text-green-700 text-sm">{resendMessage}</div>
          )}
          {resendError && (
            <div className="mt-2 text-red-600 text-sm">{resendError}</div>
          )}
        </div>
      )}

      {/* Submit button */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loadingLogin}
          className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingLogin ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full"></span>
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </div>
    </form>
  );
}

// // src/components/auth/SignInForm.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/store/store";
// import { loginUser, resendVerification } from "@/store/authSlice";

// export default function SignInForm({
//   onSuccess,
//   infoMessage,
//   prefilledEmail,
// }: {
//   onSuccess?: () => void;
//   infoMessage?: string | null;
//   prefilledEmail?: string | null;
// }) {
//   const dispatch = useAppDispatch();
//   const auth = useAppSelector((s) => s.auth);

//   const [email, setEmail] = useState(prefilledEmail || "");
//   const [password, setPassword] = useState("");
//   const [errorLocal, setErrorLocal] = useState<string | null>(null);
//   const [resendMessage, setResendMessage] = useState<string | null>(null);
//   const [resendError, setResendError] = useState<string | null>(null);

//   useEffect(() => {
//     if (prefilledEmail) setEmail(prefilledEmail);
//   }, [prefilledEmail]);

//   const handleResend = async () => {
//     setResendMessage(null);
//     setResendError(null);

//     try {
//       const res = await dispatch(resendVerification(email)).unwrap();
//       setResendMessage(res);
//     } catch (error: any) {
//       setResendError(error?.message || "Failed to resend verification email");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorLocal(null);

//     try {
//       const result = await dispatch(loginUser({ email, password })).unwrap();
//       // loginUser thunk saves tokens to localStorage already
//       if (onSuccess) onSuccess();
//     } catch (err: any) {
//       let message = "Login failed";

//       if (err?.detail) {
//         message = Array.isArray(err.detail) ? err.detail.join(" ") : err.detail;
//       }

//       setErrorLocal(message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 w-full">
//       {infoMessage && (
//         <div className="p-3 rounded bg-green-100 text-green-700 text-sm mb-3">
//           {infoMessage}

//           <div className="mt-2">
//             Didn`t receive the email?{" "}
//             <button
//               type="button"
//               onClick={handleResend}
//               className="underline text-black hover:text-gray-700"
//             >
//               Resend verification email
//             </button>
//           </div>

//           {resendMessage && (
//             <div className="mt-2 text-green-700 text-sm">{resendMessage}</div>
//           )}

//           {resendError && (
//             <div className="mt-2 text-red-600 text-sm">{resendError}</div>
//           )}
//         </div>
//       )}
//       <div>
//         <label className="block text-sm font-medium mb-1">Email</label>
//         <input
//           type="email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Password</label>
//         <input
//           type="password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
//         />
//       </div>

//       {errorLocal && (
//         <div className="bg-red-100 p-3 rounded text-sm text-red-600">
//           {errorLocal}
//           <button
//             type="button"
//             onClick={handleResend}
//             className="underline text-black hover:text-gray-700"
//           >
//             Resend verification email
//           </button>
//         </div>
//       )}
//       {resendMessage && (
//         <div className="mt-2 text-green-700 text-sm">{resendMessage}</div>
//       )}

//       {resendError && (
//         <div className="mt-2 text-red-600 text-sm">{resendError}</div>
//       )}

//       <div className="flex items-center gap-3">
//         <button
//           type="submit"
//           className="flex-1 bg-black text-white py-2 rounded hover:bg-gray-900 transition"
//         >
//           Sign In
//         </button>
//       </div>
//     </form>
//   );
// }

// If an info message is provided about verification links, control the
// visibility of the resend option. Only show the resend option when the
// info message explicitly mentions that the "link has expired" (case-insensitive).
//   useEffect(() => {
//     if (!infoMessage) {
//       setShowResendOption(false);
//       return;
//     }

//     const includesExpired = infoMessage
//       .toLowerCase()
//       .includes("link has expired");
//     setShowResendOption(includesExpired);
//   }, [infoMessage]);

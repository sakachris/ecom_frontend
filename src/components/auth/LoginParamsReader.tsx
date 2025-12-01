"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginParamsReader({
  onParams,
}: {
  onParams: (values: {
    verified: string | null;
    already: string | null;
    expired: string | null;
    invalid: string | null;
    email: string | null;
  }) => void;
}) {
  const params = useSearchParams();

  useEffect(() => {
    const encoded = params.get("email");
    let decoded = null;

    if (encoded) {
      try {
        decoded = atob(encoded);
      } catch {}
    }

    onParams({
      verified: params.get("verified"),
      already: params.get("already"),
      expired: params.get("expired"),
      invalid: params.get("invalid"),
      email: decoded,
    });
  }, [params, onParams]);

  return null;
}

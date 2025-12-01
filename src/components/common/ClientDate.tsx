"use client";

import { ClientDateProps } from "@/lib/types";

export default function ClientDate({ value }: ClientDateProps) {
  const formatted = new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return <span>{formatted}</span>;
}

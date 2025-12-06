// src/components/SearchBar.tsx

"use client";

import MyInput from "@/components/ui/MyInput";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SearchBar({ initial }: { initial?: string }) {
  const router = useRouter();
  const pathname = usePathname(); // <— NEW: auto-detect current page
  const params = useSearchParams();

  const [q, setQ] = useState(initial ?? "");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newParams = new URLSearchParams(params.toString());

    if (q.trim()) newParams.set("search", q);
    else newParams.delete("search");

    newParams.delete("page"); // reset pagination

    router.push(`${pathname}?${newParams.toString()}`);
  }

  function clearSearch() {
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("search");
    newParams.delete("page");

    setQ("");
    router.push(`${pathname}?${newParams.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full gap-3">
      <MyInput
        placeholder="Search for products..."
        value={q}
        onChange={(value) => setQ(value)}
      />

      <button
        className="px-4 rounded bg-black text-white hover:bg-gray-800"
        type="submit"
      >
        Search
      </button>

      {q && (
        <button
          type="button"
          className="px-4 rounded bg-gray-300 text-black hover:bg-gray-400"
          onClick={clearSearch}
        >
          Clear
        </button>
      )}
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export default function HeaderSearch({ initial }: { initial?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [q, setQ] = useState(initial ?? "");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newParams = new URLSearchParams(params.toString());

    if (q.trim()) newParams.set("search", q);
    else newParams.delete("search");

    newParams.delete("page");

    // router.push(`${pathname}?${newParams.toString()}`);
    router.push(`${pathname}?${newParams.toString()}#products-start`);
  }

  function clearSearch() {
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("search");
    newParams.delete("page");

    setQ("");
    // router.push(`${pathname}?${newParams.toString()}`);
    router.push(`${pathname}?${newParams.toString()}#products-start`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-full max-w-sm transition border border-transparent focus-within:border-gray-300"
    >
      <Search size={18} className="text-gray-500" />

      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search…"
        className="bg-transparent outline-none text-sm px-2 w-full"
      />

      {q && (
        <button
          type="button"
          onClick={clearSearch}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
}

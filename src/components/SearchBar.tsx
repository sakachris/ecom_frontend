// src/components/SearchBar.tsx

"use client";

import Input from "@/components/ui/Input";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({ initial }: { initial?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(initial ?? "");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newParams = new URLSearchParams(params.toString());

    if (q.trim()) {
      newParams.set("search", q);
    } else {
      newParams.delete("search");
    }

    newParams.delete("page"); // reset pagination

    router.push(`/?${newParams.toString()}`);
  }

  function clearSearch() {
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("search");
    newParams.delete("page");
    setQ("");
    router.push(`/?${newParams.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full gap-3">
      <Input
        placeholder="Search for products..."
        value={q}
        onChange={(value) => setQ(value)}
      />
      <button className="px-4 rounded bg-black text-white" type="submit">
        Search
      </button>

      {q && (
        <button
          type="button"
          className="px-4 rounded bg-gray-300 text-black"
          onClick={clearSearch}
        >
          Clear
        </button>
      )}
    </form>
  );
}

// "use client";

// import Input from "@/components/ui/Input";
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function SearchBar({ initial }: { initial?: string }) {
//   const router = useRouter();
//   const params = useSearchParams();

//   const [q, setQ] = useState(initial ?? "");

//   function onSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     const newParams = new URLSearchParams(params.toString());

//     if (q.trim()) newParams.set("q", q);
//     else newParams.delete("q");

//     newParams.delete("page"); // reset pagination when searching

//     router.push(`/?${newParams.toString()}`);
//   }

//   return (
//     <form onSubmit={onSubmit} className="flex w-full gap-3">
//       <Input
//         placeholder="Search for products..."
//         value={q}
//         onChange={(value) => setQ(value)}
//       />
//       <button className="px-4 rounded bg-black text-white" type="submit">
//         Search
//       </button>
//     </form>
//   );
// }

// "use client";

// import Input from "@/components/ui/Input";
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function SearchBar({ initial }: { initial?: string }) {
//   const router = useRouter();
//   const params = useSearchParams();

//   const [q, setQ] = useState(initialValue(initial));

//   function onSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     const newParams = new URLSearchParams(params.toString());
//     if (q) newParams.set("q", q);
//     else newParams.delete("q");

//     router.push(`/?${newParams.toString()}`);
//   }

//   return (
//     <form onSubmit={onSubmit} className="flex w-full gap-3">
//       <Input
//         placeholder="Search for products..."
//         value={q}
//         onChange={(value) => setQ(value)}
//       />
//       <button className="px-4 rounded bg-black text-white" type="submit">
//         Search
//       </button>
//     </form>
//   );
// }

// function initialValue(v?: string) {
//   return v ?? "";
// }

// // src/components/SearchBar.tsx
// "use client";
// import Input from "@/components/ui/Input";
// import { useState } from "react";

// export default function SearchBar({
//   onSearch,
//   initial,
// }: {
//   onSearch: (q: string) => void;
//   initial?: string;
// }) {
//   const [q, setQ] = useState(initialValue(initial));
//   function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     onSearch(q);
//   }
//   return (
//     <form onSubmit={onSubmit} className="flex w-full gap-3">
//       <Input placeholder="Search for products..." value={q} onChange={setQ} />
//       <button className="px-4 rounded bg-black text-white" type="submit">
//         Search
//       </button>
//     </form>
//   );
// }

// function initialValue(v?: string) {
//   return v ?? "";
// }

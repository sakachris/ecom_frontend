"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  /** Optional base path for search/sort */
  basePath?: string; // default remains homepage "/"
};

export default function SortSelect({ basePath = "/" }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const selected = params.get("sort") ?? "";

  function onChange(value: string) {
    const newParams = new URLSearchParams(params.toString());

    // set or delete sort
    if (value) newParams.set("sort", value);
    else newParams.delete("sort");

    // reset pagination
    newParams.delete("page");

    // navigate
    router.push(`${basePath}?${newParams.toString()}`);
  }

  return (
    <select
      className="rounded border px-2 py-1"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="new">Newest</option>
      <option value="price_asc">Price: Low → High</option>
      <option value="price_desc">Price: High → Low</option>
      <option value="rating">Top Rated</option>
      <option value="reviews">Most Reviewed</option>
    </select>
  );
}

// "use client";

// import { useRouter, useSearchParams } from "next/navigation";

// export default function SortSelect() {
//   const router = useRouter();
//   const params = useSearchParams();

//   const selected = params.get("sort") ?? "";

//   function onChange(value: string) {
//     const newParams = new URLSearchParams(params.toString());

//     if (value) newParams.set("sort", value);
//     else newParams.delete("sort");

//     // reset pagination
//     newParams.delete("page");

//     router.push(`/?${newParams.toString()}`);
//   }

//   return (
//     <select
//       className="rounded border px-2 py-1"
//       value={selected}
//       onChange={(e) => onChange(e.target.value)}
//     >
//       <option value="new">Newest</option>
//       <option value="price_asc">Price: Low → High</option>
//       <option value="price_desc">Price: High → Low</option>
//       <option value="rating">Top Rated</option>
//       <option value="reviews">Most Reviewed</option>
//     </select>
//   );
// }

// src/components/ui/Pagination.tsx
import Link from "next/link";

export default function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  function makePageUrl(p: number) {
    const params = new URLSearchParams();

    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (typeof value === "string") params.set(key, value);
        if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
      });
    }

    params.set("page", String(p));
    return "?" + params.toString();
  }

  // Determine which pages to show
  const pages: number[] = [];
  const windowSize = 2;
  const start = Math.max(1, page - windowSize);
  const end = Math.min(totalPages, page + windowSize);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div
      className="
        flex flex-wrap 
        items-center 
        justify-center 
        gap-2 sm:gap-3 
        mt-10 
        select-none 
        text-xs sm:text-sm
      "
    >
      {/* FIRST */}
      <Link
        href={makePageUrl(1)}
        className={`px-2 sm:px-3 py-1 rounded-md border 
      ${page === 1 ? "opacity-40 pointer-events-none" : "hover:bg-gray-100"}
    `}
      >
        « First
      </Link>

      {/* PREV */}
      <Link
        href={makePageUrl(Math.max(1, page - 1))}
        className={`px-2 sm:px-3 py-1 rounded-md border 
      ${page === 1 ? "opacity-40 pointer-events-none" : "hover:bg-gray-100"}
    `}
      >
        ‹ Prev
      </Link>

      {/* Ellipsis Before */}
      {start > 1 && <span className="px-1 sm:px-2 text-gray-500">...</span>}

      {/* PAGE NUMBERS */}
      {pages.map((p) => (
        <Link
          key={p}
          href={makePageUrl(p)}
          className={`
        min-w-[28px] sm:min-w-[36px]
        text-center 
        px-2 sm:px-3 
        py-1 
        rounded-full 
        border 
        font-medium
        ${p === page ? "bg-black text-white border-black" : "hover:bg-gray-100"}
      `}
        >
          {p}
        </Link>
      ))}

      {/* Ellipsis After */}
      {end < totalPages && (
        <span className="px-1 sm:px-2 text-gray-500">...</span>
      )}

      {/* NEXT */}
      <Link
        href={makePageUrl(Math.min(totalPages, page + 1))}
        className={`px-2 sm:px-3 py-1 rounded-md border 
      ${
        page === totalPages
          ? "opacity-40 pointer-events-none"
          : "hover:bg-gray-100"
      }
    `}
      >
        Next ›
      </Link>

      {/* LAST */}
      <Link
        href={makePageUrl(totalPages)}
        className={`px-2 sm:px-3 py-1 rounded-md border 
      ${
        page === totalPages
          ? "opacity-40 pointer-events-none"
          : "hover:bg-gray-100"
      }
    `}
      >
        Last »
      </Link>
    </div>

    // <div className="flex items-center justify-center gap-2 mt-10 select-none text-sm">
    //   {/* First */}
    //   <Link
    //     href={makePageUrl(1)}
    //     className={`px-3 py-1 rounded-md border
    //       ${page === 1 ? "opacity-40 pointer-events-none" : "hover:bg-gray-100"}
    //     `}
    //   >
    //     « First
    //   </Link>

    //   {/* Prev */}
    //   <Link
    //     href={makePageUrl(Math.max(1, page - 1))}
    //     className={`px-3 py-1 rounded-md border
    //       ${page === 1 ? "opacity-40 pointer-events-none" : "hover:bg-gray-100"}
    //     `}
    //   >
    //     ‹ Prev
    //   </Link>

    //   {/* Ellipsis (before pages) */}
    //   {start > 1 && <span className="px-2 text-gray-500">...</span>}

    //   {/* Numbered pages */}
    //   {pages.map((p) => (
    //     <Link
    //       key={p}
    //       href={makePageUrl(p)}
    //       className={`min-w-[36px] text-center px-3 py-1 rounded-full border font-medium
    //         ${
    //           p === page
    //             ? "bg-black text-white border-black"
    //             : "hover:bg-gray-100"
    //         }
    //       `}
    //     >
    //       {p}
    //     </Link>
    //   ))}

    //   {/* Ellipsis (after pages) */}
    //   {end < totalPages && <span className="px-2 text-gray-500">...</span>}

    //   {/* Next */}
    //   <Link
    //     href={makePageUrl(Math.min(totalPages, page + 1))}
    //     className={`px-3 py-1 rounded-md border
    //       ${
    //         page === totalPages
    //           ? "opacity-40 pointer-events-none"
    //           : "hover:bg-gray-100"
    //       }
    //     `}
    //   >
    //     Next ›
    //   </Link>

    //   {/* Last */}
    //   <Link
    //     href={makePageUrl(totalPages)}
    //     className={`px-3 py-1 rounded-md border
    //       ${
    //         page === totalPages
    //           ? "opacity-40 pointer-events-none"
    //           : "hover:bg-gray-100"
    //       }
    //     `}
    //   >
    //     Last »
    //   </Link>
    // </div>
  );
}

// import Link from "next/link";

// export default function Pagination({
//   page,
//   totalPages,
//   searchParams,
// }: {
//   page: number;
//   totalPages: number;
//   searchParams?: Record<string, string | string[] | undefined>;
// }) {
//   function makePageUrl(p: number) {
//     const params = new URLSearchParams();

//     if (searchParams) {
//       Object.entries(searchParams).forEach(([key, value]) => {
//         if (typeof value === "string") params.set(key, value);
//         if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
//       });
//     }

//     params.set("page", String(p));
//     return "?" + params.toString();
//   }

//   const pages: number[] = [];
//   const start = Math.max(1, page - 2);
//   const end = Math.min(totalPages, page + 2);
//   for (let i = start; i <= end; i++) pages.push(i);

//   return (
//     <div className="flex items-center justify-center gap-2 mt-8">
//       {/* Prev */}
//       <Link
//         href={makePageUrl(Math.max(1, page - 1))}
//         className={`px-3 py-1 rounded-md border text-sm
//         ${
//           page === 1
//             ? "opacity-40 pointer-events-none"
//             : "hover:bg-gray-100 transition"
//         }`}
//       >
//         Prev
//       </Link>

//       {/* Page numbers */}
//       {pages.map((p) => (
//         <Link
//           key={p}
//           href={makePageUrl(p)}
//           className={`px-3 py-1 rounded-md border text-sm font-medium
//           ${
//             p === page
//               ? "bg-blue-600 text-white border-blue-600"
//               : "hover:bg-gray-100"
//           } transition`}
//         >
//           {p}
//         </Link>
//       ))}

//       {/* Next */}
//       <Link
//         href={makePageUrl(Math.min(totalPages, page + 1))}
//         className={`px-3 py-1 rounded-md border text-sm
//         ${
//           page === totalPages
//             ? "opacity-40 pointer-events-none"
//             : "hover:bg-gray-100 transition"
//         }`}
//       >
//         Next
//       </Link>
//     </div>
//   );
// }

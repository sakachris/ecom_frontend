"use client";

interface ClientDateProps {
  value: string;
}

export default function ClientDate({ value }: ClientDateProps) {
  const formatted = new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return <span>{formatted}</span>;
}

// "use client";

// import { useState, useEffect } from "react";

// interface ClientDateProps {
//   value: string;
// }

// export default function ClientDate({ value }: ClientDateProps) {
//   const [formatted, setFormatted] = useState<string>("");

//   useEffect(() => {
//     const d = new Date(value).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//     setFormatted(d);
//   }, [value]);

//   return <span>{formatted}</span>;
// }

// "use client";

// interface ClientDateProps {
//   value: string;
// }

// export default function ClientDate({ value }: ClientDateProps) {
//   return (
//     <span>
//       {new Date(value).toLocaleDateString(undefined, {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       })}
//     </span>
//   );
// }

// src/components/BrowseByCategory.tsx

import Image from "next/image";
import Link from "next/link";
import { buildUrl, fetchJson } from "@/lib/apiClient";
import { ApiCategory } from "@/lib/types";

const defaultCategories = [
  { name: "Laptops", image: "/categories/laptops.webp" },
  { name: "Monitors", image: "/categories/monitors.webp" },
  { name: "Desktops", image: "/categories/desktops.webp" },
  { name: "Mice", image: "/categories/mice.webp" },
  { name: "Storage Devices", image: "/categories/storage.webp" },
  { name: "Networking", image: "/categories/networking.webp" },
  { name: "Keyboards", image: "/categories/keyboards.webp" },
  { name: "Printers", image: "/categories/printers.webp" },
  { name: "Servers", image: "/categories/servers.webp" },
  { name: "Software", image: "/categories/software.webp" },
];

export default async function BrowseByCategory() {
  let categoriesWithHref = defaultCategories.map((c) => ({ ...c, href: "#" }));

  try {
    // Building API URL using apiClient
    const categoriesUrl = buildUrl("/categories/", { page_size: 50 });
    const data: { results: ApiCategory[] } = await fetchJson(categoriesUrl);

    // Mapping defaultCategories, adding href dynamically
    categoriesWithHref = defaultCategories.map((c) => {
      const match = data.results.find(
        (cat) => cat.name.toLowerCase() === c.name.toLowerCase()
      );
      return {
        ...c,
        href: match ? `/categories/${match.category_id}` : "#", // use category_id
      };
    });
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }

  return (
    <section className="w-full rounded-3xl bg-gray-100 py-10 px-4 md:px-8">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
        Browse by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categoriesWithHref.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="relative group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-28 sm:h-32 md:h-40 lg:h-44 w-full">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>

            <div className="absolute top-0 left-0 p-3">
              <span className="text-gray-900 font-medium text-sm sm:text-base bg-white/80 px-2 py-1 rounded-lg">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

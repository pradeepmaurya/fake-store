"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/lib/types";

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string | null;
}

export default function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCategoryClick = (slug: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (slug === "all") {
            params.delete("category");
        } else {
            params.set("category", slug);
        }
        router.push(`/?${params.toString()}`, { scroll: false });
    };

    const currentCategory = selectedCategory || "all";

    return (
        <section className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex gap-4 min-w-max px-2">
                <button
                    onClick={() => handleCategoryClick("all")}
                    className={`nm-button px-6 py-2 whitespace-nowrap ${currentCategory === "all" ? "active" : ""
                        }`}
                >
                    All Products
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.slug}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className={`nm-button px-6 py-2 whitespace-nowrap ${currentCategory === cat.slug ? "active" : ""
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
            <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
}

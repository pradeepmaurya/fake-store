import Image from "next/image";
import Link from "next/link";
import { getProducts, getCategories, getProductsByCategory } from "@/lib/api";
import { Metadata } from "next";
import CategoryFilter from "@/components/CategoryFilter";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { category } = await searchParams;
  const title = category
    ? `Shop ${category.charAt(0).toUpperCase() + category.slice(1)} | Neumorphic Store`
    : "Neumorphic Store | Experience Elegance in Every Click";

  return {
    title,
    description: `Explore our collection of ${category || "high-quality"} products with a premium Neumorphic design.`,
  };
}

export default async function Home({ searchParams }: PageProps) {
  const { category } = await searchParams;

  const [productsData, categories] = await Promise.all([
    category && category !== "all"
      ? getProductsByCategory(category)
      : getProducts(),
    getCategories(),
  ]);

  const products = productsData.products;

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Neumorphic Store</h1>
        <p className="opacity-70">Experience elegance in every click.</p>
      </header>

      {/* Category Filter - Client Component */}
      <CategoryFilter
        categories={categories}
        selectedCategory={category || "all"}
      />

      {/* Product Grid - Server Rendered */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="nm-card flex flex-col p-5 group"
          >
            <div className="relative aspect-square mb-6 overflow-hidden rounded-xl nm-inset p-4">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
              <p className="text-sm opacity-60 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xl">${product.price}</span>
                <div className="flex items-center gap-1 nm-inset px-2 py-1 rounded-full scale-90">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-xs font-semibold">{product.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <p className="text-xl">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}

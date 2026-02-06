import { Product, ProductsResponse, Category } from "./types";

const BASE_URL = "https://dummyjson.com";

export async function getProducts(limit = 30, skip = 0): Promise<ProductsResponse> {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE_URL}/products/categories`, { cache: "force-cache" });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}

export async function getProductsByCategory(slug: string): Promise<ProductsResponse> {
    const res = await fetch(`${BASE_URL}/products/category/${slug}`, { next: { revalidate: 90 } });
    if (!res.ok) throw new Error("Failed to fetch products by category");
    return res.json();
}

export async function getProductById(id: string): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        cache: "force-cache",
    });
    if (!res.ok) throw new Error("Failed to fetch product details");
    return res.json();
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
    const res = await fetch(`${BASE_URL}/products/search?q=${query}`, {
        cache: "force-cache",
    });
    if (!res.ok) throw new Error("Failed to search products");
    return res.json();
}

export async function getSitemapData(): Promise<{ id: number; updatedAt: string; images: string[] }[]> {
    // First, fetch to get the total number of products
    const initialRes = await fetch(`${BASE_URL}/products?limit=1&select=id`);
    if (!initialRes.ok) throw new Error("Failed to fetch initial product data");
    const { total } = await initialRes.json();

    // Now fetch all products but only the fields we need: id and meta
    // dummyjson supports field selection with `select`
    const res = await fetch(`${BASE_URL}/products?limit=${total}&select=id,meta,images`);
    if (!res.ok) throw new Error("Failed to fetch sitemap data");

    const data = await res.json();
    return data.products.map((p: any) => ({
        id: p.id,
        updatedAt: p.meta?.updatedAt || new Date().toISOString(),
        images: p.images
    }));
}

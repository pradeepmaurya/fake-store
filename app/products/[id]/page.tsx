import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/lib/api";
import { Metadata } from "next";
import ProductGallery from "@/components/ProductGallery";
import PDPBackButton from "@/components/PDPBackButton";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const product = await getProductById(id);
        return {
            title: `${product.title} | Neumorphic Store`,
            description: product.description,
            openGraph: {
                title: product.title,
                description: product.description,
            },
        };
    } catch (error) {
        return {
            title: "Product Not Found | Neumorphic Store",
        };
    }
}

export default async function ProductDetail({ params }: PageProps) {
    const { id } = await params;

    let product;
    try {
        product = await getProductById(id);
    } catch (error) {
        return (
            <div className="min-h-screen p-8 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                <Link href="/" className="nm-button px-6 py-2">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 max-w-6xl mx-auto">
            <PDPBackButton />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left: Images - Client Component */}
                <ProductGallery
                    images={product.images}
                    title={product.title}
                    thumbnail={product.thumbnail}
                />

                {/* Right: Info - Server Rendered */}
                <div className="space-y-8">
                    <div className="nm-card-inset p-8">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-sm font-bold uppercase tracking-widest opacity-50 block mb-1">
                                    {product.category}
                                </span>
                                <h1 className="text-3xl font-bold">{product.title}</h1>
                            </div>
                            <div className="nm-flat px-4 py-2 rounded-2xl font-bold text-2xl text-accent">
                                ${product.price}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 nm-button px-4 py-1 rounded-full text-sm">
                                <span className="text-yellow-500 font-bold">★</span>
                                <span>{product.rating} / 5</span>
                            </div>
                            <span className="text-sm opacity-50">|</span>
                            <span className="text-sm font-semibold text-green-600">{product.availabilityStatus}</span>
                        </div>

                        <p className="opacity-70 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <button className="nm-button w-full py-4 text-lg font-bold uppercase tracking-widest hover:text-accent">
                            Add to Cart
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="nm-card p-4 text-center">
                            <span className="text-xs opacity-50 block mb-1 uppercase">SKU</span>
                            <span className="font-semibold">{product.sku}</span>
                        </div>
                        <div className="nm-card p-4 text-center">
                            <span className="text-xs opacity-50 block mb-1 uppercase">Brand</span>
                            <span className="font-semibold">{product.brand}</span>
                        </div>
                        <div className="nm-card p-4 text-center">
                            <span className="text-xs opacity-50 block mb-1 uppercase">Warranty</span>
                            <span className="font-semibold text-sm">{product.warrantyInformation}</span>
                        </div>
                        <div className="nm-card p-4 text-center">
                            <span className="text-xs opacity-50 block mb-1 uppercase">Shipping</span>
                            <span className="font-semibold text-sm">{product.shippingInformation}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section - Server Rendered */}
            <section className="mt-20">
                <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {product.reviews.map((review, i) => (
                        <div key={i} className="nm-card p-6">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold">{review.reviewerName}</span>
                                <div className="text-yellow-500 font-bold">
                                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                </div>
                            </div>
                            <p className="opacity-70 text-sm mb-4">"{review.comment}"</p>
                            <span className="text-xs opacity-40">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

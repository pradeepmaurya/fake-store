"use client";

import { useRouter } from "next/navigation";

export default function PDPBackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => (window.history.length > 1 ? router.back() : router.push("/"))}
            className="nm-button inline-flex items-center gap-2 px-6 py-2 mb-8 w-fit group"
        >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Products
        </button>
    );
}

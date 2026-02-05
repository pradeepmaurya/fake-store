"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
    images: string[];
    title: string;
    thumbnail: string;
}

export default function ProductGallery({ images, title, thumbnail }: ProductGalleryProps) {
    const [activeImage, setActiveImage] = useState<string>(thumbnail);

    return (
        <div className="space-y-6">
            <div className="nm-card aspect-square relative overflow-hidden p-8">
                <Image
                    src={activeImage}
                    alt={title}
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-4 transition-all duration-300"
                />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={`nm-card w-24 h-24 flex-shrink-0 relative overflow-hidden p-2 transition-all ${activeImage === img ? "nm-inset border-2 border-accent/20" : ""
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`${title} thumbnail ${i + 1}`}
                            fill
                            sizes="96px"
                            className="object-contain p-1"
                        />
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
        </div>
    );
}

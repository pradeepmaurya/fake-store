import { ImageResponse } from 'next/og';
import { getProductById } from '@/lib/api';

// export const runtime = 'edge';

import sharp from 'sharp';

async function webpToPng(url: string) {
    const res = await fetch(url);
    const buffer = Buffer.from(await res.arrayBuffer());

    return sharp(buffer).png().toBuffer();
}

export const alt = 'Product Details';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);
    const pngBuffer = await webpToPng(product.thumbnail);
    const base64Image = `data:image/png;base64,${pngBuffer.toString('base64')}`;

    console.log("product:", product);


    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#e0e5ec',
                    padding: '60px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        justifyContent: 'center',
                        paddingRight: '40px',
                    }}
                >
                    <div
                        style={{
                            fontSize: '24px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            color: 'rgba(0,0,0,0.5)',
                            marginBottom: '10px',
                        }}
                    >
                        {product.brand}
                    </div>
                    <div
                        style={{
                            fontSize: '64px',
                            fontWeight: 800,
                            color: '#1a1a1a',
                            lineHeight: 1.2,
                            marginBottom: '30px',
                        }}
                    >
                        {product.title}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#e0e5ec',
                            borderRadius: '20px',
                            padding: '15px 30px',
                            boxShadow: '10px 10px 20px #a3b1c6, -10px -10px 20px #ffffff',
                            // width: 'fit-content',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '36px',
                                fontWeight: 800,
                                color: '#6e85b7',
                            }}
                        >
                            ${product.price}
                        </span>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flex: 1,
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#e0e5ec',
                        borderRadius: '40px',
                        boxShadow: 'inset 8px 8px 16px #a3b1c6, inset -8px -8px 16px #ffffff',
                        padding: '40px',
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={base64Image}
                        alt={product.title}
                        style={{
                            width: '450px',
                            height: '450px',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}

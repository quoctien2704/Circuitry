import { blogData } from "@/data/sitedata";
import Image from 'next/image'

/**
 * This component renders a full-width hero banner for blog-related pages.
 * It features a background image with a dark overlay for text contrast and 
 * a dynamic title that can be passed as a prop or fall back to global data.
 * * * ThemeForest Standard: Using 'pointer-events-none' on overlays to prevent 
 * blocking interaction with elements beneath the visual layer.
 */

export function BlogImage({ title }: { title?: string }) {
    return (
        <section className="relative group overflow-hidden">
            {/* Background Image Container */}
            <div className="relative">
                <div className="flex items-center justify-center overflow-hidden">
                    <Image
                        loading="eager" // Prioritize loading for Above-the-Fold content
                        className="w-full aspect-5/2 object-cover group-hover:scale-110 transition-transform duration-500 min-h-100"
                        src={blogData.image.src || '/empty_image.webp'}
                        alt={title || blogData.image.alt || 'Blog Header Banner'}
                        width={blogData.image.width || 1920}
                        height={blogData.image.height || 768}
                    />
                </div>

                {/* Visual Overlay: Ensures the white text is readable regardless of image brightness */}
                <div className="absolute inset-0 bg-black/30 pointer-events-none" aria-hidden="true"></div>
            </div>

            {/* Centered Heading Content */}
            <div className="
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
                hover:scale-105 transition-transform duration-300
                w-full container mx-auto px-4
            ">
                <h3 className="
                    text-center font-bold text-5xl text-white drop-shadow-lg
                    max-lg:text-4xl max-md:text-3xl
                ">
                    {title ? title : (blogData.image.alt || 'Blog Collection')}
                </h3>
            </div>
        </section>
    );
}
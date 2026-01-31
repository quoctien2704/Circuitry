import { categoryData } from "@/data/sitedata"
import Image from 'next/image'

/**
 * CategoryImage Component
 * Displays a high-impact hero banner for category archive pages.
 * Features a background image with a dark overlay and a centered title.
 * * Performance Note: Uses 'loading="eager"' as this is typically an "above-the-fold" element.
 */

export function CategoryImage() {
    return (
        <section className="relative group overflow-hidden">
            <div className="relative">
                {/* Image Container with Zoom Effect */}
                <div className="flex items-center justify-center overflow-hidden">
                    <Image
                        loading="eager"
                        className="w-full aspect-5/2 object-cover group-hover:scale-110 transition-transform duration-500 min-h-100"
                        src={categoryData.image.src || '/empty_image.webp'}
                        alt={categoryData.image.alt || 'Category Banner'}
                        width={categoryData.image.width || 1920}
                        height={categoryData.image.height || 768}
                    />
                </div>

                {/* Overlay for better text readability */}
                <div
                    className="absolute left-0 top-0 w-full h-full bg-black/30 pointer-events-none"
                    aria-hidden="true"
                ></div>
            </div>

            {/* Centered Heading */}
            <div className="
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
                hover:scale-105 transition-transform duration-300
                max-lg:container max-lg:mx-auto max-lg:w-full px-4
            ">
                <h3 className="
                    text-center font-bold text-5xl text-white drop-shadow-lg
                    max-lg:text-4xl max-md:text-3xl
                ">
                    {categoryData.image.alt || 'Category'}
                </h3>
            </div>
        </section>
    );
}
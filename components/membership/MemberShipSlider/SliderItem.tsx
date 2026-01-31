import { MemberShipSliderItemData } from "@/types";
import Image from 'next/image'
import Link from "next/link";

/**
 * Individual Slider Item for the Membership Hero.
 * Optimized for ThemeForest:
 * - A11y: Added aria-label to the parent Link to describe the slide's destination.
 * - UX: Improved text legibility using a sophisticated gradient overlay.
 * - Performance: High-priority image loading for Hero sections.
 */

export function SliderItem({ item }: { item: MemberShipSliderItemData }) {
    return (
        <Link
            href={item.slider_href || "#"}
            className="relative group block overflow-hidden"
            aria-label={`Join our membership: ${item.slider_content}`}
        >
            <div className="relative">
                <div className="flex items-center justify-center overflow-hidden">
                    <Image
                        loading="eager" // Hero images should load immediately
                        priority={true} // Priority for LCP (Largest Contentful Paint)
                        className="w-full aspect-5/2 object-cover group-hover:scale-110 transition-transform duration-700 min-h-100"
                        src={item.image.src || '/empty_image.webp'}
                        alt={item.image.alt || 'Membership Slide'}
                        width={item.image.width || 1920}
                        height={item.image.height || 768}
                    />
                </div>

                {/* Advanced Gradient Overlay for better text contrast */}
                <div
                    className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/40 transition-opacity duration-300 group-hover:opacity-50"
                    aria-hidden="true"
                ></div>
            </div>

            {/* Content Centered Overlay */}
            <div className="
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
                transition-transform duration-500 group-hover:scale-105
                w-full max-w-4xl px-4
            ">
                <h3 className="
                    text-center font-bold text-5xl text-white drop-shadow-lg
                    max-lg:text-3xl max-sm:text-2xl font-serif italic
                    leading-tight
                ">
                    {item.slider_content}
                </h3>
            </div>
        </Link>
    );
}
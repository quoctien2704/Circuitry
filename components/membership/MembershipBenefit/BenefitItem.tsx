import { MembershipBenefitItemData } from "@/types";
import Image from 'next/image'

/**
 * Renders an individual benefit card for the membership section.
 * Optimized for ThemeForest:
 * - SEO: Semantic heading structure (h3 for title, span for category).
 * - A11y: Image alt-text fallbacks and decorative hidden elements.
 * - Layout: Aspect-ratio management and text truncation for UI consistency.
 */
export function BenefitItem({ item }: { item: MembershipBenefitItemData }) {
    // Safety check for image data
    const imageSrc = item.image?.src || '/empty_webp.jpg';
    const imageAlt = item.image?.alt || item.benefit_title || 'Benefit illustration';

    return (
        <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-black transition-all duration-300 hover:shadow-lg group">
            {/* Image Container */}
            <div className="overflow-hidden">
                <Image
                    className="w-full aspect-4/5 object-cover group-hover:scale-105 transition-transform duration-500"
                    src={imageSrc}
                    alt={imageAlt}
                    width={item.image?.width || 400}
                    height={item.image?.height || 400}
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                    {/* Primary Title */}
                    <h3 className="text-xl font-bold max-lg:text-lg leading-tight text-gray-900 dark:text-white">
                        {item.benefit_title}
                    </h3>

                    {/* Category Label - Switched to span for semantic correctness */}
                    <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 bg-gray-100 dark:bg-gray-800 text-primary rounded-full">
                        {item.benefit_category}
                    </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 max-lg:text-sm leading-relaxed">
                    {item.benefit_paragraph}
                </p>
            </div>
        </div>
    );
}

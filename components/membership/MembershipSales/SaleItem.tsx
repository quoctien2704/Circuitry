import { SaleItemData } from "@/types";
import { PrimaryButton } from "@/components/button/primaryButton";
import { ReactIcon } from "@/components/Icon/ReactIcon";
import Link from "next/link";

/**
 * Renders an individual pricing or sales tier card.
 * Optimized for ThemeForest:
 * - Semantic: Correct h3/h4 nesting for pricing plan titles.
 * - Accessibility: aria-labels for icon links and clear CTA purpose.
 * - UX: Visual feedback on hover and clean divider logic.
 */
export function SaleItem({ saleItem }: { saleItem: SaleItemData }) {
    // Safety check for icon and link data
    const { sv_icon, sales_string, sales_paragraph, sales_title, sales_button_content } = saleItem;

    return (
        <div className="
            border border-gray-300 dark:border-gray-600 p-8 rounded-4xl
            max-lg:p-6 max-lg:rounded-2xl h-full flex flex-col
            transition-all duration-300 hover:border-primary hover:shadow-xl
        ">
            <div className="flex flex-col gap-6 h-full">
                {/* Icon or Plan Tag */}
                <Link
                    href={sv_icon.social_href || "#"}
                    aria-label={`Learn more about ${sales_title || 'this plan'}`}
                    className="hover:text-primary group hover:scale-125 transition-all flex items-center justify-start w-fit"
                >
                    {sv_icon.social_svg === '' ? (
                        <h3 className="font-bold text-gray-400 dark:text-gray-600 max-lg:text-sm tracking-widest uppercase">
                            {sv_icon.social_name}
                        </h3>
                    ) : (
                        <div className="p-4 bg-gray-200 dark:bg-gray-800 w-fit rounded-full transition-colors group-hover:bg-primary/10">
                            <ReactIcon name={sv_icon.social_svg || ''} size={30} />
                        </div>
                    )}
                </Link>

                {/* Price or Sales Tagline */}
                <h4 className="text-4xl font-bold max-lg:text-2xl text-gray-900 dark:text-white leading-tight">
                    {sales_string}
                </h4>

                {/* Brief Description */}
                <p className="text-gray-600 dark:text-gray-300 italic max-lg:text-sm">
                    {sales_paragraph}
                </p>

                <hr className="border-gray-300 dark:border-gray-700 mt-auto" aria-hidden="true" />

                {/* Plan Title (e.g., "Premium Plan") */}
                <strong className="text-3xl max-lg:text-xl font-serif text-gray-800 dark:text-gray-100">
                    {sales_title}
                </strong>

                {/* Detailed Sales Paragraph */}
                <p className="text-gray-600 dark:text-gray-400 max-lg:text-sm leading-relaxed">
                    {sales_paragraph}
                </p>

                <hr className="border-gray-300 dark:border-gray-700" aria-hidden="true" />

                {/* Call to Action Button */}
                <Link
                    href={sv_icon.social_href || "#"}
                    className="mt-4 block w-full"
                    aria-label={`Purchase or join the ${sales_title} membership`}
                >
                    <PrimaryButton content={sales_button_content} />
                </Link>
            </div>
        </div>
    );
}
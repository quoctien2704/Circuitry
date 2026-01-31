import { membershipData } from "@/data/sitedata";
import { FaStar } from "react-icons/fa";

/**
 * Renders the introduction header for the Membership page.
 * Optimized for ThemeForest:
 * - Semantic: Uses h1 or h2 based on page context (assumed h2 for section).
 * - Stability: Safe data access with fallback strings.
 * - Clean CSS: Fixed typos in responsive utility classes.
 */
export function MembershipTop() {
    const topData = membershipData?.top || {};

    return (
        <section className="my-20 max-md:my-10" aria-labelledby="membership-top-header">
            <div className="container mx-auto px-4">
                <div className="
                    flex flex-col gap-10 items-center justify-center
                    max-lg:items-start max-lg:gap-4
                ">
                    {/* Featured Badge */}
                    <span className="flex gap-2 items-center justify-center bg-black dark:bg-white text-white dark:text-black p-4 rounded-xl font-bold transition-transform hover:scale-105">
                        <FaStar className="text-yellow-400" aria-hidden="true" />
                        {topData.sub_title || 'Premium Access'}
                    </span>

                    {/* Page Header */}
                    <h2
                        id="membership-top-header"
                        className="text-5xl font-medium font-serif italic lg:text-center leading-tight"
                    >
                        {topData.header || 'Join Our Community'}
                    </h2>

                    {/* Description Paragraph */}
                    <p className="text-lg text-gray-600 dark:text-gray-400 lg:w-[50%] lg:text-center mx-auto leading-relaxed">
                        {topData.paragraph}
                    </p>

                    {/* Divider with Sub-paragraph */}
                    <div className="flex items-center justify-center gap-4 w-full">
                        <hr className="h-px w-full border-gray-300 dark:border-gray-700 max-lg:hidden" />

                        <strong className="lg:text-center text-gray-500 lg:text-nowrap italic font-medium">
                            {topData.sub_paragraph}
                        </strong>

                        <hr className="h-px w-full border-gray-300 dark:border-gray-700" />
                    </div>
                </div>
            </div>
        </section>
    );
}

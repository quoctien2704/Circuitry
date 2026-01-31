import { BreadCrumbData } from "@/types/item";
import { MdDoubleArrow } from "react-icons/md";
import Link from "next/link";

/**
 * This component renders a primary Breadcrumb navigation bar.
 * It is designed to sit overlapping sections (via negative margin) to create a 
 * seamless UI transition between a header/hero and the main content.
 * * @param {BreadCrumbData} data - Array of objects containing title and href for each navigation level.
 * * ThemeForest Standard: Implements semantic <nav> and aria-labels to meet accessibility requirements.
 */
export function BreadCrumb({ data }: { data: BreadCrumbData }) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="w-full relative z-12 -mt-12"
        >
            <div className="container mx-auto px-4">
                {/* Decorative top gradient border */}
                <div className="bg-linear-to-r from-transparent via-gray-400 to-transparent w-full h-px"></div>

                <div className="bg-white dark:bg-[hsl(225,40%,5%)] shadow-lg rounded-xl py-8 max-lg:py-4">
                    {data && data.length > 0 ? (
                        <ul className="flex gap-4 items-center justify-center flex-wrap">
                            {data.map((item, index) => {
                                const isLast = index === data.length - 1;

                                return (
                                    <li key={`${item.title}-${index}`} className="flex items-center">
                                        {!isLast ? (
                                            /* Active Links for previous levels */
                                            <div className="flex gap-4 items-center justify-center">
                                                <Link
                                                    className="font-bold text-lg hover:text-primary transition-colors duration-300"
                                                    href={item.href || '#'}
                                                    aria-label={`Go to ${item.title || 'previous page'}`}
                                                >
                                                    {item.title || 'Home'}
                                                </Link>
                                                <MdDoubleArrow
                                                    className="text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        ) : (
                                            /* Static text for the current page level */
                                            <span
                                                className="font-bold text-gray-400 dark:text-gray-600 text-lg"
                                                aria-current="page"
                                            >
                                                {item.title || 'Current Page'}
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        /* Fallback: Provides a default Home crumb if data is missing */
                        <p className="text-center text-gray-400 italic">Navigation unavailable</p>
                    )}
                </div>

                {/* Decorative bottom gradient border */}
                <div className="bg-linear-to-r from-transparent via-gray-400 to-transparent w-full h-px"></div>
            </div>
        </nav>
    );
}

/**
 * A secondary breadcrumb component for deeper level navigation pages.
 * Unlike the primary BreadCrumb, this version focuses on a minimal, 
 * left-aligned layout suitable for content-heavy legal or technical pages.
 * * @param {BreadCrumbData} data - Navigation path data containing titles and destination URLs.
 */
export function BreadCrumbSecond({ data }: { data: BreadCrumbData }) {
    return (
        <nav
            aria-label="Secondary Breadcrumb"
            className="w-full relative z-12"
        >
            <div className="container mx-auto px-4">
                <div className="bg-white dark:bg-[hsl(225,40%,5%)]">
                    {data && data.length > 0 ? (
                        <ul className="flex gap-4 items-center justify-start flex-wrap">
                            {data.map((item, index) => {
                                const isLast = index === data.length - 1;

                                return (
                                    <li key={`${item.title}-${index}`} className="flex items-center">
                                        {!isLast ? (
                                            /* Navigable Breadcrumb Item */
                                            <div className="flex gap-4 items-center justify-center">
                                                <Link
                                                    className="font-bold text-lg max-lg:text-base hover:text-primary transition-colors duration-300"
                                                    href={item.href || '#'}
                                                    aria-label={`Back to ${item.title || 'previous section'}`}
                                                >
                                                    {item.title || 'Home'}
                                                </Link>
                                                {/* Visual separator hidden from screen readers */}
                                                <MdDoubleArrow
                                                    className="text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        ) : (
                                            /* Current Page Indicator */
                                            <span
                                                className="font-bold text-gray-400 dark:text-gray-600 text-lg max-lg:text-base"
                                                aria-current="page"
                                            >
                                                {item.title || 'Current Page'}
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        /* Default fallback for empty data */
                        <p className="text-gray-400 italic">Navigation path unavailable</p>
                    )}
                </div>
            </div>
        </nav>
    );
}
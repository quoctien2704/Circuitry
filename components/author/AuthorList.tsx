"use client"
import { authorData } from "@/data/sitedata"
import { authorsData } from "@/data/authors/authors"
import { FaArrowRightLong } from "react-icons/fa6"
import { useState } from "react"
import { AuthorItem } from "./AuthorItem"
import { PrimaryButton } from "../button/primaryButton"
import Link from 'next/link'

/**
 * This component renders a grid-based list of authors with an interactive "Load More" feature.
 * It is designed for the "Our Authors" or "Meet the Team" section of the blog.
 * * Key features:
 * - Dynamic item counting to limit initial load.
 * - Responsive grid (3 columns on desktop, 1 on mobile).
 * - Semantic list structure for SEO and accessibility.
 */

export function AuthorList() {
    // State to manage the number of authors displayed, starting with a default of 3.
    const [itemCount, setItemCount] = useState(3);

    /**
     * Handles the 'Load More' action by incrementing the visible items.
     * ThemeForest Tip: Using a functional update ensures the count is always accurate.
     */
    const handleLoadMore = () => {
        setItemCount((prev) => prev + 3);
    };

    return (
        <section className="my-20 max-lg:my-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10 max-lg:gap-4">

                    {/* Header Row: Title and View All Link */}
                    <div className="flex items-end justify-between gap-4">
                        <h3 className="text-5xl font-medium font-serif italic max-md:text-2xl text-gray-800 dark:text-gray-100">
                            {authorData.list.title || 'Our Contributors'}
                        </h3>
                        <Link
                            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary transition-colors justify-center gap-2"
                            href={authorData.list.sub_title_href || '/authors'}
                            aria-label={`View all contributors on ${authorData.list.title}`}
                        >
                            <span className="font-medium">{authorData.list.sub_title || 'View All'}</span>
                            <FaArrowRightLong size={14} className="mt-1" />
                        </Link>
                    </div>

                    <hr className="border-gray-300 dark:border-gray-700" />

                    {/* Authors Grid Display */}
                    {authorsData && authorsData.length > 0 ? (
                        <ul className="grid grid-cols-3 gap-10 max-md:grid-cols-1 max-lg:gap-6">
                            {authorsData.slice(0, itemCount).map((author, index) => (
                                <li
                                    key={`${author.id || index}-${author.name}`}
                                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                                >
                                    <AuthorItem item={author} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-400 italic py-10">
                            No authors available at this moment.
                        </p>
                    )}

                    {/* Progressive Loading Button */}
                    {itemCount < authorsData.length && (
                        <div className="flex justify-center mt-10" onClick={handleLoadMore}>
                            <PrimaryButton
                                content="Load more authors"
                                aria-label="Load three more authors to the list"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
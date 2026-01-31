"use client"
import { categoryData } from "@/data/sitedata"
import { FaArrowRightLong } from "react-icons/fa6";
import { categoriesData } from "@/data/category/category";
import Link from "next/link"
import { CategoryItem } from "./CategoryItem";
import { useState } from "react";
import { PrimaryButton } from "../button/primaryButton";

/**
 * CategoryList Component
 * Renders a responsive grid of categories with a "Load More" functionality.
 * Perfect for homepages or dedicated category archive explorers.
 * * Key features:
 * - Dynamic grid: 6 columns (Desktop) -> 4 columns (Tablet) -> 2 columns (Mobile).
 * - Animated entrance for newly loaded items.
 * - Progressive disclosure of categories to maintain page performance.
 */
export function CategoryList() {
    // Initial display count set to 6 for a full row on desktop
    const [itemCount, setItemCount] = useState(6);

    /**
     * Logic to load the next set of categories.
     * We use a functional update to ensure state consistency.
     */
    const handleLoadMore = () => {
        setItemCount((prev) => prev + 6);
    };

    return (
        <section className="my-20 max-lg:my-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10 max-lg:gap-6">

                    {/* Header Row: Title and Global Explorer Link */}
                    <div className="flex items-end justify-between gap-4">
                        <h3 className="text-5xl font-medium font-serif italic max-md:text-2xl text-gray-800 dark:text-gray-100">
                            {categoryData.list.title || 'Explore Categories'}
                        </h3>
                        <Link
                            className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary transition-colors justify-center gap-2"
                            href={categoryData.list.sub_title_href || '/categories'}
                            aria-label={`View all categories from ${categoryData.list.title}`}
                            title={`View all categories from ${categoryData.list.title}`}
                        >
                            <span className="font-medium">{categoryData.list.sub_title || 'See All'}</span>
                            <FaArrowRightLong size={12} className="mt-1" />
                        </Link>
                    </div>

                    <hr className="border-gray-200 dark:border-gray-800" />

                    {/* Categories Grid Container */}
                    {categoriesData && categoriesData.length > 0 ? (
                        <ul className="
                            grid grid-cols-6 gap-10
                            max-xl:grid-cols-4 max-xl:gap-7
                            max-md:grid-cols-2 max-md:gap-4
                        ">
                            {categoriesData.slice(0, itemCount).map((category, index) => (
                                <li
                                    key={`${category.id || index}-${category.name}`}
                                    className="animate-in fade-in zoom-in-95 duration-500"
                                >
                                    <CategoryItem categoryData={category} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-400 italic py-10">
                            No categories found.
                        </p>
                    )}

                    {/* Action Area: Load More Button */}
                    {itemCount < categoriesData.length && (
                        <div
                            className="ml-auto max-lg:mx-auto cursor-pointer"
                            onClick={handleLoadMore}
                        >
                            <PrimaryButton
                                content="Load more categories"
                                aria-label="Show more blog categories"
                            />
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
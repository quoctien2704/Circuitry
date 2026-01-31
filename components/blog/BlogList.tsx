"use client";

import { FilterForArticle, getArticleByBlogID } from "@/data/articles/articles";
import { ArticleItem } from "../article/article_item";
import { useEffect, useMemo, useState } from "react";
import { PrimaryButton } from "../button/primaryButton";
import { useSearchParams } from "next/navigation";

/**
 * BlogList Component
 *
 * Renders a dynamic list of blog articles with filtering and progressive
 * "Load More" pagination support.
 *
 * The displayed articles automatically react to URL search parameters
 * (such as category, tags, and search queries), ensuring a seamless
 * browsing experience without requiring manual page refreshes.
 *
 * @param {number} id - Optional identifier used to scope articles
 * to a specific blog category or section.
 *
 * Implementation Notes:
 * - Article data is derived from application state and URL parameters,
 *   avoiding unnecessary local state duplication.
 * - React `useMemo` is used to efficiently compute filtered results
 *   whenever relevant dependencies change.
 * - Local UI state (pagination count) is synchronized with navigation
 *   changes using a lightweight side-effect.
 *
 * ThemeForest Standard:
 * - Clear separation between derived data and UI state.
 * - Predictable reactivity to navigation and filter changes.
 * - Optimized rendering without cascading updates.
 */
export function BlogList({ id }: { id?: number }) {
    const searchParams = useSearchParams();

    // Controls progressive article loading (pagination limit)
    const [count, setCount] = useState(3);

    /**
     * Memoized computation of the filtered article list.
     *
     * The article list is derived directly from the current blog scope (`id`)
     * and active URL search parameters. Using `useMemo` prevents unnecessary
     * recalculations and avoids storing derived data in local state.
     */
    const blogList = useMemo(() => {
        return FilterForArticle(
            getArticleByBlogID(id || undefined),
            searchParams
        );
    }, [id, searchParams]);

    /**
     * Resets the pagination count whenever filters or blog scope change.
     *
     * This side-effect improves user experience by ensuring the article list
     * always starts from the initial visible set when navigation or filters
     * are updated.
     */
    useEffect(() => {
        setCount(3);
    }, [id, searchParams]);

    return (
        <section className="my-20 max-lg:my-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10 max-lg:gap-4">
                    {/* Dynamic List Heading */}
                    <h3 className="text-5xl font-serif italic max-lg:text-3xl text-gray-800 dark:text-gray-100">
                        {searchParams.get("category") || "Blog List"}
                    </h3>

                    <hr className="border-gray-300 dark:border-gray-700" />

                    {/* Responsive Article Grid */}
                    {blogList && blogList.length > 0 ? (
                        <ul
                            className="
                                grid grid-cols-3 gap-6
                                max-xl:grid-cols-2 max-xl:gap-7
                                max-md:grid-cols-1 max-md:gap-10
                            "
                        >
                            {blogList.slice(0, count).map((article, index) => (
                                <li
                                    key={`${article.id || index}-${article.title}`}
                                    className="animate-in fade-in slide-in-from-bottom-5 duration-500"
                                >
                                    <ArticleItem article={article} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        /* Professional Empty State */
                        <div className="py-20 text-center">
                            <h2 className="text-4xl font-medium font-serif italic text-gray-400">
                                No Articles Found
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Try adjusting your filters or search query.
                            </p>
                        </div>
                    )}

                    {/* Progressive Load More Action */}
                    {blogList && count < blogList.length && (
                        <div className="flex flex-col gap-10 mt-10">
                            <hr className="border-gray-300 dark:border-gray-700" />
                            <div
                                className="mx-auto cursor-pointer"
                                onClick={() => setCount((prev) => prev + 3)}
                            >
                                <PrimaryButton content="Load more stories" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

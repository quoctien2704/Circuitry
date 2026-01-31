"use client"
import { getArticleByBlogCategory } from "@/data/articles/articles";
import { ArticleItem } from "../article/article_item";
import { useState } from "react";
import { PrimaryButton } from "../button/primaryButton";
/**
 * This component displays a paginated list of articles filtered by category.
 * It features a "Load More" mechanism to progressively reveal articles in increments of 3,
 * and handles empty states gracefully when no blogs are found for a specific category.
 * * @param {string} [category] - Optional category slug used to filter the article list.
 */
export function CategoryArticleList({ category }: { category?: string }) {

    /**
     * 'count' manages the number of articles currently visible in the UI.
     * 'blogList' stores the full collection of articles retrieved based on the category.
     */
    const [count, setCount] = useState(3);
    const [blogList] = useState(getArticleByBlogCategory(category));

    return (
        <section className="my-20 max-lg:my-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10 max-lg:gap-4">
                    {/* Section Header */}
                    <h3 className="text-5xl font-serif italic max-lg:text-2xl">Blog List</h3>
                    <hr className="border-gray-300 dark:border-gray-700"></hr>

                    {/* Article Grid Rendering */}
                    {blogList && blogList.length > 0 && (
                        <ul className="
                            grid grid-cols-3 gap-4
                            max-xl:grid-cols-2 max-xl:gap-7
                            max-md:grid-cols-1 max-md:gap-10
                        ">
                            {/* progressive display of articles based on the 'count' state */}
                            {blogList.slice(0, count).map(article => (
                                <li key={`${article.title} - ${article.id}`}>
                                    <ArticleItem article={article} />
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Pagination / Load More Section */}
                    {/* Only displayed if there are more articles left to reveal */}
                    {blogList && count < blogList.length && (
                        <div className="flex flex-col gap-10 max-lg:gap-4">
                            <hr className="border-gray-300 dark:border-gray-700"></hr>
                            <div
                                onClick={() => setCount(prev => prev + 3)}
                                className="w-fit cursor-pointer"
                            >
                                <PrimaryButton content="Load more" />
                            </div>
                        </div>
                    )}

                    {/* Empty State: Displayed when no articles match the criteria */}
                    {blogList.length === 0 && (
                        <h2 className="text-5xl font-medium font-serif italic mb-10 text-center">
                            Blog Not Found
                        </h2>
                    )}
                </div>
            </div>
        </section>
    );
}
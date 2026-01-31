import { getArticleAsCustomBlog, getArticleByID } from "@/data/articles/articles";
import { homeLayoutTwoData } from "@/data/sitedata"
import { useState } from "react"
import { HomeLatestItemTwo } from "../../swiper/HomeLatestItemTwo";
import { HomeLatestBigItemTwo } from "../../swiper/HomeLatestBigItemTwo";

/**
 * Renders the Latest News section with a split layout.
 * Features a primary highlighted article and a vertical list of secondary articles.
 * * ThemeForest Standards:
 * - Uses semantic <ul> and <li> for list-based blog feeds.
 * - ARIA labels for better navigation context.
 * - Robust data handling with fallbacks.
 */
export function HomeLatestTwo() {
    // Destructure for cleaner access and provide safe fallbacks
    const { latest } = homeLayoutTwoData || {};

    const [big_article] = useState(getArticleByID(latest?.main_blog_id));
    const [articles] = useState(getArticleAsCustomBlog(latest?.extra_blog_id) || []);

    // Pre-calculate reading time safely

    return (
        <section className="my-40 max-lg:my-20" aria-label="Latest Articles">
            <div className="container mx-auto px-4">
                <div className="flex gap-4 max-xl:flex-col">
                    {/* Primary Highlighted Article */}
                    <div>
                        {big_article && (
                            <HomeLatestBigItemTwo
                                article={big_article}
                            />
                        )}
                    </div>

                    {/* Secondary Articles Sidebar List */}
                    <div className="flex-5">
                        {articles.length > 0 ? (
                            <ul className="flex flex-col gap-4" role="list">
                                {articles.map((article, index) => (
                                    <li key={article.id || article.title || index}>
                                        <HomeLatestItemTwo article={article} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            // Fallback if no articles found
                            <p className="text-center py-10 opacity-50 italic border border-dashed rounded-xl">
                                No recent stories available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
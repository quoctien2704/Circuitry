import { getArticleByBlogID, getArticleByID } from "@/data/articles/articles"
import { homeLayoutTwoData } from "@/data/sitedata"
import { useState } from "react"
import { HomeGridItemTwo } from "../../swiper/HomeGridItemTwo"
import { HomeBigItemTwo } from "../../swiper/HomeBigItemTwo"

/**
 * Renders a split-column layout with a grid of small articles and one featured large article.
 * * ThemeForest Optimizations:
 * - Responsive: Uses 'flex-col-reverse' on mobile for better content priority.
 * - Accessibility: Implements list roles for grid items to improve navigation.
 * - Stability: Uses optional chaining and fallback checks for article data.
 */

export function HomeColumnTwo() {
    const columnData = homeLayoutTwoData?.column || {};
    const [gridArticles] = useState(getArticleByBlogID(columnData.grid_articles) || []);
    const [bigArticle] = useState(getArticleByID(columnData.big_articles_blog_id));

    return (
        <section className="my-40 max-lg:my-20" aria-label="Featured content grid">
            <div className="container mx-auto px-4">
                <div className="flex gap-4 max-xl:gap-8 max-xl:flex-col-reverse">

                    {/* Left Column: Grid of Small Articles */}
                    <div className="flex-1">
                        {gridArticles.length > 0 ? (
                            <div
                                className="grid grid-cols-2 gap-4 max-sm:grid-cols-1"
                                role="list"
                                aria-label="Supplementary articles"
                            >
                                {gridArticles.slice(0, 4).map((article, index) => (
                                    <div key={article.id || index} role="listitem">
                                        <HomeGridItemTwo article={article} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center py-10 opacity-50 italic">No grid articles found.</p>
                        )}
                    </div>

                    {/* Right Column: Featured Big Article */}
                    <div className="flex-1">
                        {bigArticle ? (
                            <HomeBigItemTwo article={bigArticle} />
                        ) : (
                            <div className="h-full min-h-100 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center">
                                <p className="opacity-50">Featured article missing.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
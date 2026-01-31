"use client"

import { getArticleAsCustomBlog, getArticleByID } from "@/data/articles/articles"
import { homeData } from "@/data/sitedata"
import { useState } from "react"
import { MainLatestBlog, ExtraMainLatestBlog } from "../../blog/blog_main_latest_blog"
/**
 * Renders the Latest Blog section featuring a main highlight article 
 * and a grid of supplementary articles.
 * * ThemeForest Best Practices:
 * - Semantic sectioning with aria-labelledby.
 * - Dynamic data fetching with fallbacks for empty states.
 * - Responsive layout handling (flex-col on mobile).
 */
export function HomeLastestBlog() {
    // Fallback to empty objects/arrays to prevent component crash
    const latestData = homeData?.latest || {};
    const [mainItem] = useState(getArticleByID(latestData.main_blog));
    const [subItem] = useState(getArticleAsCustomBlog(latestData.sub_blog) || []);

    return (
        <section
            className="my-20 py-20 bg-gray-100 dark:bg-black"
            aria-labelledby="latest-blog-header"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10">
                    {/* ID linked to section's aria-labelledby for screen readers */}
                    <h2
                        id="latest-blog-header"
                        className="text-6xl italic font-serif"
                    >
                        {latestData.header || 'Latest from our Blog'}
                    </h2>

                    {/* Main Featured Article */}
                    {mainItem && <MainLatestBlog article={mainItem} />}

                    {/* Secondary Articles Grid */}
                    {subItem.length > 0 && (
                        <div className="grid grid-cols-3 lg:mt-6 gap-4 max-md:flex max-md:flex-col" role="list" aria-label="More recent articles">
                            {subItem.map((blog, index) => (
                                <div key={blog.id || index} role="listitem">
                                    <ExtraMainLatestBlog article={blog} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
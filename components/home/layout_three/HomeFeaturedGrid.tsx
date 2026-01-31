import { getArticleAsCustomBlog } from "@/data/articles/articles"
import { homeLayoutThreeData } from "@/data/sitedata"
import Image from 'next/image'
import Link from "next/link"

/**
 * Renders a featured grid of articles with a zig-zag alternating layout.
 * Optimized for ThemeForest:
 * - SEO: Semantic list structure with heading hierarchy.
 * - Accessibility: Descriptive aria-labels for large image links.
 * - Performance: Aspect-ratio management and lazy loading for images.
 */

export function HomeFeaturedGrid() {
    const featureData = homeLayoutThreeData?.feature || {};
    const articles = getArticleAsCustomBlog(featureData.articles_id) || [];

    // Create an array of row indices (2 articles per row)
    const rowIndices = Array.from(
        { length: Math.floor(articles.length / 2) },
        (_, index) => index
    );

    return (
        <section className="my-40 max-lg:my-20" aria-labelledby="featured-grid-title">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-2">
                    {/* Badge/Sub-title */}
                    <span className="px-6 py-2 rounded-lg bg-primary mb-4 text-white w-fit font-bold">
                        {featureData.sub_ttile || 'Featured'}
                    </span>

                    <h2 id="featured-grid-title" className="text-5xl font-serif italic">
                        {featureData.title || 'Featured Stories'}
                    </h2>

                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {featureData.paragraph}
                    </p>

                    {rowIndices.length > 0 && (
                        <ul className="flex flex-col gap-4 mt-8" role="list">
                            {rowIndices.map((rowIndex) => {
                                const firstArticle = articles[rowIndex * 2];
                                const secondArticle = articles[rowIndex * 2 + 1];

                                return (
                                    <li
                                        key={rowIndex}
                                        className={`flex gap-4 lg:max-h-125 ${rowIndex % 2 !== 0 ? "flex-row-reverse" : ""} max-lg:flex-col`}
                                    >
                                        {/* Large Article Card (flex-5) */}
                                        <Link
                                            href={`/article/${firstArticle.id}`}
                                            className="group max-lg:rounded-2xl overflow-hidden flex-5 relative flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary"
                                            aria-label={`Read featured story: ${firstArticle.title}`}
                                        >
                                            <div className="lg:h-full max-lg:h-100 w-full overflow-hidden">
                                                <Image
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    src={firstArticle.image_src || '/placeholder.jpg'}
                                                    alt={firstArticle.title}
                                                    width={1000}
                                                    height={500}
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-black opacity-60 transition-opacity group-hover:opacity-70" aria-hidden="true"></div>
                                            <div className="absolute flex flex-col h-full inset-0 p-8 gap-4 pointer-events-none">
                                                <h3 className="text-white mt-auto text-3xl line-clamp-2">{firstArticle.title}</h3>
                                                <p className="text-gray-300 line-clamp-3">{firstArticle.content}</p>
                                            </div>
                                        </Link>

                                        {/* Small Article Card (flex-2) */}
                                        <Link
                                            href={`/article/${secondArticle.id}`}
                                            className="group max-lg:rounded-2xl overflow-hidden flex-2 relative flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary"
                                            aria-label={`View article: ${secondArticle.title}`}
                                        >
                                            <div className="lg:h-full max-lg:h-100 w-full overflow-hidden">
                                                <Image
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    src={secondArticle.image_src || '/placeholder.jpg'}
                                                    alt={secondArticle.title}
                                                    width={1000}
                                                    height={500}
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-black opacity-30 transition-opacity group-hover:opacity-40" aria-hidden="true"></div>
                                            <div className="absolute flex flex-col h-full inset-0 p-8 gap-4 pointer-events-none">
                                                <h3 className="text-white mt-auto text-3xl line-clamp-2">{secondArticle.title}</h3>
                                                <p className="text-gray-300 line-clamp-3">{secondArticle.content}</p>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
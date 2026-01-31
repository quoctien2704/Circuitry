"use client"
import { getArticleByBlogID } from "@/data/articles/articles"
import { homeLayoutFourData } from "@/data/sitedata"
import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { ArticleData } from "@/types/item";
import Link from "next/link";

/**
 * Renders a section showcasing popular categories with an article carousel.
 * Optimized for ThemeForest:
 * - SEO: Semantic heading hierarchy (H2 -> H3).
 * - A11y: Swiper accessibility with role="region" and dynamic slide labels.
 * - UX: Layout shift prevention using 'swiper-initialized' classes.
 */
export function HomePopularCategory() {
    const { popular } = homeLayoutFourData;
    const [articles] = useState(getArticleByBlogID(popular.blog_id));

    return (
        /* Uses aria-labelledby to associate the section with its main heading */
        <section className='my-40 max-md:my-20' aria-labelledby="popular-cat-title">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-4">
                    {/* Decorative sub-title using a span to maintain heading hierarchy */}
                    <span className="text-center text-gray-600 dark:text-gray-300">
                        {popular.sub_title || 'Featured Categories'}
                    </span>

                    <h2 id="popular-cat-title" className="text-center text-5xl max-lg:text-2xl font-medium italic font-serif">
                        {popular.title || 'Popular Selection'}
                    </h2>

                    <h3 className="text-2xl max-lg:text-xl font-medium mt-4">
                        {popular.left_title_category || 'Latest Collections'}
                    </h3>

                    {articles.length > 0 ? (
                        <Swiper
                            /* A11y: Identifies this as a carousel region for screen readers */
                            role="region"
                            aria-label="Popular articles carousel"
                            slidesPerView={1.5}
                            spaceBetween={30}
                            breakpoints={{
                                640: { slidesPerView: 2.5 },
                                1024: { slidesPerView: 3.5 },
                                1280: { slidesPerView: 4.5 },
                            }}
                            /* Prevents layout jumping before Swiper initializes */
                            className="mySwiper w-full invisible opacity-0 max-h-160 transition-all duration-300 [&.swiper-initialized]:visible [&.swiper-initialized]:opacity-100 [&.swiper-initialized]:max-h-full"
                        >
                            {articles.map((article, index) => (
                                <SwiperSlide
                                    key={article.id || index}
                                    className='h-full'
                                    /* Ensures each slide is recognized as part of a group */
                                    role="group"
                                    aria-roledescription="slide"
                                    aria-label={`${index + 1} of ${articles.length}`}
                                >
                                    <HomePopularCategoryArticleItem article={article} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        /* UX Fallback: Prevents an empty section if data fetching fails */
                        <div className="text-center py-20 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                            <p className="text-gray-500">No articles found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

/**
 * Renders an individual article card used in category sliders or grids.
 * * Performance & SEO:
 * - Uses semantic <article> and <time> tags for better indexing.
 * - Implements aspect-ratio for images to prevent Layout Shift (CLS).
 * * Accessibility:
 * - Concise aria-labels describing destinations instead of user actions.
 * - Meaningful alt text for images using article metadata.
 */
export function HomePopularCategoryArticleItem({ article }: { article: ArticleData }) {

    const {
        title = "Untitled Article",
        id,
        image_src = "/empty_image.webp",
        category = "General",
        published_at = ""
    } = article;

    return (
        <article className="border border-gray-200 dark:border-gray-800 overflow-hidden rounded-xl h-full flex flex-col bg-white dark:bg-transparent">
            {/* Featured Image Link */}
            <Link
                aria-label={`View full article: ${title}`}
                href={`/article/${id}`}
                className="group focus-visible:outline-primary"
            >
                <div className="overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <Image
                        src={image_src}
                        alt={`Thumbnail for ${title}`}
                        loading="lazy"
                        width={500}
                        height={640}
                        className="w-full h-auto object-cover aspect-4/5 group-hover:scale-105 transition-all duration-500 ease-in-out"
                    />
                </div>
            </Link>

            <div className="flex flex-col gap-2 p-4 grow">
                <div className="flex justify-between items-center flex-wrap gap-x-4">
                    {/* Category Link */}
                    <Link
                        className="group focus-visible:outline-primary"
                        href={`/category/${category}`}
                        aria-label={`Browse more in ${category}`}
                    >
                        <span className="text-gray-600 dark:text-gray-300 group-hover:text-primary max-lg:text-sm font-medium transition-colors">
                            {category}
                        </span>
                    </Link>

                    {/* Semantic Timestamp */}
                    <time
                        dateTime={published_at}
                        className="text-gray-500 dark:text-gray-400 max-lg:text-sm text-xs"
                    >
                        {published_at}
                    </time>
                </div>

                {/* Article Title Link */}
                <Link
                    aria-label={`Read full story: ${title}`}
                    href={`/article/${id}`}
                    className="hover:text-primary transition-colors focus-visible:outline-primary"
                >
                    <h4 className="lg:text-lg font-semibold line-clamp-2">
                        {title}
                    </h4>
                </Link>
            </div>
        </article>
    );
}
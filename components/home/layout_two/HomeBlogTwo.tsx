"use client"
import { getArticleByBlogID } from "@/data/articles/articles"
import { homeLayoutTwoData } from "@/data/sitedata"
import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { HomeBlogItemTwo } from "../../swiper/HomeBlogItemTwo";

/**
 * Renders a blog post carousel section.
 * Key features for ThemeForest:
 * - A11y: Section linked to its header via 'aria-labelledby'.
 * - Performance: Handles Swiper initialization state to prevent layout shift.
 * - Robustness: Fallback strings for header and sub-header.
 */
export function HomeBlogTwo() {
    const blogData = homeLayoutTwoData?.blog || {};
    const [articles] = useState(getArticleByBlogID(blogData.blog_id) || []);

    return (
        <section
            className="my-40 max-lg:my-20"
            aria-labelledby="blog-two-title"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10">
                    {/* Header Group */}
                    <div className="flex flex-col gap-4">
                        <h2
                            id="blog-two-title"
                            className="text-5xl font-medium italic font-serif max-lg:text-2xl"
                        >
                            {blogData.title || 'Latest Stories'}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {blogData.sub_title || 'Explore our most recent articles and updates.'}
                        </p>
                    </div>

                    {/* Decorative Divider */}
                    <hr className="border-none h-0.5 w-full bg-linear-to-r from-gray-300 to-transparent" aria-hidden="true" />

                    {articles.length > 0 ? (
                        <Swiper
                            role="region"
                            aria-label="Recent blog posts carousel"
                            slidesPerView={1.5}
                            spaceBetween={30}
                            breakpoints={{
                                768: { slidesPerView: 2.5 },
                                1024: { slidesPerView: 3.5 },
                            }}
                            /* CSS classes ensure the slider doesn't 'jump' on load (CLS optimization) */
                            className="mySwiper w-full invisible opacity-0 max-h-160 transition-all duration-300 [&.swiper-initialized]:visible [&.swiper-initialized]:opacity-100 [&.swiper-initialized]:max-h-full"
                        >
                            {articles.map((article, index) => (
                                <SwiperSlide
                                    key={article.id || index}
                                    className='h-full'
                                    role="group"
                                    aria-roledescription="slide"
                                    aria-label={`${index + 1} of ${articles.length}`}
                                >
                                    <HomeBlogItemTwo article={article} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        /* Empty state UX to satisfy theme quality requirements */
                        <div className="py-20 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
                            <p className="text-gray-500">No blog posts available at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
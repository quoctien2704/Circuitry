"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { getArticleAsCustomBlog } from "@/data/articles/articles"
import { homeData } from "@/data/sitedata"
import { useState } from "react"
import { ArticleTrend } from '../../article/article_trend';

/**
 * Renders the Trending Articles section with a horizontal carousel.
 * Features:
 * - Accessibility: Uses 'aria-labelledby' to link section to its heading.
 * - Performance: Prevents layout shift (CLS) with Swiper initialization classes.
 * - UX: Responsive breakpoints for various screen sizes.
 */
export function HomeTrending() {
    // Ensuring data safety with fallback
    const trendData = homeData?.trend || {};
    const [articles] = useState(getArticleAsCustomBlog(trendData.blogs) || []);

    return (
        <section className="my-20" aria-labelledby="trending-heading">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10 max-md:gap-6">
                    <h2
                        id="trending-heading"
                        className="text-6xl max-lg:text-6xl font-medium italic font-serif"
                    >
                        {trendData.header || 'Trending Now'}
                    </h2>

                    {/* Decorative line - aria-hidden to avoid unnecessary screen reader noise */}
                    <hr
                        className='border-none h-0.5 w-full bg-linear-to-r from-gray-600 to-transparent'
                        aria-hidden="true"
                    />

                    {articles.length > 0 ? (
                        <Swiper
                            role="region"
                            aria-label="Trending articles slider"
                            slidesPerView={1.5}
                            spaceBetween={30}
                            breakpoints={{
                                640: { slidesPerView: 2.5 },
                                1024: { slidesPerView: 3.5 },
                                1280: { slidesPerView: 4.5 },
                            }}
                            /* CSS logic to handle smooth loading and prevent CLS */
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
                                    <ArticleTrend article={article} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        /* Empty state UX */
                        <div className="w-full py-20 text-center opacity-50 italic">
                            No trending articles found.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
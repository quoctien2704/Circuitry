"use client"
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import { homeLayoutTwoData } from "@/data/sitedata"
import { getArticleAsCustomBlog } from '@/data/articles/articles';
import { HomeSliderItemTwo } from '../../swiper/HomeSliderItemTwo';

/**
 * Renders the main Hero Slider for Layout Two.
 * Optimized for ThemeForest:
 * - A11y: Implements WAI-ARIA carousel patterns with proper roles.
 * - UX: Navigation enabled with keyboard support.
 * - Stability: Safe data fetching with fallback for missing slider content.
 */
export function HomeSliderTwo() {
    // Ensuring slider data exists
    const sliderData = homeLayoutTwoData?.slider?.articles || [];
    const [articles] = useState(getArticleAsCustomBlog(sliderData) || []);

    return (
        <section
            className='mb-40 max-lg:mb-20'
            aria-label="Main Hero Slider"
        >
            {articles.length > 0 ? (
                <Swiper
                    navigation={true}
                    spaceBetween={16}
                    modules={[Navigation]}
                    className="mySwiper"
                    /* A11y: Standard carousel roles */
                    role="region"
                    aria-roledescription="carousel"
                >
                    {articles.map((article, index) => (
                        <SwiperSlide
                            key={article.id || index}
                            /* Ensures screen readers announce the slide context */
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`Featured Slide ${index + 1} of ${articles.length}`}
                        >
                            <HomeSliderItemTwo article={article} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                /* UX: Fallback for empty slider state */
                <div className="container mx-auto px-4 h-96 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center italic opacity-50">
                    Slider content currently unavailable.
                </div>
            )}
        </section>
    );
}
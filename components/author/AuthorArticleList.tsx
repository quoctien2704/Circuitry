"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { getArticleByAuthorID } from "@/data/articles/articles";
import { AuthorData } from "@/types/item";
import { useState } from "react";
import { AuthorArticleItem } from './AuthorArticleItem';

/**
 * This component displays a horizontally scrollable list of articles authored by a specific person.
 * It utilizes Swiper.js for a touch-friendly carousel experience and features a custom 
 * "fade-in" transition once the slider is fully initialized to prevent layout shifts.
 * * @param {AuthorData} author - The author whose articles should be displayed.
 */
export function AuthorArticlesList({ author }: { author: AuthorData }) {
    /**
     * State to store the collection of articles written by the author.
     * Fetched via author ID using the 'getArticleByAuthorID' utility.
     */
    const [articles] = useState(getArticleByAuthorID(author.id));

    return (
        <section className="max-lg:my-10 my-0">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10 max-lg:gap-4">
                    {/* Dynamic Section Heading */}
                    <h3 className='font-medium italic font-serif text-5xl max-lg:text-2xl text-gray-800 dark:text-gray-100'>
                        Articles written by {author.name || 'this author'}
                    </h3>

                    {/* Article Carousel Implementation */}
                    {articles && articles.length > 0 ? (
                        <Swiper
                            slidesPerView={1.5}
                            spaceBetween={30}
                            breakpoints={{
                                640: { slidesPerView: 2.5 },
                                1024: { slidesPerView: 3.5 },
                                1280: { slidesPerView: 4.5 },
                            }}
                            /* UX Optimization: The Swiper is hidden (opacity-0) until initialized. 
                               Tailwind [&.swiper-initialized] classes ensure a smooth entrance.
                            */
                            className="mySwiper w-full invisible opacity-0 max-h-160 transition-all duration-300 [&.swiper-initialized]:visible [&.swiper-initialized]:opacity-100 [&.swiper-initialized]:max-h-full"
                        >
                            {articles.map((article, index) => (
                                <SwiperSlide key={`${article.id}-${index}`} className='h-full'>
                                    <AuthorArticleItem article={article} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        /* Empty State: Shown if the author has no published articles */
                        <p className="text-gray-400 italic py-10">No articles found for this author.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
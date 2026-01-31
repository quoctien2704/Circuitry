"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useState } from 'react';
import { homeData } from "@/data/sitedata";
import { FaArrowRightLong } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { BlogHomeData } from "../../blog/blogHomeSlider";
import { getArticleAsCustomBlog } from "@/data/articles/articles";
import { SecondaryButton } from "../../button/secondaryButton";
import Link from "next/link"
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

/**
 * This component renders the main slider section for the home page.
 * It features a complex layout including a Swiper-based article carousel, 
 * promotional banners with call-to-action buttons, and dynamic image blocks.
 * * The layout is fully responsive, adjusting grid columns and flex directions 
 * for mobile (max-md), tablet (max-lg), and desktop (xl) views.
 */

export function HomeSlider() {

    /**
     * Initializes and manages the list of articles for the Swiper carousel.
     * It transforms raw slider data from 'homeData' into a custom blog format.
     */

    const [articles] = useState(getArticleAsCustomBlog(homeData.slider.bottom_left_sliders_data))
    return (
        <section className='my-40 max-md:my-20 max-md:mt-30'>
            <div className="container mx-auto px-4">
                <div className="
                        flex gap-10 items-end 
                        max-xl:flex-col-reverse max-xl:items-center max-xl:justify-center max-xl:gap-10
                    ">
                    <div className="
                        xl:w-[27%] xl:flex-col xl:max-w-90  
                        flex gap-10 w-full
                        max-xl:grid max-xl:grid-cols-2 max-xl:gap-10
                        max-md:grid-cols-1
                    ">
                        <div className="
                            relative p-8 flex flex-col gap-4 bg-blue-200 dark:bg-cyan-950 rounded-4xl md:aspect-square
                            max-xl:flex-1 
                            max-md:height-50
                        ">
                            <span className="font-medium text-base px-6 py-2 w-fit rounded-4xl flex gap-2 items-center justify-center bg-white dark:bg-[hsl(225,45%,5%)]">
                                <GoDotFill />
                                {homeData.slider.top_right_item_title || 'No title available'}
                            </span>
                            <h3 className="font-medium text-xl">
                                {homeData.slider.top_right_item_medium_title || 'No medium title available'}
                            </h3>
                            <h4 className="font-bold text-2xl">
                                {homeData.slider.top_right_item_big_title || 'No big title available'}
                            </h4>
                            <Link
                                href={homeData.slider.top_right_item_link_href || '/'}
                                className="mt-auto mr-auto border-b text-lg font-bold hover:text-primary"
                            >
                                <span>
                                    {homeData.slider.top_right_item_link_text || 'No text available'}
                                </span>
                            </Link>
                        </div>
                        <div className="
                            relative flex flex-col gap-4 overflow-hidden bg-gray-400 rounded-4xl aspect-square h-full items-center justify-center
                            max-xl:flex-1
                        ">
                            <Image
                                loading='eager'
                                className="w-full h-full"
                                src={homeData.slider.bottom_right_image.src || '/empty_image.webp'}
                                alt={homeData.slider.bottom_right_image.alt || 'No alt available'}
                                width={homeData.slider.bottom_right_image.width || 1000}
                                height={homeData.slider.bottom_right_image.height || 1000}

                            />
                            <Link
                                className="absolute left-[50%] translate-x-[-50%] bottom-8"
                                href={homeData.slider.bottom_right_button_href || "/"}
                            >
                                <SecondaryButton content={homeData.slider.bottom_right_button_content} />
                            </Link>
                        </div>
                    </div>
                    <div className="
                        w-[73%] flex flex-col gap-10
                        max-xl:w-full
                    ">
                        <div className="
                            flex gap-4 items-end justify-between
                            max-sm:flex-col max-sm:items-center max-sm:gap-2
                        ">
                            <h2 className="
                                text-6xl font-serif italic
                                max-lg:text-5xl
                                max-sm:text-center
                            ">
                                {homeData.slider.header || "No header text available"}
                            </h2>
                            <Link
                                className="
                                    flex gap-2 items-center text-gray-600 dark:text-gray-300 hover:text-primary
                                    max-md: text-sm
                                "
                                href={homeData.slider.sub_header_href || '/'}
                            >
                                <span className=''>
                                    {homeData.slider.sub_header || 'No sub header text available'}
                                </span>
                                <FaArrowRightLong />
                            </Link>
                        </div>
                        <div>
                            {articles && articles.length > 0 && (
                                <Swiper
                                    spaceBetween={30}
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={true}
                                    modules={[Autoplay]}
                                    className="mySwiper w-full h-full overflow-hidden rounded-4xl"
                                >
                                    {articles.map(article => (
                                        <SwiperSlide key={`${article.title} - ${article.id}`} className='mt-auto'>
                                            <BlogHomeData article={article} />
                                        </SwiperSlide>

                                    ))}
                                </Swiper>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}
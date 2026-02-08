"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useMemo, useState } from 'react';
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
import { useThemeData } from '@/theme/ThemeContext';

/**
 * HomeSlider Component
 * Renders a dynamic hero section with a Swiper carousel and promotional banners.
 * Integrated with ThemeContext for real-time content updates via the Editor.
 */
export function HomeSlider() {
    // Access global site data from the theme context
    const { siteData } = useThemeData();
    const slider = useMemo(() => siteData.home.layout_1.slider,[siteData.home.layout_1.slider]);

    /**
     * Map and validate slider data.
     * Using useMemo ensures this object is only recalculated when the slider data changes.
     * Provides fallback values to prevent "undefined" errors during rendering.
     */
    const data = useMemo(() => ({
        header: slider.home_layout_one_header_001.data || "No header text available",
        sub_header: slider.home_layout_one_sub_header_002.data || 'No sub header text available', 
        sub_header_href: slider.home_layout_one_sub_header_href_003.data || '/',
        bottom_left_sliders_article_data: slider.home_layout_one_bottom_left_sliders_article_data_004.data || [1,2,3,4],
        top_right_item_title: slider.home_layout_one_top_right_item_title_005.data || 'No title available',
        top_right_item_medium_title: slider.home_layout_one_top_right_item_medium_title_006.data || 'No medium title available',
        top_right_item_big_title: slider.home_layout_one_top_right_item_big_title_007.data || 'No big title available',
        top_right_item_link_text: slider.home_layout_one_top_right_item_link_text_008.data || 'No text available',
        top_right_item_link_href: slider.home_layout_one_top_right_item_link_href_009.data || '/',
        bottom_right_image: {
            src: slider.home_layout_one_bottom_right_image_010.src || 'empty_image.webp',
            alt: slider.home_layout_one_bottom_right_image_010.alt || "Alt not available",
            width: homeData.slider.home_layout_one_bottom_right_image_010.width || 600,
            height: homeData.slider.home_layout_one_bottom_right_image_010.height || 600
        },
        bottom_right_button_content: slider.home_layout_one_bottom_right_button_content_011.data || "No button content available",
        bottom_right_button_href: slider.home_layout_one_bottom_right_button_href_012.data || "/"
    }), [slider]);

    // Initialize articles based on the IDs provided in the data
    const articles = useMemo(() => (
        getArticleAsCustomBlog(data.bottom_left_sliders_article_data)
    ),[data.bottom_left_sliders_article_data])

    /**
     * Memoized UI structure.
     * This prevents the entire section from re-rendering unless the 'data' dependency changes,
     * which is crucial for maintaining performance in a complex layout.
     */
    const HomeSliderMemo = useMemo(() => {
        return (
            <section className='my-40 max-md:my-20 max-md:mt-30'>
                <div className="container mx-auto px-4">
                    <div className="flex gap-10 items-end max-xl:flex-col-reverse max-xl:items-center max-xl:justify-center max-xl:gap-6 max-md:gap-4">
                        
                        {/* Left Sidebar / Promotional Banners */}
                        <div className="xl:w-[27%] xl:flex-col xl:max-w-90 flex gap-10 w-full max-xl:grid max-xl:grid-cols-2 max-xl:gap-6 max-md:grid-cols-1 max-md:gap-4">
                            
                            {/* Top Promotion Card */}
                            <div className="relative p-8 flex flex-col gap-4 bg-blue-200 dark:bg-cyan-950 rounded-4xl md:aspect-square max-xl:flex-1 max-md:height-50">
                                <span id='home_layout_one_top_right_item_title_005' className="font-medium text-base p-4 w-fit rounded-xl flex gap-2 items-center justify-center bg-white dark:bg-[hsl(225,45%,5%)]">
                                    <GoDotFill />
                                    {data.top_right_item_title}
                                </span>
                                <h3 id='home_layout_one_top_right_item_medium_title_006' className="font-medium text-xl">
                                    {data.top_right_item_medium_title}
                                </h3>
                                <h4 id='home_layout_one_top_right_item_big_title_007' className="font-bold text-2xl">
                                    {data.top_right_item_big_title}
                                </h4>
                                <Link
                                    id='home_layout_one_top_right_item_link_href_009'
                                    href={data.top_right_item_link_href}
                                    className="mt-auto mr-auto border-b text-lg font-bold hover:text-primary"
                                >
                                    <span id='home_layout_one_top_right_item_link_text_008'>{data.top_right_item_link_text}</span>
                                </Link>
                            </div>

                            {/* Bottom Promotion Image Card */}
                            <div className="relative flex flex-col gap-4 overflow-hidden bg-gray-400 rounded-4xl aspect-square h-full items-center justify-center max-xl:flex-1">
                                <Image
                                    id='home_layout_one_bottom_right_image_010'
                                    loading='lazy'
                                    className="w-full h-full object-cover"
                                    src={data.bottom_right_image.src}
                                    alt={data.bottom_right_image.alt}
                                    width={data.bottom_right_image.width}
                                    height={data.bottom_right_image.height}
                                />
                                <Link
                                    id='home_layout_one_bottom_right_button_href_012'
                                    className="absolute left-[50%] translate-x-[-50%] bottom-8"
                                    href={data.bottom_right_button_href}
                                >
                                    <SecondaryButton id={'home_layout_one_bottom_right_button_content_011'} content={data.bottom_right_button_content} />
                                </Link>
                            </div>
                        </div>

                        {/* Right Content / Main Swiper Section */}
                        <div className="w-[73%] flex flex-col gap-10 max-xl:w-full">
                            
                            {/* Section Header with "View All" Link */}
                            <div className="flex gap-10 items-end justify-between max-sm:flex-col max-sm:items-center max-sm:gap-2 w-full">
                                <h2 
                                    id='home_layout_one_header_001' 
                                    className="text-6xl font-serif italic max-lg:text-5xl max-sm:text-center"
                                >
                                    {data.header}
                                </h2>
                                <Link
                                    id='home_layout_one_sub_header_href_003'
                                    className="flex gap-2 items-center text-foreground/60 hover:text-primary max-md:text-smm"
                                    href={data.sub_header_href}
                                >
                                    <span id='home_layout_one_sub_header_002'>{data.sub_header}</span>
                                    <FaArrowRightLong />
                                </Link>
                            </div>

                            {/* Swiper Article Slider */}
                            <div id='home_layout_one_bottom_left_sliders_article_data_004'>
                                {articles && articles.length > 0 && (
                                    <Swiper
                                        spaceBetween={30}
                                        centeredSlides={true}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{ clickable: true }}
                                        navigation={true}
                                        modules={[Autoplay]}
                                        className="mySwiper w-full h-full overflow-hidden rounded-4xl"
                                    >
                                        {articles.map(article => (
                                            <SwiperSlide key={`${article.title}-${article.id}`} className='mt-auto'>
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
        );
    }, [data, articles]);

    return HomeSliderMemo;
}
"use client"

import { getArticleByID } from "@/data/articles/articles";
import { homeLayoutTwoData } from "@/data/sitedata"
import { PrimaryButton } from "../../button/primaryButton";
import { useState } from "react"
import Image from 'next/image'
import Link from "next/link";

/**
 * Renders a complex banner grid with featured articles.
 * Optimized for ThemeForest:
 * - SEO: Semantic heading structure (h2 for main, h3 for secondary).
 * - A11y: Descriptive aria-labels and aria-hidden for decorative overlays.
 * - Performance: Aspect-ratio management to prevent layout shifts.
 */
export function HomeBannerTwo() {
    // Data with safe fallbacks
    const bannerData = homeLayoutTwoData?.banner || {};
    const [leftTopArticle] = useState(getArticleByID(bannerData.left_top_article_id) || {});
    const [leftBottomArticle] = useState(getArticleByID(bannerData.left_bottom_article_id) || {});
    const [rightArticle] = useState(getArticleByID(bannerData.left_right_article_id) || {});

    return (
        <section className="my-30 max-lg:my-15 bg-gray-100 dark:bg-black py-10" aria-label="Featured Promotions">
            <div className="flex gap-4 max-xl:gap-px max-xl:flex-col">

                {/* Left Column: Secondary Articles */}
                <div className="flex-2 flex flex-col gap-4 max-xl:gap-px">

                    {/* Top Left Item */}
                    <div className="flex-1 relative group overflow-hidden xl:rounded-r-xl">
                        <Link
                            href={`/article/${leftTopArticle.id}`}
                            className="block h-full w-full"
                            aria-label={`Read more about ${leftTopArticle.title}`}
                        >
                            <Image
                                className="object-cover aspect-3/2 w-full group-hover:scale-110 transition-all duration-500 max-lg:aspect-square max-xl:max-h-100"
                                src={leftTopArticle.image_src || '/placeholder.jpg'}
                                alt={leftTopArticle.title || 'Featured article'}
                                width={600}
                                height={400}
                            />
                            {/* Decorative Overlay */}
                            <div className="absolute inset-0 bg-black opacity-50 pointer-events-none" aria-hidden="true"></div>

                            <div className="absolute inset-0 p-8 flex flex-col justify-center gap-2 max-xl:items-center max-xl:gap-4 max-xl:p-4">
                                <span className="bg-white px-6 py-2 w-fit text-black font-bold text-lg xl:mt-auto rounded-2xl max-xl:px-4">
                                    {leftTopArticle.category}
                                </span>
                                <h3 className="text-white text-3xl font-bold max-xl:text-center max-sm:text-lg xl:mt-2">
                                    {leftTopArticle.title}
                                </h3>
                                <p className="text-white text-xl max-xl:text-center max-sm:text-base line-clamp-2">
                                    {leftTopArticle.content}
                                </p>
                                <div className="xl:mt-auto max-xl:mt-4">
                                    <PrimaryButton content="Booking Now" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Bottom Left Item - Refactored similarly */}
                    <div className="flex-1 relative group overflow-hidden xl:rounded-r-xl">
                        <Link
                            href={`/article/${leftBottomArticle.id}`}
                            className="block h-full w-full"
                            aria-label={`Read more about ${leftBottomArticle.title}`}
                        >
                            <Image
                                className="object-cover aspect-3/2 w-full group-hover:scale-110 transition-all duration-500 max-lg:aspect-square max-xl:max-h-100"
                                src={leftBottomArticle.image_src || '/placeholder.jpg'}
                                alt={leftBottomArticle.title || 'Featured article'}
                                width={600}
                                height={400}
                            />
                            <div className="absolute inset-0 bg-black opacity-50 pointer-events-none" aria-hidden="true"></div>
                            <div className="absolute inset-0 p-8 flex flex-col justify-center gap-4 max-xl:items-center max-xl:p-4">
                                <span className="bg-white px-6 py-2 w-fit text-black font-bold text-lg xl:mt-auto rounded-2xl">
                                    {leftBottomArticle.category}
                                </span>
                                <h3 className="text-white text-3xl font-bold max-xl:text-center max-sm:text-lg xl:mt-2">
                                    {leftBottomArticle.title}
                                </h3>
                                <p className="text-white text-xl max-xl:text-center max-sm:text-base line-clamp-2">
                                    {leftBottomArticle.content}
                                </p>
                                <div className="xl:mt-auto max-xl:mt-4">
                                    <PrimaryButton content="Booking Now" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Main Highlight */}
                <div className="flex-3 min-h-full relative group overflow-hidden xl:rounded-l-xl">
                    <Link
                        href={`/article/${rightArticle.id}`}
                        className="block h-full w-full"
                        aria-label={`Main feature: ${rightArticle.title}`}
                    >
                        <Image
                            className="object-cover h-full w-full group-hover:scale-110 transition-all duration-500 max-lg:aspect-square max-xl:max-h-100"
                            src={rightArticle.image_src || '/placeholder.jpg'}
                            alt={rightArticle.title || 'Main banner'}
                            width={600}
                            height={400}
                        />
                        <div className="absolute inset-0 bg-black opacity-40 pointer-events-none" aria-hidden="true"></div>
                        <div className="absolute inset-0 p-8 max-xl:p-4 flex flex-col items-center justify-center gap-4">
                            <h2 className="text-white text-5xl max-xl:text-3xl font-bold text-center">
                                {rightArticle.title}
                            </h2>
                        </div>
                    </Link>
                </div>

            </div>
        </section>
    );
}
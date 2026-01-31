"use client"

import { getAuthorByID } from "@/data/authors/authors";
import { ArticleData } from "@/types/item";
import { getReadingTime } from "@/utils/helper";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import Image from 'next/image'
import Link from 'next/link'

/**
 * Renders an individual slide for the main Hero Slider.
 * Optimized for ThemeForest:
 * - SEO: Semantic h2 for slider titles (Hero level).
 * - A11y: Improved contrast with gradient overlays and aria-labels.
 * - Performance: High-priority image loading for LCP optimization.
 */

export function HomeSliderItemTwo({ article }: { article: ArticleData }) {
    // Safely fetch author and metadata
    const [author] = useState(getAuthorByID(article.author_id));
    const readingMinutes = getReadingTime(article.content);

    return (
        <div className="relative w-full overflow-hidden bg-gray-900">
            {/* Background Image - Optimized with priority/eager for LCP */}
            <div className="relative w-full">
                <Image
                    loading="eager"
                    priority={true}
                    className="aspect-7/3 object-cover max-lg:aspect-square min-h-75 w-full"
                    src={article.image_src || '/placeholder-hero.jpg'}
                    alt={article.title}
                    width={1920}
                    height={1280}
                />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end pb-16 max-lg:justify-center max-lg:pb-0">
                <div className="container mx-auto px-4">
                    <div className="flex gap-10 items-end max-lg:flex-col max-lg:items-center max-lg:gap-6">

                        {/* Article Info Section */}
                        <div className="flex-6 flex flex-col gap-6 max-lg:items-center max-lg:text-center max-lg:gap-4">
                            {/* Category Badge - Better contrast & hover */}
                            <Link
                                href={`/category/${article.category}`}
                                className="inline-block px-8 py-3 w-fit bg-primary/80 backdrop-blur-md text-white text-lg font-bold rounded-full transition-all duration-300 hover:-translate-y-1 hover:bg-primary max-lg:text-sm max-lg:px-6"
                            >
                                {article.category}
                            </Link>

                            {/* Semantic H2 for Hero Slider Titles */}
                            <Link href={`/article/${article.id}`} className="hover:text-primary transition-colors">
                                <h2 className="text-white text-6xl font-bold leading-tight max-lg:text-3xl line-clamp-2">
                                    {article.title}
                                </h2>
                            </Link>

                            <p className="text-gray-200 text-xl max-lg:text-base line-clamp-2 max-w-2xl">
                                {article.content}
                            </p>
                        </div>

                        {/* Author & Meta Section */}
                        {author && (
                            <div className="flex-4 flex flex-col gap-4 items-end max-lg:items-center">
                                <Link
                                    href={`/author/${author.id}`}
                                    className="flex gap-4 items-center group transition-all duration-300"
                                    aria-label={`View articles by ${author.name}`}
                                >
                                    <div className="shrink-0">
                                        <Image
                                            className="rounded-full aspect-square border-2 border-white/20 group-hover:border-primary transition-colors"
                                            src={author.avatar || '/empty_author.webp'}
                                            alt={author.name}
                                            width={56}
                                            height={56}
                                        />
                                    </div>
                                    <div className="flex flex-col items-start max-lg:items-center">
                                        <span className="text-gray-100 text-xs uppercase tracking-widest">Written by</span>
                                        <strong className="text-lg text-white group-hover:text-primary transition-colors">{author.name}</strong>
                                    </div>
                                </Link>

                                <div className="flex gap-3 font-medium items-center text-gray-300 text-sm">
                                    <time dateTime={article.published_at}>{article.published_at}</time>
                                    <GoDotFill className="text-primary" size={10} aria-hidden="true" />
                                    <span>{readingMinutes} mins read</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Dark Gradient Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-80 z-5 pointer-events-none" aria-hidden="true"></div>
        </div>
    );
}
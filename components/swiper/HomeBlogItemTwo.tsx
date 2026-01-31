"use client"

import { getAuthorByID } from "@/data/authors/authors";
import { ArticleData } from "@/types/item";
import { getReadingTime } from "@/utils/helper";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import Image from 'next/image'
import Link from "next/link";

/**
 * Renders an individual blog post item for the Layout Two feed.
 * Features:
 * - SEO: Semantic h3 title and descriptive aria-labels for links.
 * - UX: Author profile integration and reading time metadata.
 * - Performance: Image optimization with eager loading for primary viewports.
 */
export function HomeBlogItemTwo({ article }: { article: ArticleData }) {
    // Data fetching with safety checks
    const [author] = useState(getAuthorByID(article.author_id));
    const readingTime = getReadingTime(article.content);

    return (
        <div className="flex flex-col gap-4 max-lg:gap-2 h-full">
            {/* Thumbnail Container */}
            <div className="relative group overflow-hidden rounded-lg">
                <Link
                    href={`/article/${article.id}`}
                    aria-label={`Read more about ${article.title}`}
                >
                    <Image
                        loading="eager"
                        className="aspect-4/5 max-lg:aspect-square object-cover group-hover:scale-110 transition-all duration-500"
                        src={article.image_src || '/placeholder-blog.jpg'}
                        alt={article.title}
                        width={600}
                        height={400}
                    />
                </Link>

                {/* Category Badge - Ensure parent is 'relative' (Fixed typo 'relaitve') */}
                <Link
                    href={`/category/${article.category}`}
                    className="absolute left-4 top-4 bg-gray-900/80 backdrop-blur-sm text-white hover:bg-primary hover:text-white px-6 py-2 rounded-xl font-bold transition-all duration-300 max-lg:px-4 max-lg:py-2 max-lg:text-xs max-lg:left-3 max-lg:top-3 z-10"
                >
                    {article.category}
                </Link>
            </div>

            {/* Content Details */}
            <div className="flex flex-col gap-4 max-lg:gap-2 flex-1">
                <div className="flex flex-col gap-2">
                    {/* Metadata */}
                    <div className="flex gap-2 items-center text-sm text-gray-600 dark:text-gray-300 font-medium">
                        <time dateTime={article.published_at}>{article.published_at}</time>
                        <GoDotFill size={10} className="opacity-50" aria-hidden="true" />
                        <span>{readingTime} mins read</span>
                    </div>

                    {/* Title & Excerpt */}
                    <Link href={`/article/${article.id}`} className="hover:text-primary transition-colors">
                        <h3 className="text-xl font-bold max-lg:text-base line-clamp-2 leading-tight uppercase tracking-tight">
                            {article.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 max-sm:text-sm line-clamp-2 text-balance">
                        {article.content}
                    </p>
                </div>

                {/* Author Section */}
                {author && (
                    <Link
                        href={`/author/${article.author_id}`}
                        className="flex gap-3 max-lg:gap-2 items-center justify-start group mt-auto pt-2"
                        aria-label={`View profile of ${author.name}`}
                    >
                        <div className="shrink-0">
                            <Image
                                className="border border-gray-200 dark:border-gray-700 shadow-sm aspect-square rounded-full group-hover:ring-2 group-hover:ring-primary transition-all duration-300 max-lg:w-10"
                                src={author.avatar || '/empty_author.webp'}
                                alt={author.name}
                                width={40}
                                height={40}
                            />
                        </div>
                        <span className="font-bold text-sm group-hover:text-primary transition-colors">
                            By {author.name}
                        </span>
                    </Link>
                )}
            </div>
        </div>
    );
}
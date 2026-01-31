import { ArticleData } from "@/types/item";
import Image from 'next/image'
import Link from "next/link";
import { PrimaryButton } from "../button/primaryButton";
import { GoDotFill } from "react-icons/go";

/**
 * This component renders a trending article card with an interactive hover effect.
 * It features a vertical layout with a hidden tag list that slides into view 
 * and a primary action button linked to the article's category.
 * * @param {ArticleData} article - The data object containing images, tags, and category info.
 */
export function ArticleTrend({ article }: { article: ArticleData }) {

    /**
     * Renders an article card with dynamic interaction layers.
     * Features:
     * - Image Layer: Includes a zoom effect and an overlay that darkens on hover.
     * - Sliding Tags: A list of tags that slides from '-left-full' to 'left-4' on hover.
     * - Category CTA: Uses a PrimaryButton to navigate to the specific category page.
     * - Fallback Logic: All text fields include "No ... available" handlers for data safety.
     */
    return (
        <article className="relative group overflow-hidden min-h-120">
            <div className="flex flex-col gap-4 h-full">
                {/* Thumbnail and Hover Overlay */}
                <Link
                    aria-label={`Click this to go to ${article.title || 'this'} page`}
                    href={`article/${article.id || 0}`}
                >
                    <div className="group overflow-hidden rounded-xl relative">
                        <Image
                            className="w-full h-full object-cover aspect-5/6 group-hover:scale-110 transition-transform duration-300"
                            src={article.image_src || '/empty_image.webp'}
                            alt={article.title || 'No title available'}
                            width={300}
                            height={500}
                        />
                        <div className="absolute left-0 top-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </div>
                </Link>

                {/* Content Details Layer */}
                <div className="flex gap-2 flex-col items-start px-2 h-full">
                    {/* Meta Row: Author and Date */}
                    <div className="flex items-center gap-x-4 justify-between w-full flex-wrap">
                        <Link
                            aria-label={`Click this to go to ${article.title || 'this'} page`}
                            className="text-gray-600 dark:text-white hover:text-primary font-medium max-md:text-sm"
                            href={`/article/${article.author_id || 0}`}
                        >
                            <span>{article.author || 'No author available'}</span>
                        </Link>
                        <span className="font-medium max-md:text-sm text-gray-600 dark:text-white">
                            {article.published_at || 'No date available'}
                        </span>
                    </div>

                    {/* Trending Title */}
                    <p className="text-gray-600 dark:text-white xl:text-xl italic sm:text-base max-sm:text-sm">
                        {article.title || 'No title available'}
                    </p>

                    {/* Category CTA Button */}
                    <Link aria-label={`Click this link to go to ${article.category || 'this category'} page`} href={`/category/${(article.category || 'general').toLowerCase()}`} className="mt-2">
                        <PrimaryButton content={article.category || 'No category available'} />
                    </Link>
                </div>
            </div>

            {/* Floating Tags: Slides in from the left on hover */}
            {article.tags && article.tags.length > 0 && (
                <ul className="
                    flex flex-col gap-2 flex-wrap ml-auto absolute group-hover:left-4 transition-all duration-300 -left-full top-4
                    max-sm:left-4
                ">
                    {article.tags.map((tag, index) => (
                        <li
                            key={`${tag}-${index}`}
                            className="text-base font-medium border w-fit border-white rounded-xl overflow-hidden shadow-sm"
                        >
                            <Link
                                aria-label={`Click this to go to page where can you find all ${article.tags || 'this'} page`}
                                className="flex items-center justify-start gap-2 text-white hover:bg-white hover:text-black px-2 py-1 transition-all duration-300"
                                href={`/blog?tags=${tag || ''}`}>
                                <GoDotFill />
                                <span>{tag || 'No tag'}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
}
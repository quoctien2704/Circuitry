import { ArticleData } from "@/types/item";
import { GoDotFill } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";
import Image from 'next/image'
import Link from "next/link";

/**
 * This component renders a single article card designed for display within a slider or grid.
 * It uses an absolute positioning strategy to overlay metadata (date, category, title) 
 * and navigation elements directly on top of a full-width featured image.
 * * @param {ArticleData} article - The structured data object containing image, title, category, and date.
 */

export function BlogHomeData({ article }: { article: ArticleData }) {

    /**
     * Renders a visually rich article preview.
     * Features:
     * - Top-left: Sticky badges for date and category.
     * - Top-right: Floating title card with a distinctive "rounded-corner" overlap effect.
     * - Bottom-right: Interactive action button with hover animations for navigation.
     * - Responsive: Title card shifts from top-right to bottom-left on smaller screens (max-md).
     */

    return (
        <div className="relative overflow-hidden h-full rounded-4xl">
            <div className="h-full flex items-center justify-center">
                <Image
                    className="bg-gray-400 w-full h-full min-h-100"
                    src={article.image_src ?? '/empty_image.webp'}
                    loading="eager"
                    alt={article.title || 'No alt available'}
                    width={2000}
                    height={1600}
                />
            </div>
            <div className="absolute left-0 top-0 w-full h-full bg-black opacity-30"></div>
            <ul className="absolute left-8 top-8 flex flex-col gap-3">
                <li className="bg-white text-black px-4 py-2 rounded-lg w-fit font-medium shadow-lg"><span>{article.published_at || 'No published data available'}</span></li>
                <li className="text-white border-2 border-white rounded-lg px-4 py-2 shadow-lg flex gap-2 items-center justify-center"><GoDotFill /><span>{article.category || 'No category available'}</span></li>
            </ul>

            <div className="
                absolute right-16 top-8 max-w-80 flex flex-col items-start shadow-lg
                max-md:left-8 max-md:bottom-8 max-md:top-auto max-sm:w-[calc(100%-64px)]
            ">
                <span
                    className="
                    bg-white px-4 py-1 font-medium rounded-t-xl flex gap-2 items-center justify-center
                    max-md:text-sm text-black
                ">
                    <GoDotFill size={12} />
                    {article.category || 'No category available'}
                </span>
                <p className="
                    text-2xl font-medium bg-white text-black p-4 rounded-bl-xl rounded-r-xl
                    max-md:text-lg
                ">
                    {article.title || 'No title available'}
                </p>
            </div>

            <Link
                aria-label="You can click this arrow to go to this article page to read more"
                href={`/article/${article.id || 1}`}
                className="
                    hover:-translate-y-2 hover:scale-110 transition-all duration-300 absolute right-8 bottom-8 p-2 bg-white text-black rounded-full flex items-center justify-center shadow-lg
                    max-sm:bottom-auto max-sm:top-8
                ">
                <GoArrowUpRight size={24} />
            </Link>
        </div>
    )
}
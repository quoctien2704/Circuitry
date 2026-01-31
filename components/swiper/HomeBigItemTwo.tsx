import { ArticleData } from "@/types/item";
import { getReadingTime } from "@/utils/helper";
import { GoDotFill } from "react-icons/go";
import Image from 'next/image'
import Link from "next/link";

/**
 * Renders a large featured article item with an image background and overlay text.
 * Optimized for ThemeForest:
 * - SEO: Uses h3 for titles to maintain proper document heading structure.
 * - HTML: Fixed nested link issues for valid W3C validation.
 * - A11y: Improved contrast and descriptive labels for screen readers.
 */
export function HomeBigItemTwo({ article }: { article: ArticleData }) {
    const readingTime = getReadingTime(article.content);

    return (
        <div className="relative overflow-hidden rounded-xl group bg-gray-900">
            {/* Primary Article Link - Covers image and Title area */}
            <Link
                href={`/article/${article.id}`}
                className="block relative z-1"
                aria-label={`Read more about ${article.title}`}
            >
                <div className="overflow-hidden">
                    <Image
                        className="aspect-square w-full object-cover group-hover:scale-110 transition-transform duration-500 max-xl:max-h-100"
                        src={article.image_src || '/placeholder.jpg'}
                        alt={article.title}
                        width={512}
                        height={512}
                    />
                </div>
                {/* Visual Overlay - Pointer events none allows clicking the link underneath */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 z-1 pointer-events-none"></div>
            </Link>

            {/* Content Overlay */}
            <div className="absolute bottom-8 left-8 pr-8 z-2 pointer-events-none max-xl:bottom-4 max-xl:left-4 max-xl:pr-4">
                <div className="flex flex-col gap-4 max-lg:gap-2">

                    {/* Metadata Row - Using pointer-auto to make category clickable independently */}
                    <div className="flex gap-2 items-center font-medium text-white text-xl max-md:text-base max-sm:text-sm pointer-events-auto">
                        <Link
                            href={`/category/${article.category}`}
                            className="hover:text-primary transition-colors relative z-3"
                        >
                            {article.category}
                        </Link>
                        <GoDotFill size={12} className="text-white/60" aria-hidden="true" />
                        <span className="text-white/90">{readingTime} mins read</span>
                    </div>

                    {/* Article Title - Semantic h3 for better SEO hierarchy */}
                    <h3 className="text-white font-medium font-serif text-4xl max-md:text-2xl max-sm:text-base line-clamp-3 leading-tight">
                        {article.title}
                    </h3>
                </div>
            </div>
        </div>
    );
}
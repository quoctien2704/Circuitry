import { ArticleData } from "@/types/item";
import { getReadingTime } from "@/utils/helper";
import { GoDotFill } from "react-icons/go";
import Image from 'next/image'
import Link from "next/link";

/**
 * Renders a secondary article item for the Latest News list.
 * Optimized for ThemeForest:
 * - SEO: Semantic h4 heading and <time> tag for dates.
 * - Accessibility: aria-labels for descriptive linking.
 * - Performance: Responsive image handling with object-fit.
 */

export function HomeLatestItemTwo({ article }: { article: ArticleData }) {
    const readingTime = getReadingTime(article.content);

    return (
        <article className="flex border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden max-md:flex-col h-full transition-colors hover:border-primary/50 bg-white dark:bg-transparent">
            {/* Thumbnail Link */}
            <Link
                href={`/article/${article.id}`}
                className="overflow-hidden shrink-0"
                aria-label={`Read more: ${article.title}`}
            >
                <Image
                    className="aspect-square object-cover hover:scale-110 transition-transform duration-500 max-md:w-full"
                    src={article.image_src || '/placeholder.jpg'}
                    alt={article.title}
                    width={256}
                    height={256}
                />
            </Link>

            {/* Article Details */}
            <div className="flex-1 flex flex-col gap-4 p-4 min-w-0">
                {/* Category Badge */}
                <Link
                    href={`/category/${article.category}`}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white w-fit px-6 py-1.5 rounded-xl font-bold text-sm transition-colors"
                >
                    {article.category}
                </Link>

                {/* Article Title - Using h4 for list items to respect SEO tree */}
                <Link href={`/article/${article.id}`} className="hover:text-primary transition-colors">
                    <h4 className="text-2xl font-medium font-serif max-lg:text-xl line-clamp-1 leading-tight">
                        {article.title}
                    </h4>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm leading-relaxed">
                    {article.content}
                </p>

                {/* Metadata */}
                <div className="flex gap-2 items-center text-xs text-gray-500 dark:text-gray-400 font-medium mt-auto pt-2">
                    <time dateTime={article.published_at}>{article.published_at}</time>
                    <GoDotFill size={10} className="opacity-40" aria-hidden="true" />
                    <span>{readingTime} min read</span>
                </div>
            </div>
        </article>
    );
}
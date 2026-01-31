import { ArticleData } from "@/types/item";
import { getReadingTime } from "@/utils/helper";
import { GoDotFill } from "react-icons/go";
import Image from 'next/image'
import Link from "next/link";

/**
 * Renders the primary featured article for the Latest section.
 * Optimized for ThemeForest:
 * - SEO: Semantic heading (h3) and <time> tag for publication dates.
 * - Accessibility: aria-labels for descriptive linking.
 * - Performance: Aspect-ratio and object-fit for visual stability.
 */
export function HomeLatestBigItemTwo({ article }: { article: ArticleData }) {
    const readingTime = getReadingTime(article.content);

    return (
        <article className="border border-gray-200 dark:border-gray-800 flex flex-col h-full rounded-xl overflow-hidden bg-white dark:bg-transparent transition-shadow hover:shadow-lg">
            {/* Image Link */}
            <Link
                href={`/article/${article.id}`}
                className="overflow-hidden block aspect-square xl:h-132"
                aria-label={`Read more about ${article.title}`}
            >
                <Image
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    src={article.image_src || '/placeholder.jpg'}
                    alt={article.title}
                    width={512}
                    height={512}
                />
            </Link>

            {/* Content Details */}
            <div className="flex-1 flex flex-col gap-4 p-6">
                {/* Category Badge */}
                <Link
                    href={`/category/${article.category}`}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white w-fit px-6 py-2 rounded-xl font-bold transition-colors text-sm"
                >
                    {article.category}
                </Link>

                {/* Article Title - Semantic h3 for proper hierarchy */}
                <Link href={`/article/${article.id}`} className="hover:text-primary transition-colors">
                    <h3 className="text-4xl font-medium font-serif max-lg:text-2xl line-clamp-2 leading-tight">
                        {article.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                    {article.content}
                </p>

                {/* Metadata Footer */}
                <div className="flex gap-2 items-center text-sm text-gray-500 dark:text-gray-400 font-medium mt-auto pt-4 border-t border-gray-100 dark:border-gray-900">
                    <time dateTime={article.published_at}>{article.published_at}</time>
                    <GoDotFill size={10} className="opacity-50" aria-hidden="true" />
                    <span>{readingTime} min read</span>
                </div>
            </div>
        </article>
    );
}
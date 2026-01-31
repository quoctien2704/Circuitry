import { ArticleData } from "@/types/item";
import Image from 'next/image'
import Link from "next/link";

/**
 * Renders an individual article item within the search results list.
 * Optimized for ThemeForest:
 * - SEO: Semantic heading levels (h4) to maintain page structure.
 * - Accessibility: aria-labels for descriptive linking.
 * - UX: Aspect-ratio management and hover transitions.
 */

export function SearchArticleItem({ article }: { article: ArticleData }) {
    return (
        <div className="flex gap-4 w-full group py-2">
            {/* Thumbnail Link */}
            <Link
                href={`/article/${article.id}`}
                className="shrink-0"
                aria-label={`Read article: ${article.title}`}
            >
                <div className="flex items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                    <Image
                        className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                        src={article.image_src || '/placeholder.jpg'}
                        alt={article.title}
                        width={80} // Smaller size for search dropdown
                        height={80}
                    />
                </div>
            </Link>

            {/* Content Section */}
            <div className="flex-1 flex flex-col gap-1 min-w-0">
                <div className="flex justify-between items-center gap-4 text-xs">
                    <Link
                        href={`/author/${article.author_id}`}
                        className="font-bold hover:text-primary transition-colors truncate"
                    >
                        {article.author}
                    </Link>
                    <span className="shrink-0 font-medium text-gray-500 dark:text-gray-400">
                        {article.published_at}
                    </span>
                </div>

                {/* Heading level h4 is safer for items in a list */}
                <Link href={`/article/${article.id}`} className="hover:text-primary transition-colors">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug">
                        {article.title}
                    </h4>
                </Link>
            </div>
        </div>
    );
}
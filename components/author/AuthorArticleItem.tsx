import { ArticleData } from "@/types/item";
import Link from "next/link";
import Image from 'next/image'
/**
 * This component renders a compact article preview specifically for author profile pages.
 * It features a square aspect-ratio thumbnail with a hover-zoom effect and displays 
 * core metadata like category and publication date.
 * * @param {ArticleData} article - The article data object containing titles, images, and metadata.
 */
export function AuthorArticleItem({ article }: { article: ArticleData }) {
    return (
        <div className="flex flex-col gap-4">
            {/* Post Thumbnail with Interactive Hover Effect */}
            <Link
                href={`/article/${article.id || ''}`}
                className="group"
                aria-label={`Read full article: ${article.title || 'View Post'}`}
            >
                <div className="overflow-hidden rounded-xl">
                    <Image
                        loading="eager"
                        className="aspect-square object-cover group-hover:scale-110 transition-transform duration-300"
                        src={article.image_src || '/empty_image.webp'}
                        alt={article.title || 'Article thumbnail'}
                        width={512}
                        height={512}
                    />
                </div>
            </Link>

            {/* Post Metadata and Title Section */}
            <div className="flex flex-col gap-2">
                {/* Category and Publication Date Row */}
                <div className="flex justify-between flex-wrap gap-2 text-sm">
                    <Link
                        href={`/category/${(article.category || 'general').toLowerCase()}`}
                        aria-label={`View more articles in ${article.category || 'this category'}`}
                    >
                        <span className="font-medium hover:text-primary transition-colors">
                            {article.category || 'General'}
                        </span>
                    </Link>
                    <strong className="text-gray-600 dark:text-gray-300 font-normal">
                        {article.published_at || 'No date available'}
                    </strong>
                </div>

                {/* Article Title: Serif style for consistency with Circuitry brand */}
                <h3 className="text-lg font-medium font-serif text-gray-700 dark:text-gray-300 line-clamp-2">
                    {article.title || 'No title available'}
                </h3>
            </div>
        </div>
    )
}
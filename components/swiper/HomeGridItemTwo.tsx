import { ArticleData } from "@/types/item";
import { getReadingTime } from "@/utils/helper";
import { GoDotFill } from "react-icons/go";
import Image from 'next/image'
import Link from "next/link";

/**
 * Renders a secondary grid article item for the Featured Column.
 * Optimized for ThemeForest:
 * - Semantic: Uses h4 for titles to respect heading hierarchy.
 * - Validation: Fixes nested anchor tag issues using pointer-events.
 * - A11y: Provides descriptive aria-labels for background links.
 */
export function HomeGridItemTwo({ article }: { article: ArticleData }) {
    const readingTime = getReadingTime(article.content);

    return (
        <div className="relative overflow-hidden rounded-xl group bg-gray-900 aspect-square">
            {/* Main Link Wrapper - Covers the image area */}
            <Link
                href={`/article/${article.id}`}
                className="block h-full w-full relative z-1"
                aria-label={`Read article: ${article.title}`}
            >
                <div className="h-full w-full overflow-hidden">
                    <Image
                        className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500"
                        src={article.image_src || '/placeholder.jpg'}
                        alt={article.title}
                        width={400} // Optimized size for grid items
                        height={400}
                    />
                </div>
                {/* Visual Overlay */}
                <div
                    className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-60 z-1 pointer-events-none"
                    aria-hidden="true"
                ></div>
            </Link>

            {/* Floating Content Area */}
            <div className="absolute bottom-6 left-6 right-6 z-2 pointer-events-none max-xl:bottom-4 max-xl:left-4 max-xl:right-4">
                <div className="flex flex-col gap-3 max-xl:gap-1">

                    {/* Category & Metadata - Re-enabling pointer events for sub-link */}
                    <div className="flex gap-2 items-center font-medium text-white text-sm pointer-events-auto">
                        <Link
                            href={`/category/${article.category}`}
                            className="hover:text-primary transition-colors relative z-3"
                        >
                            {article.category}
                        </Link>
                        <GoDotFill size={10} className="text-white/50" aria-hidden="true" />
                        <span className="text-white/80">{readingTime} mins read</span>
                    </div>

                    {/* Semantic Title - Using h4 for grid-level articles */}
                    <Link href={`/article/${article.id}`} className="pointer-events-auto">
                        <h4 className="text-white font-medium font-serif text-lg max-lg:text-base line-clamp-2 leading-tight hover:text-primary transition-colors">
                            {article.title}
                        </h4>
                    </Link>
                </div>
            </div>
        </div>
    );
}
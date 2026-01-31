import { ArticleData } from "@/types/item";
import { GoDotFill } from "react-icons/go";
import Image from 'next/image'
import Link from "next/link";

/**
 * This component displays a prominent preview of the latest blog post.
 * It features a split-layout (image and content) on desktop that stacks 
 * vertically on tablets and mobile devices.
 * * ThemeForest Standard: Using semantic tags like <article> and ensuring 
 * contrast with dark mode classes.
 */
export function MainLatestBlog({ article }: { article: ArticleData }) {
    return (
        <article className="
            flex gap-10
            max-xl:flex-col max-xl:gap-4
        ">
            {/* Featured Image Link with Zoom Effect */}
            <Link
                href={`/article/${article.id || ''}`}
                className="flex-1 group overflow-hidden rounded-lg"
                aria-label={`Read more about ${article.title || 'this article'}`}
            >
                <Image
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    src={article.image_src || '/empty_image.webp'}
                    alt={article.title || 'Blog post featured image'}
                    width={600}
                    height={600}
                    loading="lazy"
                />
            </Link>

            {/* Post Content Metadata and Summary */}
            <div className="flex-1 flex flex-col justify-around">
                {/* Category Indicator */}
                <span className="flex font-medium gap-2 items-center text-gray-600 dark:text-gray-300 uppercase text-sm tracking-wide">
                    <GoDotFill className="text-[10px]" aria-hidden="true" />
                    {article.category || 'Uncategorized'}
                </span>

                <div className="
                    flex flex-col gap-4
                    max-lg:gap-2 max-lg:mt-4
                    max-sm:gap-1
                ">
                    {/* Post Title */}
                    <h3 className="
                        text-3xl font-medium line-clamp-2 italic font-serif text-gray-900 dark:text-gray-100
                        max-lg:text-xl
                    ">
                        {article.title || 'Untitled Post'}
                    </h3>

                    {/* Excerpt/Summary */}
                    <p className="
                        text-2xl font-medium line-clamp-3 italic text-gray-600 dark:text-gray-400
                        max-lg:text-lg max-md:text-base
                    ">
                        {article.content || 'No summary available for this post.'}
                    </p>
                </div>

                {/* Author and Date Meta Info */}
                <footer className="
                    flex gap-1 items-center text-gray-600 dark:text-gray-300
                    max-lg:mt-8 max-lg:text-sm
                ">
                    <Link
                        className="hover:text-primary transition-colors font-bold"
                        href={`/author/${article.author_id || ''}`}
                        aria-label={`View all posts by ${article.author}`}
                    >
                        {article.author || 'Staff'}
                    </Link>
                    <GoDotFill className="text-[8px] mx-1" aria-hidden="true" />
                    <time dateTime={article.published_at}>
                        {article.published_at || 'Recently'}
                    </time>
                </footer>
            </div>
        </article >
    )
}

/**
 * A secondary variant of the latest blog item.
 * This component is designed to complement the 'MainLatestBlog' by offering a 
 * slightly different hierarchy, focusing more on metadata and content snippets.
 * * ThemeForest Standard: Efficient use of semantic tags and optimized for mobile 
 * responsiveness with stackable flex containers.
 */
export function ExtraMainLatestBlog({ article }: { article: ArticleData }) {
    return (
        <article className="
            flex-1 flex gap-10
            max-xl:flex-col max-xl:gap-4
        ">
            {/* Thumbnail Section */}
            <Link
                href={`/article/${article.id || ''}`}
                className="flex-1 group overflow-hidden rounded-lg block"
                aria-label={`Read the full article: ${article.title || 'View Post'}`}
            >
                <div className="overflow-hidden h-full">
                    <Image
                        className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-300"
                        src={article.image_src || '/empty_image.webp'}
                        alt={article.title || 'Blog post thumbnail'}
                        width={600}
                        height={600}
                    />
                </div>
            </Link>

            {/* Information Section */}
            <div className="flex-1 flex flex-col justify-around">
                {/* Secondary Content Preview (Top) */}
                <p className="text-base font-medium text-gray-500 dark:text-gray-400 line-clamp-2 italic">
                    {article.content || 'Click to read this featured story...'}
                </p>

                {/* Category Badge */}
                <span className="flex font-bold gap-2 text-xs uppercase tracking-widest items-center text-primary mt-2">
                    <GoDotFill className="text-[10px]" aria-hidden="true" />
                    {article.category || 'General'}
                </span>

                <div className="flex flex-col gap-2 mt-4">
                    {/* Main Post Title */}
                    <h3 className="
                        text-xl font-bold font-serif line-clamp-2 text-gray-900 dark:text-gray-100
                        max-lg:text-lg
                    ">
                        {article.title || 'Untitled Post'}
                    </h3>

                    {/* Main Content Excerpt */}
                    <p className="text-base font-medium text-gray-600 dark:text-gray-300 line-clamp-2">
                        {article.content || 'No description provided.'}
                    </p>
                </div>

                {/* Post Footer Metadata */}
                <footer className="
                    flex gap-1 items-center text-sm text-gray-500 dark:text-gray-400
                    max-lg:mt-8
                ">
                    <Link
                        className="hover:text-primary transition-colors font-bold text-nowrap"
                        href={`/author/${article.author_id || ''}`}
                        aria-label={`Articles by ${article.author}`}
                    >
                        {article.author || 'Author'}
                    </Link>
                    <GoDotFill className="text-[8px] mx-1" aria-hidden="true" />
                    <time className="text-nowrap" dateTime={article.published_at}>
                        {article.published_at || 'Recent'}
                    </time>
                </footer>
            </div>
        </article >
    )
}
import { ArticleData } from "@/types/item";
import Image from 'next/image'
import { PrimaryButton } from "../button/primaryButton";
import Link from "next/link";
import { getAuthorByID } from "@/data/authors/authors";

/**
 * This component renders a standard article card used in grid and list views.
 * It provides a balanced layout featuring a zoom-effect thumbnail, author metadata, 
 * title, summary, and a call-to-action button.
 * * @param {ArticleData} article - The detailed data object for the article, including author info and media.
 */
export function ArticleItem({ article }: { article: ArticleData }) {

    /**
     * Renders a vertically stacked article preview.
     * Features:
     * - Image Interaction: Uses 'group-hover:scale-110' for a smooth zoom effect on the thumbnail.
     * - Meta Row: Displays author (linkable) and publication date in an italicized, space-between layout.
     * - Typography: Adapts font sizes for titles and content across mobile and desktop breakpoints.
     * - CTA: Integrates the PrimaryButton for a consistent navigation experience to the full article.
     */
    return (
        <article>
            <div className="flex flex-col gap-4">
                {/* Thumbnail Container with Hover Effect */}
                <div className="overflow-hidden rounded-xl group">
                    <Link href={`/article/${article.id}`}>
                        <Image
                            className="aspect-3/2 object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                            src={article.image_src || "/empty_image.webp"}
                            alt={article.title}
                            width={1200}
                            height={1200}
                        />
                    </Link>
                </div>

                {/* Article Metadata and Content */}
                <div className="flex flex-col gap-2">
                    {/* Author and Date Row */}
                    <div className="
                        flex items-center justify-between font-medium italic text-xl
                        max-md:text-base
                    ">
                        <Link
                            href={`/author/${article.author_id}`}
                            className="hover:text-primary transition-colors"
                        >
                            <span>
                                {article.author || 'No author name available'}
                            </span>
                        </Link>
                        <span>
                            {article.published_at || 'No published data available'}
                        </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="
                        text-2xl font-medium
                        max-md:text-lg
                    ">
                        {article.title || "No Title Available"}
                    </h3>

                    {/* Short Description / Excerpt */}
                    <p className="
                        text-md text-gray-600 dark:text-gray-300 font-medium italic
                        max-lg:text-lg
                    ">
                        {article.content || 'No content Available'}
                    </p>

                    {/* Navigation Button */}
                    <Link href={`/article/${article.id}`} className="mt-4 w-fit">
                        <PrimaryButton content={`More ...`} />
                    </Link>
                </div>
            </div>
        </article>
    )
}


/**
 * This component renders a compact, interactive article item designed for stacked layouts.
 * It uses advanced Tailwind CSS group-hover and group-active states to animate margins 
 * and opacity, creating a "pull-out" or "reveal" effect when the parent container is hovered.
 * * @param {ArticleData} article - The data object containing thumbnail, title, and category.
 * @param {number} layout_index - Used to dynamically set the z-index to maintain proper stacking order.
 */
export function Extra_ArticleItem({ article, layout_index }: { article: ArticleData, layout_index: number }) {

    /**
     * Renders a circular thumbnail with expanding text details.
     * Features:
     * - Dynamic Stacking: Assigns z-index based on layout_index to ensure overlapping works correctly.
     * - Reveal Animation: Shifts from negative margin (-mt-10) to positive (mt-4) and toggles 
     * opacity from 0 to 100 when the '.group/outer' is active or hovered.
     * - Circular Thumbnail: Uses a double-border effect (gray container + white inner border) 
     * for a high-end UI feel.
     */
    return (
        <div className="-mt-10 group-[.active]/outer:mt-4 group-hover/outer:mt-4 transition-all duration-300 w-fit">
            <div className="flex gap-4 items">
                {/* Stacked Circular Image with Zoom Effect */}
                <div className={`relative z-${layout_index} w-20 border-2 bg-gray-600 dark:text-gray-300 overflow-hidden rounded-full hover:scale-110 transition-transform`}>
                    <div className="overflow-hidden rounded-full w-fit border-4 border-white">
                        <Link href={`/article/${article.id}`}>
                            <Image
                                className="object-cover aspect-square"
                                src={article.image_src || '/empty_image.webp'}
                                alt={article.title || "No alt Available"}
                                width={80}
                                height={80}
                            />
                        </Link>
                    </div>
                </div>

                {/* Revealable Article Metadata */}
                <div className="flex-1 flex flex-col gap-2 py-2 opacity-0 group-hover/outer:opacity-100 group-[.active]/outer:opacity-100 transition-opacity duration-300">
                    <h4 className="font-medium font-serif italic text-xl line-clamp-1">
                        {article.title || 'No title available'}
                    </h4>
                    <p className="font-medium text-gray-600 dark:text-gray-300 text-xl line-clamp-1">
                        {article.category || 'No category Available'}
                    </p>
                </div>
            </div>
        </div>
    )
}

/**
 * This component renders a gallery-style article item with a dark overlay.
 * It features a background image that occupies the full square aspect ratio, 
 * with author information and article metadata layered on top using absolute positioning.
 * * @param {ArticleData} article - The data object containing article details and images.
 */
export function ArtcileGralleryItem({ article }: { article: ArticleData }) {

    /**
     * Retrieves author details based on the article's author_id.
     * This data is used to render the floating avatar link.
     */
    const author = getAuthorByID(article.author_id);

    return (
        <div className="relative flex items-center justify-center overflow-hidden">
            {/* Background Image: Scaled to fit a square container */}
            <Image
                className="w-full aspect-square object-cover"
                src={article.image_src || '/empty_image.webp'}
                alt={article.title || 'No alt available'}
                width={500}
                height={500}
            />

            {/* Dark Overlay: Provides contrast for the white text on top */}
            <div className="absolute w-full h-full left-0 top-0 bg-black opacity-50"></div>

            {/* Content Layer: Author avatar and article titles */}
            <div className="absolute flex flex-col h-full left-0 top-0 p-8 gap-4">
                {/* Author Avatar with hover scale effect */}
                <Link
                    aria-label={`Click this to go to ${author?.name || "this author"} page`}
                    title={author?.name}
                    href={`author/${author?.id}`}
                    className="hover:scale-125 transition-all duration-300 relative w-16 max-xl:w-12 aspect-square rounded-full overflow-hidden border-2 border-white"
                >
                    <Image
                        className="w-full aspect-square object-cover"
                        src={author?.avatar || '/empty_image.webp'}
                        alt={author?.name || 'Unknown Author'}
                        width={128}
                        height={128}
                    />
                </Link>

                {/* Article Info: Positioned at the bottom using mt-auto */}
                <h3 className="text-white mt-auto text-2xl line-clamp-2">
                    {article.title || 'No title available'}
                </h3>
                <p className="text-gray-300 text-base line-clamp-3">
                    {article.content || 'No content available'}
                </p>
            </div>
        </div>
    )
}
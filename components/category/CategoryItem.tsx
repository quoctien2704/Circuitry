import Link from "next/link"
import Image from 'next/image'
import { countAuthorsByCategory } from "@/data/articles/articles"
import { CategoryData } from "@/types/item"

/**
 * This component renders an individual category card, typically used in a list or grid.
 * It combines a circular featured image with the category title and an article counter.
 * The entire card acts as a link to the specific category's archive page.
 * * @param {CategoryData} categoryData - The data object containing name, image details, and link.
 */
export function CategoryItem({ categoryData }: { categoryData: CategoryData }) {

    /**
     * Renders a interactive category preview.
     * Features:
     * - Hover Effect: The 'group' class on the Link triggers a smooth scale-up animation 
     * on the background image via 'group-hover:scale-110'.
     * - Visual Style: Uses a circular (rounded-full) aspect-ratio container for the image.
     * - Dynamic Stats: Integrates 'countAuthorsByCategory' to display the current number 
     * of articles linked to this category.
     */
    return (
        <Link aria-label={`View all ${categoryData.name}`} title={`View all ${categoryData.name}`} href={categoryData.link} className="flex flex-col items-center justify-center group">
            {/* Circular Image Container */}
            <div className="
                rounded-full aspect-square mb-4 overflow-hidden w-full
            ">
                <Image
                    className="object-cover group-hover:scale-110 w-full h-full transition-transform duration-300"
                    src={categoryData.image.src || '/empty_image.webp'}
                    alt={categoryData.image.alt || categoryData.name}
                    width={categoryData.image.width}
                    height={categoryData.image.height}
                />
            </div>

            {/* Category Name */}
            <h4 className="text-xl font-medium">
                {categoryData.name}
            </h4>

            {/* Article Counter Statistics */}
            <p className="text-base font-medium text-foreground/60">
                <span>Articles : {countAuthorsByCategory(categoryData.name)}</span>
            </p>
        </Link>
    )
}
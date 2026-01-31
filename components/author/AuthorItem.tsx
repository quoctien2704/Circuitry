import { AuthorData } from "@/types/item";
import Image from 'next/image'
import Link from "next/link";

/**
 * This component renders an author card used in grid layouts (e.g., "Our Team" or "Authors" page).
 * It features a large square avatar with a smooth zoom effect and centered textual information.
 * * ThemeForest Standard: Using 'group-hover' on the title ensures visual feedback 
 * regardless of whether the user hovers over the image or the text.
 */

export function AuthorItem({ item }: { item: AuthorData }) {
    return (
        <div className="flex flex-col group h-full">
            {/* Author Avatar Link */}
            <Link
                href={`/author/${item.id || ''}`}
                aria-label={`Visit the profile of ${item.name || 'this author'}`}
            >
                <div className="flex items-center justify-center overflow-hidden rounded-4xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <Image
                        className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                        src={item.avatar || '/empty_image.webp'}
                        alt={item.name || 'Author representative image'}
                        width={512}
                        height={512}
                    />
                </div>
            </Link>

            {/* Author Content Section */}
            <div className="flex flex-col gap-1 px-4 mt-6">
                {/* Name: Serif font added for brand consistency if needed, or stick to sans for clean look */}
                <h3 className="font-semibold text-2xl md:text-center group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    {item.name || 'Anonymous Author'}
                </h3>

                {/* Role/Position */}
                <p className="text-gray-500 dark:text-gray-400 md:text-center text-lg font-medium">
                    {item.role || 'Contributor'}
                </p>
            </div>
        </div>
    )
}
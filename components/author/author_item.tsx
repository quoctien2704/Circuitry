import { AuthorData } from "@/types/item";
import Image from "next/image"
import Link from "next/link";

/**
 * This component renders an individual author profile item, designed for stacked list layouts.
 * It features a circular avatar with a "reveal" animation that pushes margins and toggles 
 * opacity for name and role when the parent container (group/outer) is interacted with.
 * * @param {AuthorData} author - The data object containing author details (name, role, avatar).
 * @param {number} layout_index - Used to dynamically manage z-index for overlapping visual effects.
 */
export function AuthorItem({ author, layout_index }: { author: AuthorData, layout_index: number }) {
    return (
        <div className="-mb-10 group-[.active]/outer:mb-4 group-hover/outer:mb-4 transition-[margin] duration-300 w-fit">
            <div className="flex gap-4 items-center">
                {/* Avatar Container with Dynamic Z-Index and Zoom Effect */}
                <div
                    className={`relative z-${layout_index} w-20 border-2 bg-gray-600 text-foreground/30 overflow-hidden rounded-full hover:scale-110 transition-transform duration-300`}
                >
                    <div className="overflow-hidden rounded-full w-fit border-4 border-white">
                        <Link
                            href={`/author/${author.id || ''}`}
                            aria-label={`View profile of ${author.name || 'this author'}`}
                        >
                            <Image
                                className="object-cover aspect-square"
                                src={author.avatar || '/empty_image.webp'}
                                alt={author.name || 'Author Avatar'}
                                width={80}
                                height={80}
                            />
                        </Link>
                    </div>
                </div>

                {/* Author Information Layer: Revealed on Group Hover/Active */}
                <div className="flex-1 flex flex-col gap-1 py-2 opacity-0 group-hover/outer:opacity-100 group-[.active]/outer:opacity-100 transition-opacity duration-300">
                    <h4 className="font-medium font-serif italic text-xl whitespace-nowrap">
                        {author.name || 'No name available'}
                    </h4>
                    <p className="font-medium text-foreground/60 text-lg whitespace-nowrap">
                        {author.role || 'No role available'}
                    </p>
                </div>
            </div>
        </div>
    )
}
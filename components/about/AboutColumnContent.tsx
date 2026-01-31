import { aboutData } from "@/data/sitedata";
import Link from "next/link";
import Image from 'next/image'

/**
 * This component renders a dual-column content section typically used in the "About" page.
 * It features a large featured image on the left (flex-3) and contextual text information 
 * on the right (flex-2), separated by a vertical border on desktop layouts.
 * * Layout behavior:
 * - Desktop: Horizontal flex layout with internal borders.
 * - Tablet/Mobile: Vertical column layout with adjusted padding and border visibility.
 */

export function AboutColumnContent() {
    return (
        <section className="my-20 max-md:my-10 lg:border-y border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="
                    flex
                    max-lg:flex-col
                ">
                    {/* Visual Content Column (Left on Desktop) */}
                    <div className="flex-3 lg:p-10 lg:pl-0 max-lg:pb-10">
                        <div className="overflow-hidden rounded-4xl flex items-center justify-center">
                            <Image
                                className="w-full aspect-3/2 object-cover hover:scale-105 transition-all duration-300"
                                loading="eager"
                                src={aboutData.column.image.src || '/empty_image.webp'}
                                alt={aboutData.column.image.alt || 'About section image'}
                                width={aboutData.column.image.width || 1200}
                                height={aboutData.column.image.height || 800}
                            />
                        </div>
                    </div>

                    {/* Text Content Column (Right on Desktop) */}
                    <div className="flex-2 flex flex-col justify-between lg:items-end gap-4 lg:p-10 lg:border-l border-gray-200 dark:border-gray-800">
                        {/* Sub-title Link */}
                        <Link
                            aria-label={`Read more about: ${aboutData.column.sub_title || 'this section'}`}
                            href={aboutData.column.sub_title_href || '/'}
                            className="
                                text-xl hover:text-primary transition-colors
                                max-lg:text-lg
                            "
                        >
                            <strong>
                                {aboutData.column.sub_title || 'No sub-title available'}
                            </strong>
                        </Link>

                        {/* Description Paragraph */}
                        <p className="
                            text-gray-600 dark:text-gray-300 text-lg lg:text-right
                            max-lg:text-base
                        ">
                            {aboutData.column.paragraph || 'No description available'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
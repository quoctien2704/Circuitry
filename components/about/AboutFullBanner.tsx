import { aboutData } from "@/data/sitedata";
import Image from 'next/image'

/**
 * This component renders a wide-screen banner section, typically for an "About" or "Brand" overview.
 * It consists of a full-width image with a hover-zoom effect, followed by a two-column 
 * layout on desktop that displays a large serif title and multiple paragraphs of text.
 * * Layout behavior:
 * - Desktop: 50/50 split (flex-1) with a large gap between title and content.
 * - Mobile: Vertical stack with centered/left-aligned text and reduced spacing.
 */

export function AboutFullBanner() {
    return (
        <section className="my-20 max-md:my-10">
            {/* Full-width Image Container */}
            <div className="overflow-hidden flex items-center justify-center">
                <Image
                    className="w-full aspect-5/2 max-md:aspect-3/2 object-cover hover:scale-105 transition-transform duration-300"
                    src={aboutData.full_banner.image.src || '/empty_image.webp'}
                    alt={aboutData.full_banner.image.alt || 'Full width banner display'}
                    width={aboutData.full_banner.image.width || 1920}
                    height={aboutData.full_banner.image.height || 768}
                />
            </div>

            <div className="container mx-auto px-4">
                <div className="
                    flex gap-20 mt-20 
                    max-lg:mt-10
                    max-md:flex-col max-md:gap-4
                ">
                    {/* Left Column: Main Narrative Title */}
                    <div className="flex-1">
                        <h2 className="
                            text-5xl font-medium font-serif italic
                            max-md:text-2xl
                        ">
                            {aboutData.full_banner.left_Title || 'No title available'}
                        </h2>
                    </div>

                    {/* Right Column: Detailed Multiple Content Paragraphs */}
                    <div className="flex-1">
                        {aboutData.full_banner.right_multiple_content && aboutData.full_banner.right_multiple_content.length > 0 ? (
                            <ul className="
                                flex flex-col gap-10
                                max-md:gap-4
                            ">
                                {aboutData.full_banner.right_multiple_content.map((item, index) => (
                                    <li key={`${item.slice(0, 10)}-${index}`}>
                                        <p className="
                                            font-medium text-lg text-gray-600 dark:text-gray-300
                                            max-md:text-base
                                        ">
                                            {item || 'No content available'}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400 italic">No additional content available</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
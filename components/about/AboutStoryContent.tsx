import { aboutData } from "@/data/sitedata";
import Image from 'next/image'
import Link from "next/link";
import { PrimaryButton } from "../button/primaryButton";

/**
 * This component renders the brand story section, typically used to share the mission or 
 * history of the platform on the "About" page. 
 * It features a split-screen layout with a descriptive text block on one side and 
 * an evocative featured image on the other.
 * * Layout behavior:
 * - Desktop: 50/50 horizontal split.
 * - Mobile/Tablet: Vertical stack with the image appearing on top (due to flex-col-reverse).
 */
export function AboutStoryContent() {
    return (
        <section className="my-20 max-md:my-10">
            <div className="container mx-auto px-4">
                <div className="
                    flex overflow-hidden rounded-2xl
                    max-lg:flex-col-reverse
                ">
                    {/* Narrative Text Column */}
                    <div className="flex-1 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                        <div className="
                            p-10 flex flex-col justify-center gap-10 items-start
                            max-lg:p-6 max-lg:gap-6
                        ">
                            {/* Story Main Heading */}
                            <h2 className="
                                text-5xl font-medium italic font-serif
                                max-lg:text-3xl
                            ">
                                {aboutData.story.title || 'No story title available'}
                            </h2>

                            {/* Story Detailed Narrative */}
                            <p className="
                                text-lg text-gray-600 dark:text-gray-300
                                max-lg:text-base
                            ">
                                {aboutData.story.paragraph || 'No story details available'}
                            </p>

                            {/* Interactive Call-to-Action */}
                            <Link
                                href={aboutData.story.button_href || '/'}
                                aria-label={`Maps to: ${aboutData.story.button_content || 'Our Story'}`}
                            >
                                <PrimaryButton content={aboutData.story.button_content || 'Read More'} />
                            </Link>
                        </div>
                    </div>

                    {/* Visual Imagery Column */}
                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                        <Image
                            className="min-h-100 object-cover hover:scale-105 transition-transform duration-300"
                            src={aboutData.story.image.src || '/empty_image.webp'}
                            alt={aboutData.story.image.alt || 'Brand story visual representation'}
                            width={aboutData.story.image.width || 800}
                            height={aboutData.story.image.height || 1000}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
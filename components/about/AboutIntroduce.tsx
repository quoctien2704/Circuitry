import { aboutData } from "@/data/sitedata";
import Image from 'next/image'

/**
 * This component renders the introduction section for the "About" page.
 * It features a centralized heading and subtitle, followed by a large, high-impact 
 * featured image with a hover-zoom effect.
 * * Layout behavior:
 * - Desktop: Centered text with a wide 4/2 aspect ratio image.
 * - Mobile/Tablet: Left-aligned text (at max-lg) with a more compact 3/2 aspect ratio image.
 */
export function AboutIntroduce() {
    return (
        <section className="my-20 max-md:my-10">
            <div className="container mx-auto px-4">
                <div className="
                    flex flex-col gap-2 items-center justify-center
                    max-lg:items-start
                ">
                    {/* Main Introduction Title */}
                    <h2 className="
                        text-5xl font-medium italic font-serif text-center
                        max-lg:text-3xl max-lg:text-left
                    ">
                        {aboutData.introduce.title || 'No title available'}
                    </h2>

                    {/* Secondary Introduction Subtitle */}
                    <p className="
                        text-lg text-gray-600 dark:text-gray-300 text-center
                        max-lg:text-left
                    ">
                        {aboutData.introduce.sub_title || 'No sub-title available'}
                    </p>

                    {/* Featured Image Container with Smooth Interaction */}
                    <div className="
                        w-full my-18 overflow-hidden rounded-4xl flex items-center justify-center
                        max-lg:my-0 max-lg:mt-8
                    ">
                        <div className="overflow-hidden w-full">
                            <Image
                                className="w-full max-lg:aspect-3/2 lg:aspect-4/2 object-cover hover:scale-105 transition-transform duration-300"
                                src={aboutData.introduce.image.src || '/empty_image.webp'}
                                alt={aboutData.introduce.image.alt || 'Introduction featured image'}
                                width={aboutData.introduce.image.width || 1600}
                                height={aboutData.introduce.image.height || 800}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
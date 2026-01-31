import { homeLayoutThreeData } from "@/data/sitedata"
import { PrimaryButton } from "../../button/primaryButton"
import { SecondaryButton } from "../../button/secondaryButton"
import Link from "next/link"
import Image from 'next/image'

/**
 * Renders the Hero section for Layout Three.
 * Features a split layout with a primary CTA area and a statistical/feature grid.
 * * ThemeForest Optimizations:
 * - Semantic HTML: Uses spans for decorative text to maintain a clean heading tree.
 * - Accessibility: Meaningful aria-labels for CTA buttons.
 * - UX: Robust image handling with priority loading for LCP.
 */

export function HomeHeroThree() {
    const heroData = homeLayoutThreeData?.hero || {};
    const leftContent = heroData.left || {};
    const rightContent = heroData.right || {};

    return (
        <section className="my-40 max-lg:my-30" aria-labelledby="hero-three-title">
            <div className="container mx-auto px-4">
                <div className="flex gap-10 max-xl:flex-col">

                    {/* Left Column: Content & CTA */}
                    <div className="flex-3 flex flex-col gap-4 items-start justify-center max-xl:items-center max-xl:text-center">
                        <span className="uppercase tracking-wider text-sm font-semibold text-primary">
                            {leftContent.sub_title}
                        </span>
                        <h2 id="hero-three-title" className="text-5xl max-lg:text-3xl font-serif italic">
                            {leftContent.title || 'Main Hero Title'}
                        </h2>
                        <p className="lg:text-lg text-gray-600 dark:text-gray-300">
                            {leftContent.paragraph}
                        </p>
                        <div className="flex gap-4 max-md:flex-col max-md:gap-2 items-center justify-center">
                            <Link
                                href={leftContent.primary_button_href || '#'}
                                aria-label={`${leftContent.primary_button_content}: Learn more about our services`}
                            >
                                <PrimaryButton content={leftContent.primary_button_content || 'Get Started'} />
                            </Link>
                            <Link
                                href={leftContent.secondary_button_href || '#'}
                                aria-label={`${leftContent.secondary_button_content}: View our work`}
                            >
                                <SecondaryButton content={leftContent.secondary_button_content || 'View More'} />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Visual Grid */}
                    <div className="flex-2 grid grid-cols-2 xl:grid-rows-2 max-xl:grid-cols-4 max-md:grid-cols-2 max-md:grid-rows-2 gap-4">
                        <div className="rounded-xl overflow-hidden shadow-md">
                            <Image
                                className="aspect-square object-cover"
                                src={rightContent.image_container?.src || '/empty_image.webp'}
                                alt={rightContent.image_container?.alt || 'Hero decorative image'}
                                width={rightContent.image_container?.width || 600}
                                height={rightContent.image_container?.height || 600}
                                // Hero images should often have priority to improve LCP
                                priority={true}
                            />
                        </div>

                        {rightContent.content_container?.length > 0 && (
                            <>
                                {rightContent.content_container.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`relative flex flex-col gap-2 items-start justify-end p-4 rounded-xl overflow-hidden shadow-sm ${index % 2 === 0 && `xl:-translate-y-2`}`}
                                    >
                                        {/* Using spans for visual numbers/titles to keep semantic h2-h3 flow */}
                                        <span className="relative z-3 text-6xl max-xl:text-3xl font-bold text-black dark:text-white">
                                            {item.title}
                                        </span>
                                        <span className="relative z-3 xl:text-2xl text-black dark:text-white font-medium">
                                            {item.sub_title}
                                        </span>
                                        {/* Decorative Background Overlay */}
                                        <div
                                            className={`absolute inset-0 opacity-30 z-2 ${index % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`}
                                            aria-hidden="true"
                                        ></div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
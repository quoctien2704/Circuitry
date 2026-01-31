import { homeLayoutFourData } from "@/data/sitedata"
import { HomePromoBannerItemData } from "@/types"
import Image from 'next/image'
import Link from "next/link"
import { PrimaryButton } from "../../button/primaryButton"
import { SecondaryButton } from "../../button/secondaryButton"

/**
 * Renders a list of promotional banners.
 * Optimized for ThemeForest:
 * - Uses semantic sectioning for SEO.
 * - Flex gap-px ensures a clean visual divider between banner items.
 */
export function HomePromoBanner() {
    const { promo } = homeLayoutFourData;

    return (
        <section
            className='my-40 max-md:my-20'
            aria-label="Promotional Banners"
        >
            <div className="flex flex-col gap-px bg-gray-200 dark:bg-gray-800">
                {promo.banners.map((banner, index) => (
                    <HomePromoBannerItem
                        key={index}
                        index={index}
                        banner={banner}
                    />
                ))}
            </div>
        </section>
    );
}

/**
 * Renders an individual promotional banner item with a background image and CTA overlay.
 * Optimized for ThemeForest:
 * - A11y: Concise aria-labels that describe the destination title.
 * - UX: Contrast-aware overlay (bg-black/20) for text readability.
 * - Logic: Dynamic styling based on index (Primary vs Secondary themes).
 */
export function HomePromoBannerItem({ banner, index }: { banner: HomePromoBannerItemData, index: number }) {

    const {
        title = "Promotional Offer",
        paragraph = "Explore our latest collection and exclusive deals.",
        button_content = "Shop Now",
        button_href = "/",
        image
    } = banner;

    const isEven = index % 2 === 0;

    return (
        <div className="relative overflow-hidden group">
            {/* Background Image Link */}
            <Link
                className="h-full block focus-visible:outline-offset-inside"
                aria-label={`View details for ${title}`}
                href={button_href}
            >
                <Image
                    src={image.src || '/empty_image.jpg'}
                    alt={image.alt || `Background image for ${title}`}
                    width={image.width || 2000}
                    height={image.height || 1000}
                    className="w-full h-full min-h-125 object-cover aspect-video group-hover:scale-105 transition-transform duration-700 ease-in-out cursor-pointer"
                    loading="lazy"
                />
            </Link>

            {/* Dark overlay to ensure text contrast passes WCAG standards */}
            <div className="absolute left-0 top-0 w-full h-full bg-black opacity-20 pointer-events-none" aria-hidden="true"></div>

            {/* Content Card Overlay */}
            <div className="absolute right-8 bottom-8 md:max-w-[40%] max-md:left-[50%] max-md:top-[50%] max-md:-translate-x-[50%] max-md:-translate-y-[50%] h-fit max-lg:w-[75%] flex flex-col gap-6 max-xl:gap-4 items-start max-md:items-center justify-center p-16 max-lg:p-8 bg-[rgba(20,20,20,0.6)] rounded-2xl backdrop-blur-sm">

                <h2 className={`max-md:text-center text-4xl max-xl:text-2xl font-bold font-serif italic text-shadow-2xs ${isEven ? 'text-primary' : 'text-secondary'}`}>
                    {title}
                </h2>

                <p className="max-md:text-center xl:text-xl max-xl:text-sm font-medium text-white">
                    {paragraph}
                </p>

                {/* Decorative separator */}
                <hr className={`h-0.5 w-full bg-linear-to-r ${isEven ? 'from-primary via-primary' : 'from-secondary via-secondary'} via-50% md:to-transparent my-2 border-t-0`} aria-hidden="true" />

                {/* CTA Button Link */}
                <Link
                    className="max-md:mx-auto transition-transform active:scale-95"
                    aria-label={`${button_content}: ${title}`}
                    href={button_href}
                >
                    {isEven ? (
                        <PrimaryButton content={button_content} />
                    ) : (
                        <SecondaryButton content={button_content} />
                    )}
                </Link>
            </div>
        </div>
    );
}
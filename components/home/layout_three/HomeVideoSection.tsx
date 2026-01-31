import { homeLayoutThreeData } from "@/data/sitedata"
import Link from "next/link"
import { PrimaryButton } from "../../button/primaryButton"

/**
 * Renders a promotional video section with descriptive titles and a CTA button.
 * Optimized for ThemeForest:
 * - A11y: Provides a meaningful title for the video element and descriptive aria-label for the link.
 * - UX: Implements video best practices (muted, playsInline) for autoplay compatibility.
 * - Stability: Safe data access with fallback values for all text fields.
 */

export function HomeVideoSection() {
    const videoData = homeLayoutThreeData?.video || {};
    const videoSource = videoData.video_src?.src || "";

    return (
        <section className="my-40 max-lg:my-20" aria-labelledby="video-section-title">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-4 justify-center items-center text-center">
                    {/* Main Heading */}
                    <h2
                        id="video-section-title"
                        className="text-7xl max-lg:text-3xl font-bold"
                    >
                        {videoData.big_title || 'Watch Our Story'}
                    </h2>

                    {/* Sub-titles: Using spans for decorative sizing to keep semantic h2-p flow */}
                    <span className="text-3xl max-lg:text-xl font-medium">
                        {videoData.medium_title}
                    </span>

                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                        {videoData.small_title}
                    </p>

                    {/* CTA Link */}
                    <Link
                        href={videoData.button_href || '#'}
                        aria-label={`${videoData.button_cotent || 'Explore'}: Learn more about our video content`}
                    >
                        <PrimaryButton content={videoData.button_cotent || 'Learn More'} />
                    </Link>

                    {/* Video Player */}
                    {videoSource && (
                        <div className="mt-8 w-full overflow-hidden rounded-2xl shadow-2xl">
                            <iframe
                                // Lưu ý: loop=1 cần đi kèm playlist=VIDEO_ID
                                src={`${videoSource}?autoplay=1&mute=1&loop=1&playlist=${videoSource.split('/').pop()}&controls=0`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full aspect-video border-none"
                                loading="lazy" // Thêm cái này để web load nhanh hơn
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
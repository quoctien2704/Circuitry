"use client"

import { membershipData } from "@/data/sitedata";
import { Swiper, SwiperSlide } from 'swiper/react';
import { PrimaryButton } from "../../button/primaryButton";
import { BenefitItem } from "./BenefitItem";
import Link from "next/link";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

/**
 * Renders the benefits slider section for Membership.
 * Optimized for ThemeForest:
 * - SEO: Semantic sectioning and robust data handling.
 * - Performance: Prevents Cumulative Layout Shift (CLS) via initialization classes.
 * - Accessibility: Added ARIA roles for the slider navigation.
 */

export function MembershipBenefit() {
    const benefitData = membershipData?.benefit || {};
    const benefitItems = benefitData.benefitItems || [];

    return (
        <section className="my-20 max-md:my-10" aria-labelledby="benefit-title">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10 max-lg:gap-4 items-center justify-center max-lg:items-start">
                    {/* Section Heading */}
                    <h2
                        id="benefit-title"
                        className="text-5xl font-medium italic font-serif max-lg:text-4xl lg:text-center"
                    >
                        {benefitData.title}
                    </h2>

                    <p className="text-lg text-gray-600 dark:text-gray-300 lg:text-center max-w-2xl">
                        {benefitData.content}
                    </p>

                    {/* CTA Link */}
                    <Link
                        href={benefitData.button_href || "#"}
                        aria-label={`${benefitData.button_content}: Learn more about our membership benefits`}
                    >
                        <PrimaryButton content={benefitData.button_content} />
                    </Link>

                    {/* Swiper Slider */}
                    {benefitItems.length > 0 && (
                        <div className="w-full mt-10 max-lg:mt-4" role="region" aria-label="Benefits Carousel">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                    1280: { slidesPerView: 4 },
                                }}
                                className="mySwiper w-full invisible opacity-0 max-h-160 transition-all duration-300 [&.swiper-initialized]:visible [&.swiper-initialized]:opacity-100 [&.swiper-initialized]:max-h-full"
                            >
                                {benefitItems.map((item, index) => (
                                    <SwiperSlide key={item.benefit_title || index} className="h-full py-4">
                                        <BenefitItem item={item} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
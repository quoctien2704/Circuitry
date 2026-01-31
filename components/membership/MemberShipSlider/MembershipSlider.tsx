"use client"

import { membershipData } from "@/data/sitedata";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { SliderItem } from "./SliderItem";
import { BreadCrumb } from "@/components/breadcrumb/breadcrumb";

import 'swiper/css';
import 'swiper/css/navigation';

/**
 * Renders the main Hero Slider for the Membership page.
 * Optimized for ThemeForest:
 * - Accessibility: Integrated Breadcrumb for clear navigation path.
 * - Interaction: Smooth Swiper integration with Autoplay and Navigation.
 * - UX: Prevents layout shift by ensuring conditional rendering logic.
 */
export function MembershipSlider() {
    const sliderData = membershipData?.slider || {};
    const sliders = sliderData.sliders || [];

    return (
        <section className="relative my-20 max-md:my-10" aria-label="Membership Introduction Slider">
            {sliders.length > 0 && (
                <Swiper
                    navigation={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]} // Ensure Navigation module is imported
                    className="mySwiper overflow-hidden  rounded-b-4xl max-lg:rounded-b-2xl"
                >
                    {sliders.map((sliderItem, index) => (
                        <SwiperSlide key={index}>
                            <SliderItem item={sliderItem} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Breadcrumb - Essential for SEO and UX consistency */}
            {sliderData.breadcrumb && (
                <div className="mt-8">
                    <BreadCrumb data={sliderData.breadcrumb} />
                </div>
            )}
        </section>
    );
}
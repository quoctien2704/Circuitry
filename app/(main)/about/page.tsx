import { AboutColumnContent } from "@/components/about/AboutColumnContent";
import { AboutContactContent } from "@/components/about/AboutContactContent";
import { AboutFullBanner } from "@/components/about/AboutFullBanner";
import { AboutIntroduce } from "@/components/about/AboutIntroduce";
import { AboutParameterContent } from "@/components/about/AboutParameterContent";
import { AboutStoryContent } from "@/components/about/AboutStoryContent";
import { AboutTopContent } from "@/components/about/AboutTopContent";

// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Circuitry",
    description:
        "Learn more about Circuitry – a modern technology and electronics blogging platform built for tech enthusiasts and professionals.",

    alternates: {
        canonical: "/about",
    },

    openGraph: {
        title: "About Circuitry",
        description:
            "Discover the mission, vision, and story behind Circuitry – a technology and electronics blog.",
        url: "https://circuitry-demo.vercel.app/about",
        images: [{ url: 'book.ico' }]
    },

    twitter: {
        card: "summary_large_image",
        title: "About Circuitry",
        description:
            "The story and mission behind Circuitry – technology & electronics blog.",
    },
};

export default function About() {
    return (
        <div className="min-h-[80vh] mt-40">
            <AboutTopContent />
            <AboutColumnContent />
            <AboutIntroduce />
            <AboutContactContent />
            <AboutStoryContent />
            <AboutFullBanner />
            <AboutParameterContent />
        </div>
    );
}

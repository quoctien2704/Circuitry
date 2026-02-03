import { BlogImage } from "@/components/blog/BlogImage";
import { BlogList } from "@/components/blog/BlogList";
import { BreadCrumb } from "@/components/breadcrumb/breadcrumb";
import { blogData } from "@/data/sitedata";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Read the latest articles on Circuitry covering technology, electronics, gadgets, tech accessories, reviews, and buying guides.",

    applicationName: "Circuitry",
    authors: [{ name: "Circuitry Team" }],
    creator: "Circuitry",
    publisher: "Circuitry",

    keywords: [
        "technology blog",
        "electronics articles",
        "tech accessories",
        "gadgets reviews",
        "hardware guides",
        "Circuitry blog"
    ],

    alternates: {
        canonical: "/blog"
    },

    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/blog",
        siteName: "Circuitry",
        title: "Blog | Circuitry",
        description:
            "Explore articles, reviews, and insights about technology and electronics on Circuitry.",
        images: [
            {
                url: "/book.ico",
                width: 1200,
                height: 630,
                alt: "Circuitry Blog"
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        title: "Blog | Circuitry",
        description:
            "Discover technology and electronics articles, reviews, and guides on Circuitry.",
        creator: "@circuitry"
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
        }
    },
    category: "technology"
};
export default function Blog() {
    return (
        <div className="min-h-[80vh] mt-19.5">
            <BlogImage />
            <BreadCrumb data={blogData.breadcrumb} />
            <Suspense>
                <BlogList />
            </Suspense>
        </div>
    )
}
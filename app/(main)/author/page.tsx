import { AuthorImage } from "@/components/author/AuthorImage";
import { AuthorList } from "@/components/author/AuthorList";
import { BreadCrumb } from "@/components/breadcrumb/breadcrumb";
import { authorData } from "@/data/sitedata";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authors",
    description:
        "Meet the authors behind Circuitry. Discover expert writers sharing insights on technology, electronics, gadgets, and tech accessories.",

    applicationName: "Circuitry",
    authors: [{ name: "Circuitry Team" }],
    creator: "Circuitry",
    publisher: "Circuitry",

    keywords: [
        "technology authors",
        "tech writers",
        "electronics experts",
        "gadgets reviewers",
        "tech accessories blog",
        "Circuitry authors"
    ],

    alternates: {
        canonical: "/author"
    },

    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/author",
        siteName: "Circuitry",
        title: "Authors | Circuitry",
        description:
            "Explore all authors contributing to Circuitry, a modern technology and electronics blog.",
        images: [{ url: "/book.ico" }]
    },

    twitter: {
        card: "summary_large_image",
        title: "Authors | Circuitry",
        description:
            "Meet the authors sharing knowledge and reviews about technology and electronics on Circuitry.",

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

export default function Author() {
    return (
        <div className="min-h-[80vh] mt-19.5">
            <AuthorImage />
            <BreadCrumb data={authorData.breadcrumb} />
            <AuthorList />
        </div>
    )
}
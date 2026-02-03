import { BreadCrumb } from "@/components/breadcrumb/breadcrumb";
import { CategoryImage } from "@/components/category/CategoryImage";
import { CategoryList } from "@/components/category/CategoryList";
import { categoryData } from "@/data/sitedata";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog Categories",
    description:
        "Browse all blog categories on Circuitry, covering electronics, tech accessories, gadgets, smart home devices, and digital trends.",

    applicationName: "Circuitry",
    authors: [{ name: "Circuitry Team" }],
    creator: "Circuitry",
    publisher: "Circuitry",

    keywords: [
        "blog categories",
        "technology categories",
        "electronics",
        "tech accessories",
        "gadgets",
        "smart home",
        "charging accessories",
        "Circuitry"
    ],

    alternates: {
        canonical: "/category"
    },

    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://circuitry-demo.vercel.app/category",
        siteName: "Circuitry",
        title: "Blog Categories | Circuitry",
        description:
            "Explore all technology and electronics blog categories on Circuitry.",
        images: [{ url: 'book.ico' }]
    },

    twitter: {
        card: "summary_large_image",
        title: "Blog Categories | Circuitry",
        description:
            "Explore all blog categories related to technology, electronics, and modern gadgets.",
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

export default function Category() {
    return (
        <div className="min-h-[80vh]">
            <CategoryImage />
            <BreadCrumb data={categoryData.breadcrumb} />
            <CategoryList />
        </div>
    );
}

import type { Metadata } from "next";
import '@/app/globals.css'
import React from "react";
import { ThemeWrapper } from "@/components/theme/ThemeWrapper";
import { ThemeProvder } from "@/theme/ThemeProvider";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
    metadataBase: new URL("https://circuitry.dev"),
    title: {
        default: "Circuitry – Technology & Electronics Blog",
        template: "%s | Circuitry"
    },
    description:
        "Circuitry is a modern technology and electronics blog covering gadgets, accessories, reviews, tutorials, and digital trends.",

    applicationName: "Circuitry",
    authors: [{ name: "Circuitry Team" }],
    creator: "Circuitry",
    publisher: "Circuitry",

    keywords: [
        "technology blog",
        "electronics blog",
        "tech accessories",
        "gadgets",
        "hardware",
        "digital trends",
        "tech reviews",
        "Circuitry"
    ],



    alternates: {
        canonical: "/"
    },

    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://circuitry-demo.vercel.app",
        siteName: "Circuitry",
        title: "Circuitry – Technology & Electronics Blog",
        description:
            "A modern blogging platform focused on technology, electronics, and the digital world.",
        images: [
            {
                url: "/book.ico",
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        title: "Circuitry – Technology & Electronics Blog",
        description:
            "Modern technology and electronics blog with articles, reviews, and insights.",
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

    icons: {
        icon: "/book.ico",
        shortcut: "/book.ico",
        apple: "/book.ico"
    },

    // manifest: "/site.webmanifest",

    category: "technology"
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {



    return (
        <html
            lang="en"
            className="md-lds mdl-js"
            style={{
                    "--primary": "#ff9671",
                    "--secondary": "#845ec2",
                    "--background": "#ffffff",
                    "--foreground": "#0F172A",
            } as any}
        >
            <body>
                <ThemeProvder>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />
                    <ThemeWrapper>
                        {children}
                    </ThemeWrapper>
                </ThemeProvder>

            </body>
        </html>
    );
}

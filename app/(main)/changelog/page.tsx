import { BreadCrumbSecond } from "@/components/breadcrumb/breadcrumb";
import { changelogData } from "@/data/sitedata"

// app/terms/page.tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
    metadataBase: new URL("https://circuitry.dev"),
    title: "Changelog – Circuitry",
    description:
        "Explore the complete changelog and release notes for Circuitry, including new features, improvements, and fixes.",

    alternates: {
        canonical: "/changelog",
    },

    keywords: [
        "Circuitry changelog",
        "Circuitry release notes",
        "website updates",
        "next.js changelog"
    ],

    robots: {
        index: true,
        follow: true,
    },

    openGraph: {
        title: "Changelog – Circuitry",
        description:
            "Track all updates, new features, and improvements released for Circuitry.",
        url: "/changelog",
        siteName: "Circuitry",
        type: "website"
    },

    twitter: {
        card: "summary",
        title: "Changelog – Circuitry",
        description:
            "See what's new in Circuitry: features, improvements, and fixes."
    }
}

/**
 * This page component displays the version history and update logs for the Circuitry template.
 * It uses a triple-nested mapping structure to categorize updates: 
 * Version -> Categories (New, Fixed, Improved) -> Specific changes.
 * * ThemeForest Standard: Providing a clear changelog increases buyer trust and complies with 
 * Envato's quality guidelines for product maintenance.
 */
export default function Changelog() {
    return (
        <div className="mt-40 mb-20 max-lg:mt-30 min-h-[80vh]">
            {/* Navigation aid showing the path to the current page */}
            <BreadCrumbSecond data={changelogData.breadcrumb} />

            <div className="container mx-auto px-4">
                {/* Header Section: Main Title and Divider */}
                <div className="flex flex-col items-start justify-center gap-2 mt-10 max-lg:mt-4">
                    <h3 className="text-5xl max-md:text-3xl font-medium italic font-serif">
                        {changelogData.title || 'Product Changelog'}
                    </h3>
                    <hr className="h-1 w-full my-20 max-lg:my-4 border-gray-300 dark:border-gray-700"></hr>
                </div>

                {/* Main Updates List */}
                <div>
                    {changelogData.updates && changelogData.updates.length > 0 ? (
                        <ul className="flex flex-col gap-16">
                            {changelogData.updates.map((changelog_item, index) => (
                                <li
                                    key={`${changelog_item.date}-${changelog_item.version || index}`}
                                    className="flex flex-col gap-2 border-b border-gray-100 dark:border-gray-800 pb-10 last:border-none"
                                >
                                    {/* Update Release Date */}
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                                        {changelog_item.date || 'Release date unknown'}
                                    </span>

                                    {/* Version Number */}
                                    <h4 className="text-4xl max-md:text-2xl font-medium italic font-serif mb-6">
                                        Version: {changelog_item.version || '0.0.0'}
                                    </h4>

                                    {/* Categories of changes within this version (e.g., Added, Fixed) */}
                                    {changelog_item.changes && changelog_item.changes.length > 0 && (
                                        <ul className="flex flex-col gap-8">
                                            {changelog_item.changes.map((change, cIdx) => (
                                                <li key={change.title || cIdx}>
                                                    {/* Change Category Title */}
                                                    <h5 className="text-3xl font-medium italic text-primary">
                                                        {change.title || 'General Updates'}
                                                    </h5>

                                                    {/* Individual Change Items */}
                                                    {change.contents && change.contents.length > 0 && (
                                                        <ul className="flex flex-col gap-3 mt-4 list-disc ml-10 text-gray-700 dark:text-gray-300">
                                                            {change.contents.map((content, cntIdx) => (
                                                                <li key={cntIdx} className="pl-2">
                                                                    <span className="text-lg max-lg:text-base">
                                                                        {content || 'Detailed change description missing'}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        /* Fallback: Displayed if no update history is found */
                        <p className="text-gray-400 italic text-center text-xl">
                            No update history available at this time.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
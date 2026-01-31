import { BreadCrumbSecond } from "@/components/breadcrumb/breadcrumb";
import { termsData } from "@/data/sitedata"

// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions",
    description:
        "Read the terms and conditions for using Circuitry – a technology and electronics blogging website.",

    alternates: {
        canonical: "/terms",
    },

    robots: {
        index: false, // ⭐ rất nên
        follow: true,
    },

    openGraph: {
        title: "Circuitry – Terms & Conditions",
        description:
            "Official terms and conditions governing the use of Circuitry blogging platform.",
        url: "https://circuitry-demo.vercel.app/terms",
        images: [{ url: "book.ico" }]
    },
};

/**
 * This page component renders the Terms and Conditions for the Circuitry platform.
 * It is structured to handle long-form legal text efficiently by mapping through 
 * an array of terms, each with its own heading and descriptive content.
 * * ThemeForest Standard: Uses semantic <ul> and <li> for legal clauses to improve 
 * SEO indexing and screen reader navigation.
 */
export default function Terms() {
    return (
        <div className="mt-40 mb-20 max-lg:mt-30 min-h-[80vh]">
            {/* Secondary Breadcrumb for deep-level navigation */}
            <BreadCrumbSecond data={termsData.breadcrumb} />

            <div className="container mx-auto px-4 mt-10">
                {/* Header Section: Main Title and Subtitle */}
                <div className="flex flex-col items-start justify-center gap-2">
                    <span className="text-gray-600 dark:text-gray-300">
                        {termsData.sub_title || 'Legal Information'}
                    </span>
                    <h3 className="text-5xl max-md:text-3xl font-medium italic font-serif">
                        {termsData.title || 'Terms & Conditions'}
                    </h3>

                    <hr className="h-1 w-full my-20 max-lg:my-10 border-gray-300 dark:border-gray-700"></hr>
                </div>

                {/* Terms and Conditions Content List */}
                <div>
                    {termsData.terms_and_conditions && termsData.terms_and_conditions.length > 0 ? (
                        <ul className="flex flex-col gap-10">
                            {termsData.terms_and_conditions.map((term, index) => (
                                <li
                                    key={term.title || index}
                                    className="flex flex-col gap-4"
                                >
                                    {/* Clause Heading */}
                                    <h4 className="text-4xl max-md:text-2xl font-medium italic font-serif">
                                        {term.title || 'Untitled Clause'}
                                    </h4>

                                    {/* Clause Content Text */}
                                    <p className="text-lg max-lg:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {term.content || 'Detailed content for this clause is currently unavailable.'}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        /* Fallback when no terms data is present */
                        <p className="text-gray-400 italic">No terms and conditions found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
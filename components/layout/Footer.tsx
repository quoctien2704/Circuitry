"use client"
import { scrollToTop } from "@/utils/helper"
import { footerData } from "@/data/sitedata"
import { PrimaryButton } from "../button/primaryButton"
import { ReactIcon } from "../Icon/ReactIcon"
import Link from "next/link"

/**
 * Renders the global site footer.
 * Optimized for ThemeForest standards:
 * - SEO: Semantic heading structure (h4 for column titles).
 * - Accessibility: aria-labels for icon-only social links.
 * - Interaction: Integrated scrollToTop logic for better UX navigation.
 */

export default function Footer() {
    // Destructuring with safety fallbacks
    const {
        footer_logo_url = "/",
        footer_logo_text = "Logo",
        footer_logo_src,
        footer_paragraph,
        footer_social_links = [],
        footer_button_content,
        footer_column_links = [],
        footer_copyRight = "© All Rights Reserved",
        footer_term_links = []
    } = footerData || {};

    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 py-20" aria-label="Site Footer">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10">
                    <div className="flex items-start justify-between max-lg:flex-col">

                        {/* Brand Section */}
                        <div className="flex flex-col items-start gap-4 lg:w-[30%]">
                            <div className="footer_logo flex gap-2">
                                <Link
                                    onClick={scrollToTop}
                                    href={footer_logo_url}
                                    className="footer_logo_title flex items-center justify-center gap-2 hover:text-primary transition-colors"
                                    aria-label={`Go to home - ${footer_logo_text}`}
                                >
                                    {footer_logo_src && (
                                        <ReactIcon name={footer_logo_src} size={30} aria-hidden="true" />
                                    )}
                                    <span className="text-3xl font-bold">
                                        {footer_logo_text}
                                    </span>
                                </Link>
                            </div>

                            {footer_paragraph && (
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {footer_paragraph}
                                </p>
                            )}

                            {/* Social Media List */}
                            {footer_social_links.length > 0 && (
                                <nav aria-label="Social media links">
                                    <ul className="flex gap-4 flex-wrap">
                                        {footer_social_links.map((navLink) => (
                                            <li key={navLink.social_name}>
                                                <Link
                                                    href={navLink.social_href}
                                                    onClick={scrollToTop}
                                                    className="text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-300"
                                                    // Critical: Tells screen readers which network this is
                                                    aria-label={`Follow us on ${navLink.social_name}`}
                                                >
                                                    {navLink.social_svg ? (
                                                        <ReactIcon size={32} name={navLink.social_svg} aria-hidden="true" />
                                                    ) : (
                                                        <span className="font-medium">{navLink.social_name}</span>
                                                    )}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            )}

                            {footer_button_content && (
                                <div className="mt-10 max-lg:mt-6 max-lg:mb-10" onClick={scrollToTop}>
                                    <PrimaryButton content={footer_button_content} />
                                </div>
                            )}
                        </div>

                        {/* Navigation Links Column */}
                        <div>
                            {footer_column_links.length > 0 && (
                                <ul className="flex gap-16 max-lg:flex-col max-lg:gap-8">
                                    {footer_column_links.map((column_link, index) => (
                                        <li key={`${column_link.name}-${index}`}>
                                            <ul className="flex flex-col gap-2">
                                                <li>
                                                    <Link href={column_link.href}>
                                                        {/* Semantic heading for column titles */}
                                                        <h4 className="font-medium text-lg mb-4 hover:text-primary max-lg:mb-0 transition-colors">
                                                            {column_link.name}
                                                        </h4>
                                                    </Link>
                                                </li>
                                                {column_link.footer_column_list.map((link) => (
                                                    <li key={link.name}>
                                                        <Link
                                                            href={link.href}
                                                            onClick={scrollToTop}
                                                            className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors py-1 block"
                                                        >
                                                            <span>{link.name}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <hr className="border-t-gray-200 dark:border-t-gray-700" aria-hidden="true" />

                    {/* Bottom Bar: Copyright & Terms */}
                    <div className="flex items-center justify-between max-lg:flex-col max-lg:items-start gap-4">
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-lg:text-base">
                            {footer_copyRight}
                        </p>

                        {footer_term_links.length > 0 && (
                            <nav aria-label="Legal navigation">
                                <ul className="flex gap-4 max-lg:flex-col max-lg:gap-2">
                                    {footer_term_links.map((term_link) => (
                                        <li key={term_link.name}>
                                            <Link
                                                href={term_link.href}
                                                onClick={scrollToTop}
                                                className="text-lg border-b text-gray-600 dark:text-gray-300 border-gray-400 hover:text-primary hover:border-primary transition-all max-lg:text-base"
                                            >
                                                {term_link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
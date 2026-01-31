import { aboutData } from "@/data/sitedata";
import { BiSolidRightArrowAlt } from "react-icons/bi";
import Link from "next/link";

/**
 * This component renders the hero heading section for the "About" page.
 * It serves as the entry point of the page content, featuring a breadcrumb-style 
 * sub-title link and a large, responsive serif title.
 */
export function AboutTopContent() {
    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-2 items-start justify-center">
                    {/* Sub-title Link / Breadcrumb navigation */}
                    <Link
                        className="
                            text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 hover:text-primary
                            transition-colors duration-300
                        "
                        href={aboutData.top.sub_title_href || '/'}
                        aria-label={`Go to ${aboutData.top.sub_title || 'previous page'}`}
                    >
                        <span>{aboutData.top.sub_title || 'No sub-title available'}</span>
                        <BiSolidRightArrowAlt size={20} />
                    </Link>

                    {/* Main Page Heading */}
                    <h2 className="
                        text-5xl font-medium italic font-serif
                        max-lg:text-4xl
                        max-md:text-3xl
                        max-sm:text-2xl
                    ">
                        {aboutData.top.title || 'No title available'}
                    </h2>
                </div>
            </div>
        </section>
    );
}
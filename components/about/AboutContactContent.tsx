import { aboutData } from "@/data/sitedata";
import Link from "next/link";
import { ReactIcon } from "../Icon/ReactIcon";

/**
 * This component renders the contact information section, typically found on the "About" page.
 * It displays a central heading and subtitle, followed by a grid of contact methods 
 * (social media, email, etc.) with interactive hover animations.
 * * Layout behavior:
 * - Desktop: Centered headings with a 3-column grid for contact items.
 * - Mobile/Tablet: Left-aligned text with a vertical stack for contact items.
 */

export function AboutContactContent() {
    return (
        <section className="my-20 max-md:my-10">
            <div className="container mx-auto px-4">
                <div className="
                    flex flex-col gap-2 items-center justify-center
                    max-xl:items-start
                ">
                    {/* Section Main Heading */}
                    <h2 className="
                        text-5xl font-medium italic font-serif text-center
                        max-lg:text-3xl max-lg:text-left
                    ">
                        {aboutData.contact.title || 'No title available'}
                    </h2>

                    {/* Section Subtitle Description */}
                    <p className="
                        text-lg text-gray-600 dark:text-gray-300 text-center
                        max-lg:text-left
                    ">
                        {aboutData.contact.sub_title || 'No sub-title available'}
                    </p>

                    {/* Contact Methods List */}
                    {aboutData.contact.contacts.length > 0 && (
                        <ul className="
                            grid grid-cols-3 gap-10 mt-12 w-full
                            max-lg:flex max-lg:flex-col max-lg:gap-4 max-lg:mt-2
                        ">
                            {aboutData.contact.contacts.map((contact, index) => (
                                <li className="w-full" key={contact.contact_title || index}>
                                    <Link
                                        className="flex gap-4 items-center justify-center p-6 bg-gray-200 dark:bg-gray-800 rounded-4xl group hover:-translate-y-1 transition-transform duration-300"
                                        href={contact.svg_data.social_href || '#'}
                                        aria-label={`Contact us via ${contact.contact_title || 'this method'}`}
                                    >
                                        {/* Icon Container with Floating Hover Effect */}
                                        <div
                                            className="p-4 bg-gray-400 dark:bg-gray-600 rounded-full group-hover:scale-110 group-hover:-translate-y-3 transition-transform duration-300"
                                            title={contact.svg_data.social_name || 'Contact Icon'}
                                        >
                                            <ReactIcon size={30} name={contact.svg_data.social_svg} />
                                        </div>

                                        {/* Contact Text Labels */}
                                        <div className="flex-1 py-2 flex flex-col">
                                            <h3 className="text-xl font-medium font-serif italic">
                                                {contact.contact_title || 'No contact title available'}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 font-medium">
                                                {contact.contact_paragraph || 'No contact details available'}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
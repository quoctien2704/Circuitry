import { aboutData } from "@/data/sitedata";

/**
 * This component renders a statistical or parameter-based section, ideal for showcasing 
 * key metrics (e.g., total users, articles, or years of experience) on the "About" page.
 * It uses a responsive grid layout to display data cards that adapt from a 4-column 
 * desktop view to a single-column mobile view.
 */

export function AboutParameterContent() {
    return (
        <section className="my-20 max-md:my-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10">
                    {/* Section Title */}
                    <h2 className="text-5xl max-md:text-2xl font-serif italic">
                        {aboutData.parameter.title || 'Our Statistics'}
                    </h2>

                    {/* Parameters Grid */}
                    {aboutData.parameter.parameters && aboutData.parameter.parameters.length > 0 ? (
                        <ul className="
                            grid grid-cols-4 gap-10 
                            max-xl:grid-cols-2 max-xl:gap-7
                            max-sm:grid-cols-1 max-sm:gap-4
                        ">
                            {aboutData.parameter.parameters.map((item, index) => (
                                <li
                                    key={item.parameter || index}
                                    className="flex-1 flex flex-col gap-2 items-center justify-center p-6 bg-gray-200 dark:bg-gray-800 rounded-4xl transition-colors duration-300"
                                >
                                    {/* Parameter Value (e.g., "10K+", "500+") */}
                                    <h3 className="text-4xl font-medium font-serif italic">
                                        {item.parameter || '0'}
                                    </h3>

                                    {/* Parameter Description (e.g., "Active Users") */}
                                    <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
                                        {item.sub_content || 'No description available'}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        /* Fallback when no parameters are provided */
                        <p className="text-gray-400 italic">No parameters available to display.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
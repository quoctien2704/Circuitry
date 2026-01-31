import { homeLayoutFourData } from "@/data/sitedata"
import { handleFormEvent } from "@/utils/form"
import { ReactIcon } from "../../Icon/ReactIcon"
import Link from "next/link"
import Form from 'next/form'

/**
 * Renders the Newsletter subscription section.
 * Optimized for ThemeForest:
 * - WCAG compliant aria-labels for icon-only links.
 * - Explicit aria-label for form input to replace missing visual label.
 * - Descriptive section linking using aria-labelledby.
 */

export function HomeNewsletterBox() {
    const { letter } = homeLayoutFourData;

    return (
        <section className='mt-40 max-md:mt-20' aria-labelledby="newsletter-title">
            <div className="container px-4 mx-auto">
                <div className="flex gap-10 max-xl:flex-col">
                    <div className="flex-2 xl:border-r border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col gap-4 pr-10">
                            <h2 id="newsletter-title" className="text-5xl max-lg:text-3xl font-serif font-medium italic">
                                {letter.title || 'Stay Updated'}
                            </h2>
                            <p className="lg:text-xl text-gray-600 dark:text-gray-300">
                                {letter.paragraph || 'Subscribe to our newsletter for the latest news.'}
                            </p>
                        </div>

                        <hr className="mt-10 border-gray-200 dark:border-gray-800" />

                        <div className="grid grid-cols-2 max-lg:grid-cols-1 grid-rows-3 gap-10 pr-10 xl:py-10 max-xl:pt-10">
                            {letter.contents.map((content, index) => (
                                <div key={index} className="flex gap-4 items-start justify-start text-gray-600 dark:text-gray-300">
                                    <Link
                                        className="hover:text-primary hover:scale-125 transition-all duration-300"
                                        aria-label={`Follow us on ${content.svg.social_name || 'Social Media'}`}
                                        title={content.svg.social_name || 'Social Link'}
                                        href={content.svg.social_href || '#'}
                                    >
                                        <ReactIcon name={content.svg.svg} size={30} aria-hidden="true" />
                                    </Link>
                                    <h3 className="lg:text-xl font-medium italic h-full">
                                        {content.content || 'Join our community'}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex items-end">
                        <Form className='mr-auto w-full mb-4' action={handleFormEvent}>
                            <div className='border border-gray-200 dark:border-gray-800 rounded-xl w-full flex items-center justify-center overflow-hidden'>
                                <input
                                    className='flex-1 p-4 outline-none w-full bg-white dark:bg-black'
                                    name='email'
                                    type='email'
                                    required
                                    aria-label="Email Address"
                                    placeholder={letter.form_placeholder || 'Enter your email...'}
                                />
                                <button
                                    className='bg-primary transition-all duration-300 hover:bg-white dark:hover:bg-[hsl(225,40%,5%)] border-2 border-primary cursor-pointer p-4 font-medium text-white hover:text-primary w-40 rounded-xl max-lg:w-fit max-lg:text-sm'
                                    type='submit'
                                >
                                    {letter.form_button_content || 'Subscribe'}
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}
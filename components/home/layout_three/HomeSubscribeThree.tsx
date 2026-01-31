import { homeLayoutThreeData } from "@/data/sitedata"
import { handleFormEvent } from "@/utils/form"
import Form from 'next/form'
import Image from 'next/image'

/**
 * Renders a newsletter subscription section with an illustrative image.
 * Optimized for ThemeForest:
 * - Accessibility: Added aria-label to the input field for screen readers.
 * - Robustness: Implemented nullish coalescing for all data paths.
 * - UX: Enhanced focus states and semantic heading structure.
 */

export function HomeSubscribeThree() {
    const subData = homeLayoutThreeData?.subscribe || {};
    const leftData = subData.left || {};
    const rightData = subData.right || {};

    return (
        <section className="mt-20 py-20" aria-labelledby="subscribe-three-title">
            {/* Fixed typo: "gray-100dark" to "gray-100 dark" */}
            <div className="container mx-auto p-4 bg-gray-100 dark:bg-[hsl(225,40%,5%)] rounded-3xl overflow-hidden">
                <div className='flex max-lg:flex-col items-center'>
                    {/* Image Column */}
                    <div className='flex-1 w-full'>
                        <Image
                            className='aspect-square rounded-4xl max-lg:rounded-xl object-cover'
                            src={leftData.image?.src || '/empty_image.webp'}
                            alt={leftData.image?.alt || 'Newsletter subscription illustration'}
                            width={leftData.image?.width || 600}
                            height={leftData.image?.height || 600}
                            loading="lazy"
                        />
                    </div>

                    {/* Content & Form Column */}
                    <div className='flex flex-2 flex-col gap-4 lg:justify-center lg:p-8 p-6 max-lg:my-6'>
                        <div className="flex gap-2 text-2xl font-bold max-lg:text-xl">
                            <span>{rightData.span?.text}</span>
                            <span className="text-primary">{rightData.span?.highlight_text}</span>
                        </div>

                        <h2 id="subscribe-three-title" className='text-4xl font-bold max-lg:text-3xl'>
                            {rightData.title || 'Subscribe to our Newsletter'}
                        </h2>

                        <h3 className='text-lg font-medium text-gray-500 dark:text-gray-300 mb-4 max-lg:text-base'>
                            {rightData.paragraph || 'Stay updated with our latest news and offers.'}
                        </h3>

                        <Form
                            className='mr-auto w-full max-lg:mt-2'
                            action={handleFormEvent}
                        >
                            <div className='border border-gray-200 dark:border-gray-800 rounded-xl w-full flex items-center justify-center overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-all duration-300'>
                                <input
                                    className='flex-1 p-4 outline-none w-full bg-white dark:bg-black'
                                    name='email'
                                    type='email'
                                    required
                                    aria-required="true"
                                    /* Essential: Provides context for screen readers as there's no visible <label> */
                                    aria-label="Email address for newsletter"
                                    placeholder={rightData.form_placeholder || 'Enter your email...'}
                                />
                                <button
                                    className='bg-primary transition-all duration-300 hover:bg-white dark:hover:bg-[hsl(225,40%,5%)] border-2 border-primary cursor-pointer p-4 font-medium text-xl text-white hover:text-primary w-60 rounded-xl max-lg:w-fit max-lg:text-sm'
                                    type='submit'
                                >
                                    {rightData.form_button_content || 'Subscribe'}
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}
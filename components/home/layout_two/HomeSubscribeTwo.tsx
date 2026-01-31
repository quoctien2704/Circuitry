"use client"
import { homeLayoutTwoData } from '@/data/sitedata';
import { handleFormEvent } from "@/utils/form"
import Form from 'next/form'
import Image from 'next/image'

/**
 * Renders a two-column subscription section with an illustrative image.
 * Optimized for ThemeForest:
 * - A11y: Hidden labels for form inputs and descriptive alt text for images.
 * - Responsive: Smooth transition from side-by-side to stacked layout on mobile.
 * - Consistency: Uses standardized fallback strings for all dynamic data points.
 */
export function HomeSubscribeTwo() {
    const subData = homeLayoutTwoData?.subscribe || {};
    const subImage = subData?.image || {};

    return (
        <section
            className="mt-20 py-20 bg-gray-100 dark:bg-[hsl(225,40%,5%)]"
            aria-labelledby="subscribe-two-title"
        >
            <div className="container mx-auto px-4">
                <div className='flex max-lg:flex-col items-center'>
                    {/* Visual Illustration Column */}
                    <div className='flex-1 w-full'>
                        <Image
                            className='aspect-square rounded-4xl max-lg:rounded-xl object-cover'
                            src={subImage.src || '/placeholder-subscribe.jpg'}
                            alt={subImage.alt || 'Newsletter illustration'}
                            width={subImage.width || 600}
                            height={subImage.height || 600}
                            loading="lazy"
                        />
                    </div>

                    {/* Content & Form Column */}
                    <div className='flex flex-2 flex-col gap-4 lg:justify-center lg:p-8 p-2 max-lg:my-6'>
                        <h2
                            id="subscribe-two-title"
                            className='text-4xl font-bold max-lg:text-3xl'
                        >
                            {subData.title || 'Join Our Community'}
                        </h2>

                        <h3 className='text-lg font-medium text-gray-500 dark:text-gray-300 max-lg:text-base'>
                            {subData.content || 'Subscribe to get the latest news and updates.'}
                        </h3>

                        <Form
                            className='mr-auto w-full max-lg:mt-2'
                            action={handleFormEvent}
                        >
                            <div className='border border-gray-200 dark:border-gray-800 rounded-xl w-full flex items-center justify-center overflow-hidden focus-within:border-primary transition-colors'>
                                <input
                                    className='flex-1 p-4 outline-none w-full bg-white dark:bg-black'
                                    name='email'
                                    type='email'
                                    required
                                    aria-required="true"
                                    /* Essential for accessibility when visual label is absent */
                                    aria-label="Email address for newsletter"
                                    placeholder={subData.placeHolder || 'Enter your email...'}
                                />
                                <button
                                    className='bg-primary transition-all duration-300 hover:bg-white dark:hover:bg-[hsl(225,40%,5%)] border-2 border-primary cursor-pointer p-4 font-medium text-xl text-white hover:text-primary w-60 rounded-xl max-lg:w-fit max-lg:text-sm'
                                    type='submit'
                                >
                                    Subscribe
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}
"use client"

import { homeData } from '@/data/sitedata'
import { handleFormEvent } from "@/utils/form"
import Form from 'next/form'

/**
 * Renders the Newsletter subscription call-to-action section.
 * Key Standards:
 * - WCAG: Form inputs use 'aria-label' since there's no visual <label>.
 * - UX: Robust fallback values for text and input placeholders.
 * - Semantic: Uses aria-labelledby for better section context.
 */
export function HomeSubscribe() {
    // Ensuring data exists with fallback defaults
    const subscribeData = homeData?.subscribe || {};

    return (
        <section
            className="mt-20 py-20 bg-gray-100 dark:bg-[hsl(225,40%,5%)]"
            aria-labelledby="subscribe-heading"
        >
            <div className="container mx-auto px-4">
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <h2
                        id="subscribe-heading"
                        className='text-4xl font-bold max-lg:text-3xl max-lg:text-center'
                    >
                        {subscribeData.header || 'Subscribe to our newsletter'}
                    </h2>

                    <h3 className='text-lg font-medium text-foreground/50 max-lg:text-base max-lg:text-center'>
                        {subscribeData.sub_header || 'Get the latest updates right in your inbox'}
                    </h3>

                    <Form
                        className='mt-10 lg:w-[50%] mx-auto max-lg:mt-2 max-lg:mx-0'
                        action={handleFormEvent}
                    >
                        <div className='border border-gray-200 dark:border-gray-800 rounded-xl w-full flex items-center justify-center overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-all'>
                            <input
                                className='flex-1 p-4 outline-none w-full bg-white dark:bg-black'
                                name='email'
                                type='email'
                                required
                                aria-required="true"
                                // Critical for accessibility without visual labels
                                aria-label="Email address for subscription"
                                placeholder={subscribeData.placeHolder || 'Your email address'}
                            />
                            <button
                                className='bg-primary transition-all duration-300 hover:bg-white dark:hover:bg-[hsl(225,40%,5%)] border-2 border-primary cursor-pointer p-4 font-medium text-xl text-white hover:text-primary w-60 rounded-xl max-lg:w-fit max-lg:text-sm'
                                type='submit'
                            >
                                Subscribe
                            </button>
                        </div>
                    </Form>

                    <p className='text-foreground/60 font-medium max-lg:text-center'>
                        {subscribeData.support_text || 'We respect your privacy. Unsubscribe at any time.'}
                    </p>
                </div>
            </div>
        </section>
    );
}
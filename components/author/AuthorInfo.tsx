import { AuthorData } from '@/types/item'
import Image from 'next/image'

/**
 * This component displays detailed author information including a large profile picture, 
 * name, role, and biography. It is designed to be the primary focus of an author profile page.
 * * @param {AuthorData} author - The comprehensive author data object.
 * * ThemeForest Standard: Uses 'leading-relaxed' for bio text and semantic <h2>/<h3> hierarchy 
 * for optimal SEO crawling of author identities.
 */

export function AuthorInfo({ author }: { author: AuthorData }) {
    return (
        <section className="max-lg:my-10 my-20">
            <div className="container mx-auto px-4">
                <div className="flex gap-10 mt-10 max-lg:flex-col max-lg:gap-4">
                    {/* Author Portrait Container */}
                    <div className="overflow-hidden rounded-2xl max-lg:rounded-xl shadow-xl shrink-0">
                        <Image
                            loading="eager"
                            className="aspect-square w-full lg:w-lg lg:max-h-128 object-cover hover:scale-105 transition-transform duration-500"
                            src={author.avatar || '/empty_image.webp'}
                            alt={author.name || 'Author Portrait'}
                            width={512}
                            height={512}
                        />
                    </div>

                    {/* Author Textual Content */}
                    <div className="flex-1 justify-center flex flex-col gap-4">
                        {/* Author Slug/Handle */}
                        <span className="text-gray-600 dark:text-gray-400 text-md font-medium tracking-wider">
                            @{author.slug || 'author'}
                        </span>

                        {/* Full Name: High-impact Serif font for brand consistency */}
                        <h2 className="lg:text-7xl font-bold font-serif max-lg:text-4xl italic text-gray-800 dark:text-gray-100">
                            {author.name || 'Anonymous Author'}
                        </h2>

                        {/* Professional Role/Position */}
                        <h3 className="lg:text-xl text-gray-500 dark:text-gray-400 font-medium">
                            {author.role || 'Content Creator'}
                        </h3>

                        {/* Stylized Decorative Divider */}
                        <hr className="border-none h-px w-full bg-linear-to-r from-gray-400 to-transparent lg:my-2" />

                        {/* Full Biography: Leading-relaxed ensures long text remains readable */}
                        <p className="lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                            {author.bio || 'This author has not shared their story yet. Stay tuned for more insights from their professional journey.'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
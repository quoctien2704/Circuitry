import { authorData } from "@/data/sitedata"
import Image from 'next/image'

/**
 * This component renders the hero banner for an author's profile page.
 * It features a wide-screen background image with a parallax-like zoom effect, 
 * a dark overlay for text readability, and a centered title that scales on hover.
 * * ThemeForest Standard: Uses 'pointer-events-none' on overlays to ensure 
 * the interactive elements beneath (if any) remain accessible.
 */

export function AuthorImage() {
    return (
        <section className="relative group overflow-hidden">
            {/* Background Image Container */}
            <div className="relative">
                <div className="flex items-center justify-center overflow-hidden">
                    <Image
                        loading="eager"
                        className="w-full aspect-5/2 object-cover group-hover:scale-110 transition-transform duration-300 min-h-100"
                        src={authorData.image.src || '/empty_image.webp'}
                        alt={authorData.image.alt || 'Author Profile Banner'}
                        width={authorData.image.width || 1920}
                        height={authorData.image.height || 768}
                    />
                </div>

                {/* Dark Overlay Layer: Enhances contrast for the centered text */}
                <div className="absolute left-0 top-0 w-full h-full bg-black opacity-30 pointer-events-none"></div>
            </div>

            {/* Centered Heading Content */}
            <div className="
                absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-10 
                hover:scale-110 transition-transform duration-300
                max-lg:container max-lg:mx-auto max-lg:w-full
            ">
                <h3 className="
                    text-center p-4 rounded-xl font-bold text-5xl text-white
                    max-lg:text-4xl max-md:text-3xl
                ">
                    {authorData.image.alt || 'Author Profile'}
                </h3>
            </div>
        </section>
    );
}
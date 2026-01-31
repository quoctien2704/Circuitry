"use client"
import { getAuthorsByIDArray } from "@/data/authors/authors";
import { globalArticleData } from "@/data/sitedata";
import { articlesData } from "@/data/articles/articles";
import { useEffect, useRef, useState } from "react";
import { ArticleItem, Extra_ArticleItem } from "../../article/article_item";
import { AuthorItem } from "../../author/author_item"
import Link from "next/link";

/**
 * HomeArticleList Component
 * A flagship section for the Circuitry homepage featuring a sticky sidebar with 
 * authors/extra posts and a main feed with progressive loading.
 * * Key features:
 * - IntersectionObserver: Toggles 'active' class for entry animations.
 * - Sticky Layout: Dual-sidebar effect on high-resolution screens.
 * - Dynamic Loading: Fetches 4 more articles per interaction.
 */
export function HomeArticleList() {
    const [articlesCount, setArticlesCount] = useState(4);
    const [authors] = useState(() => getAuthorsByIDArray(globalArticleData.authors_id) || []);
    const sectionRef = useRef<HTMLElement | null>(null);

    /**
     * Scroll-linked Animation Logic
     * Monitors the section visibility to trigger entrance transitions.
     */
    useEffect(() => {
        const currentRef = sectionRef.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Toggles the 'active' class used for CSS animations/transitions
                currentRef.classList.toggle('active', entry.isIntersecting);
            },
            {
                threshold: 0.1, // Trigger when 10% of the section is visible
                rootMargin: "0px 0px -100px 0px" // Slight offset for better feel
            }
        );

        observer.observe(currentRef);

        // Cleanup: Essential for preventing memory leaks on route changes
        return () => observer.disconnect();
    }, [articlesCount]); // Re-observe if list height changes significantly

    return (
        <section
            ref={sectionRef}
            className='my-20 group/outer observe-section transition-opacity duration-700'
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10">
                    {/* Main Section Heading */}
                    <h2 className="text-6xl font-medium italic font-serif max-lg:text-center text-gray-900 dark:text-gray-100">
                        {globalArticleData.header}
                    </h2>

                    <div className="flex gap-10">
                        {/* LEFT SIDEBAR: Sticky content (Hidden on Mobile) */}
                        <aside className="flex-2 relative max-lg:hidden">
                            <div className="sticky top-20 h-[90vh] flex flex-col justify-between py-4">

                                {/* Authors Group */}
                                {authors.length > 0 && (
                                    <div className="flex flex-col">
                                        <Link href={globalArticleData.author_title_link || '#'}>
                                            <h3 className="text-4xl font-medium mb-10 hover:text-primary transition-colors">
                                                {globalArticleData.author_title}
                                            </h3>
                                        </Link>
                                        <ul className="flex flex-col gap-2">
                                            {authors.map((author, index) => (
                                                <li key={author.id || index}>
                                                    <AuthorItem author={author} layout_index={index} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Extra/Recommended Articles Group */}
                                {articlesData.length > 0 && (
                                    <div className="flex flex-col justify-end">
                                        <ul className="flex flex-col gap-2">
                                            {articlesData.slice(0, 3).map((article, index) => (
                                                <li key={article.id || index}>
                                                    <Extra_ArticleItem article={article} layout_index={index} />
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href={globalArticleData.article_title_link || '#'}>
                                            <h3 className="text-4xl font-medium mt-10 hover:text-primary transition-colors">
                                                {globalArticleData.article_title}
                                            </h3>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </aside>

                        {/* MAIN FEED: Vertical Article List */}
                        <main className="flex-3 lg:border-l border-gray-200 dark:border-gray-800 lg:pl-10">
                            {articlesData.length > 0 ? (
                                <ul className="flex flex-col gap-10">
                                    {articlesData.slice(0, articlesCount).map((article) => (
                                        <li key={article.id || article.title}>
                                            <ArticleItem article={article} />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400 italic">No articles available.</p>
                            )}

                            {/* Load More Button Container */}
                            {articlesData.length > articlesCount && (
                                <div className="mt-10">
                                    <hr className="mb-8 border-gray-100 dark:border-gray-800" />
                                    <button
                                        onClick={() => setArticlesCount(prev => prev + 4)}
                                        className="w-full p-4 border-2 border-primary bg-primary hover:bg-transparent transition-all duration-300 cursor-pointer rounded-lg group"
                                        aria-label="Load more articles"
                                    >
                                        <span className="text-white font-bold group-hover:text-primary transition-colors">
                                            Load More Articles
                                        </span>
                                    </button>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </section>
    );
}
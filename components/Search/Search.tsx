"use client"
import { getArticleBySearchContent } from '@/data/articles/articles';
import { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { SearchArticleItem } from './SearchArticleItem';
import { usePathname } from 'next/navigation';
import Form from 'next/form'

/**
 * SearchBar Component with Live Search functionality.
 * Optimized for ThemeForest:
 * - UX: Instant feedback with minimum character validation.
 * - Accessibility: ARIA live regions to announce search results.
 * - Logic: Automatically clears search state on route change.
 */

export function SearchBar({ search_placeholder }: { search_placeholder: string }) {
    const pathName = usePathname();
    const [content, setContent] = useState('');
    const [articles, setArticles] = useState(getArticleBySearchContent(content));


    useEffect(() => {
        setArticles(getArticleBySearchContent(content));
    }, [content])
    useEffect(() => {
        setContent('')
    }, [pathName])
    return (
        <div className="relative flex-1 max-w-100">
            <Form
                action="/blog"
                className='flex bg-gray-200 dark:bg-gray-900 justify-between items-center rounded-md h-fit'
                role="search"
            >
                <input
                    className='text-black font-bold border-0 py-3 px-6 focus:outline-none w-full dark:text-white bg-transparent'
                    placeholder={search_placeholder}
                    value={content}
                    name='query'
                    onChange={(e) => setContent(e.target.value)}
                    autoComplete='off'
                    aria-label="Search articles"
                />
                <button
                    type='submit'
                    className='mr-2 p-1.5 bg-gray-300 rounded-full group hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-300 cursor-pointer transition-colors'
                    aria-label="Submit search"
                >
                    <IoSearch className='w-5 h-5 text-black group-hover:text-white dark:text-white dark:group-hover:text-black' />
                </button>
            </Form>

            {/* Live Search Results Panel */}
            <div
                className='absolute top-full left-0 w-full z-50 max-md:hidden'
                aria-live="polite" // Announces updates to screen readers
            >
                {content.length > 0 && content.length < 2 && (
                    <div className='bg-white dark:bg-[hsl(225,40%,5%)] p-4 px-8 shadow-lg border border-gray-200 dark:border-gray-700 rounded-b-xl text-lg font-medium'>
                        At least 2 letters required
                    </div>
                )}

                {content.length >= 2 && (
                    articles.length > 0 ? (
                        <ul className='flex flex-col gap-2 bg-white dark:bg-[hsl(225,40%,5%)] p-2 shadow-xl border border-gray-200 dark:border-gray-800 rounded-b-xl max-h-[70vh] overflow-y-auto'>
                            {articles.map(article => (
                                <li key={article.id || article.title}>
                                    <SearchArticleItem article={article} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className='bg-white dark:bg-[hsl(225,40%,5%)] p-4 px-8 shadow-lg border border-gray-200 dark:border-gray-800 rounded-b-xl'>
                            <p className='text-lg font-medium'>No articles found</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
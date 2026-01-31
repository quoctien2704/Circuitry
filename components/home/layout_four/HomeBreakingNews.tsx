import { getArticleAsCustomBlog } from "@/data/articles/articles"
import { getAuthorByID } from "@/data/authors/authors"
import { homeLayoutFourData } from "@/data/sitedata"
import { ArticleData } from "@/types/item"
import Image from 'next/image'
import Link from "next/link"
export function HomeBreakingNews() {

    /**
     * This articles object stores resolved article data. 
     * We use this approach because raw article information is not directly accessible from the "Main Data" source. 
     * Instead, it must be mapped through the getArticleByID() function. 
     * For multiple entries, 
     * getArticleAsCustomBlog takes an array of numeric IDs (e.g., [1, 2, 3, 4]) and returns the corresponding blog data.
     */

    const columns = {
        column_1: {
            articles: getArticleAsCustomBlog(homeLayoutFourData.news.article_matrix[0]),
        },
        column_2: {
            articles: getArticleAsCustomBlog(homeLayoutFourData.news.article_matrix[1]),
        },
        column_3: {
            articles: getArticleAsCustomBlog(homeLayoutFourData.news.article_matrix[2]),
        },
        column_4: {
            articles: getArticleAsCustomBlog(homeLayoutFourData.news.article_matrix[3]),
        },
    }
    return (
        <section className='my-40 max-md:my-25'>
            <div className="container mx-auto px-4">
                <h2 className="text-5xl md:text-center max-md:text-3xl mb-20 max-md:mb-5 font-medium italic font-serif">{homeLayoutFourData.news.title || "No title available"}</h2>
                <div className="
                    grid grid-cols-[1fr_2fr_1fr_1fr] gap-10
                    max-lg:grid-cols-2 
                    max-sm:grid-cols-1 max-xl:gap-10
                ">
                    <div className="flex flex-col gap-10 justify-between">
                        {columns.column_1.articles[0] &&
                            <HomeBreakingNewsArticleStyleOne article={columns.column_1.articles[0]} />
                        }
                        {columns.column_1.articles[1] &&
                            <div className="pt-10 border-t-2 border-gray-300 dark:border-gray-600">
                                <HomeBreakingNewsArticleStyleTwo article={columns.column_1.articles[1]} />
                            </div>
                        }
                    </div>
                    <div className="grid grid-cols-1">
                        {columns.column_2.articles[0] &&
                            <HomeBreakingNewsArticleStyleThree article={columns.column_2.articles[0]} />
                        }

                    </div>
                    <div className="grid grid-cols-1 gap-10">
                        {columns.column_3.articles.length > 0 && columns.column_3.articles.map((article, index) => (
                            <div className={`flex flex-col gap-4 h-full ${index === 1 ? 'border-t-2 border-gray-300 pt-10 dark:border-gray-600' : ''}`} key={index}>
                                <HomeBreakingNewsArticleStyleFour article={article} />
                            </div>
                        ))
                        }
                    </div>
                    <div className="grid grid-cols-1 gap-10">
                        {columns.column_4.articles[0] &&
                            <HomeBreakingNewsArticleStyleTwo article={columns.column_4.articles[0]} />
                        }
                        {columns.column_4.articles[1] &&
                            <HomeBreakingNewsArticleStyleFive article={columns.column_4.articles[1]} />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export const HomeBreakingNewsArticleStyleOne = ({ article }: { article: ArticleData }) => {

    /**
     * This component renders a breaking news article in a specific style.
     * It displays the article's published date, title, content, and author information.
     * @param {ArticleData} article - The article data to be displayed.
     */

    return (
        <div className="flex flex-col gap-4">
            <span className="text-gray-600 dark:text-gray-300">{article.published_at || 'No published date available'}</span>
            <Link aria-label={`Click this to go to ${article.title || 'No title available'} page`} href={`/article/${article.id || ''}`} className="text-3xl max-xl:text-xl font-medium italic font-serif hover:text-primary">{article.title || 'No title available'}</Link>
            <p className="line-clamp-3 text-gray-600 dark:text-gray-300 max-xl:text-base">{article.content || 'No content available'}</p>
            <p className="line-clamp-2 text-gray-600 dark:text-gray-300 max-xl:text-base">{article.maincontent[0].content || 'No main content available'}</p>
            <div className="mt-auto">
                <HomeBreakingNewsAuthor author_id={article.author_id} />
            </div>
        </div>
    )
}

export const HomeBreakingNewsArticleStyleTwo = ({ article }: { article: ArticleData }) => {

    /**
     * This component renders a breaking news article in an alternative style.
     * It displays the article's title and content.
     * @param {ArticleData} article - The article data to be displayed.
     */

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                <Link aria-label={`Click this to go to ${article.title || 'No title available'} page`} href={`/article/${article.id || ''}`} className="text-3xl font-medium italic font-serif hover:text-primary max-xl:text-xl">{article.title || 'No title available'}</Link>
                <p className="line-clamp-3 text-gray-600 dark:text-gray-300 max-xl:text-base">{article.content || 'No content available'}</p>
            </div>
        </div>
    )
}

export const HomeBreakingNewsArticleStyleThree = ({ article }: { article: ArticleData }) => {

    /**
     * This component renders a breaking news article in a third style.
     * It displays the article image, title, published date, content, and author information.
     * @param {ArticleData} article - The article data to be displayed.
     */

    return (
        <div className="flex flex-col gap-2 h-full">
            <Link aria-label={`Click this image to go to ${article.title || 'No title available'} page`} href={`/article/${article.id || ''}`} className="flex-6 overflow-hidden rounded-xl group">
                <Image
                    className="aspect-3/2 w-full h-auto object-cover flex-2 rounded-xl group-hover:scale-110 transition-scale duration-300"
                    loading="lazy"
                    src={article.image_src || '/empty_image.webp'}
                    alt={article.title || 'No title available'}
                    width={600}
                    height={400}
                />
            </Link>
            <div className="flex-4 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Link aria-label={`Click this category to go to ${article.category} page`} href={`/category/${article.category}`} className="hover:text-primary text-gray-600 dark:text-gray-300 mt-4">{article.category}</Link>
                    <span className="text-gray-600 dark:text-gray-300 mt-4 max-xl:text-base">{article.published_at}</span>
                </div>
                <Link aria-label={`Click this to go to ${article.title || 'No title available'} page`} href={`/article/${article.id || ''}`} className="text-3xl font-medium italic font-serif hover:text-primary max-xl:text-xl">{article.title || 'No title available'}</Link>
                <p className="text-gray-600 dark:text-gray-300 max-xl:text-base">{article.content || 'No content available'}</p>
                <div className="mt-auto">
                    <HomeBreakingNewsAuthor author_id={article.author_id} />
                </div>
            </div>
        </div>

    )
}

export const HomeBreakingNewsArticleStyleFour = ({ article }: { article: ArticleData }) => {

    /**
     * This component renders a breaking news article in a fourth style.
     * It displays the article image, title, and author information.
     * @param {ArticleData} article - The article data to be displayed.
     */

    return (
        <>
            <Link aria-label={`Click this image to go to ${article.title} page`} href={`/article/${article.id}`} className="flex-1 overflow-hidden rounded-xl group">
                <Image
                    className=" w-full h-auto object-cover flex-2 rounded-xl group-hover:scale-110 transition-scale duration-300"
                    loading="lazy"
                    src={article.image_src || '/empty_image.webp'}
                    alt={article.title || 'No alt available'}
                    width={600}
                    height={400}
                />
            </Link>
            <Link aria-label={`Click this category to go to ${article.title} page`} href={`/article/${article.id}`} className="text-3xl font-medium italic font-serif hover:text-primary max-xl:text-xl">{article.title}</Link>
            <div className="flex gap-2 mt-auto max-xl:text-sm">
                Author:{" "}<Link className="hover:text-primary" href={`/author/${article.author_id}`}>{article.author}</Link>
            </div>
        </>
    )
}

export const HomeBreakingNewsArticleStyleFive = ({ article }: { article: ArticleData }) => {

    /**
     * This component renders a breaking news article in a fifth style.
     * It displays the article image, category, title, content, and author information.
     * @param {ArticleData} article - The article data to be displayed.
     */

    return (
        <div className="flex flex-col gap-2 h-full border-t-2 border-gray-300 dark:border-gray-600 pt-10">
            <Link aria-label={`Click this image to go to ${article.title} page`} href={`/article/${article.id}`} className="flex-6 overflow-hidden rounded-xl group">
                <Image
                    className="w-full h-auto object-cover flex-2 rounded-xl group-hover:scale-110 transition-scale duration-300"
                    loading="lazy"
                    src={article.image_src || '/empty_image.webp'}
                    alt={article.title || "No title available"}
                    width={600}
                    height={400}
                />
            </Link>
            <div className="flex-4 flex flex-col gap-2">
                <span className="text-gray-600 dark:text-gray-300">{article.category}</span>
                <h2 className="text-3xl font-medium italic font-serif max-xl:text-xl">{article.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 max-xl:text-base">{article.content}</p>
                <div className="mt-auto">
                    <HomeBreakingNewsAuthor author_id={article.author_id} />
                </div>
            </div>
        </div>
    )
}

export const HomeBreakingNewsAuthor = ({ author_id }: { author_id: number }) => {
    const author = getAuthorByID(author_id)
    if (!author) return null;
    return (
        <Link aria-label={`Click this author to go to ${author.name} page`} href={`/author/${author_id}`} className="flex items-center gap-4 mt-4 group">
            <Image
                className="rounded-full aspect-square group-hover:scale-110 transition-scale duration-300"
                loading="lazy"
                src={author.avatar || '/empty_image.webp'}
                alt={author.name || 'No alt available'}
                width={50}
                height={50}
            />
            <div className="flex flex-col">
                <span className="font-bold group-hover:text-primary">{author.name}</span>
                <span className="text-gray-600 dark:text-gray-300">{author.role}</span>
            </div>
        </Link>
    )
}

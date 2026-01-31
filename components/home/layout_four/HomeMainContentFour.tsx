import { getArticleAsCustomBlog, getArticleByID } from "@/data/articles/articles"
import { homeLayoutFourData } from "@/data/sitedata"
import { ArticleData } from "@/types/item";
import Image from 'next/image';
import Link from "next/link";
export function HomeMainContentFour() {

    /**
     * This articles object stores resolved article data. 
     * We use this approach because raw article information is not directly accessible from the "Main Data" source. 
     * Instead, it must be mapped through the getArticleByID() function. 
     * For multiple entries, 
     * getArticleAsCustomBlog takes an array of numeric IDs (e.g., [1, 2, 3, 4]) and returns the corresponding blog data.
     * @param {number} {left_article}{right_top_left_article}{right_bottom_article} - Article ID for the left section
     * @param {number[]} right_top_right_articles - Array of article IDs for the right section
     */

    const articles = {
        left_article: getArticleByID(homeLayoutFourData.content.left),
        right_top_left_article: getArticleByID(homeLayoutFourData.content.right.top.left_article),
        right_top_right_articles: getArticleAsCustomBlog(homeLayoutFourData.content.right.top.right_articles),
        right_bottom_article: getArticleByID(homeLayoutFourData.content.right.bottom_article),
    }

    return (
        <section className='my-40 max-md:my-20'>
            <div className="container mx-auto px-4">
                <div className="
                    flex gap-10
                    max-xl:gap-4
                    max-lg:flex-col max-lg:gap-10
                    max-md:gap-4
                ">
                    <div className="flex-2">
                        <LeftArticle article={articles.left_article} />
                    </div>
                    <div className="
                        flex-3 flex flex-col gap-10
                        max-xl:gap-4
                        max-lg:gap-10
                    ">
                        <h2 className="text-5xl font-medium italic font-serif">{homeLayoutFourData.content.right.title || "No title available"}</h2>
                        <div className="
                            flex gap-10 flex-2
                            max-xl:gap-4
                            max-lg:gap-10
                            max-sm:flex-col
                        
                        ">
                            <div className="flex-1">
                                <RightTopLeftArticle article={articles.right_top_left_article} />
                            </div>
                            <div className="flex-1">
                                <RightTopRightBlog articles={articles.right_top_right_articles} />
                            </div>
                        </div>
                        <RightBottomArticle article={articles.right_bottom_article} />

                    </div>
                </div>
            </div>
        </section>
    )
}

export const LeftArticle = ({ article }: { article: ArticleData }) => {

    /**
     * This component renders the left article section. 
     * It displays the article image, title, and a "Read More" button.
     * @param {ArticleData} article - The article data to be displayed.
     */

    return (
        <div className="lg:h-[75%] overflow-hidden rounded-xl relative">
            <GetImageFromArticle article={article} width={1500} height={3000} />
            <div className="absolute left-0 top-0 w-full h-full bg-black opacity-30 pointer-events-none"></div>
            <div className="absolute right-0 w-full bottom-0 flex flex-col items-end gap-10">
                <h3 className="text-white text-end text-3xl font-bold mr-4">{article.title || "No title available"}</h3>
                <Link aria-label={`Click this to go to ${article.title || "Demo"} Page`} href={`article/${article.id}`}>
                    <button className="
                    bg-white dark:bg-[rgb(8,10,18)] w-fit text-xl px-10 py-4 font-medium ml-auto rounded-tl-xl border-transparent border-t-2 border-l-2
                    hover:bg-[rgba(255,255,255,0.2)] dark:hover:bg-[rgba(0,0,0,0.6)] hover:border-white dark:hover:border-[rgb(8,10,18)] hover:text-white text-shadow-2xs transition-all duration-300 cursor-pointer
                ">
                        Read More
                    </button>
                </Link>
            </div>
        </div>
    )
}

export const RightTopLeftArticle = ({ article }: { article: ArticleData }) => {

    /**
            * This component renders the right top left article section.
            * It displays the article image, title, and publication date.
            * @param {ArticleData} article - The article data to be displayed.
            */

    return (
        <div className="
            flex flex-col gap-4
            max-xl:gap-2
            max-lg:gap-4
            max-md:gap-4
        ">
            <div className=" flex-1 h-full overflow-hidden rounded-xl">
                <GetImageFromArticle article={article} width={1000} height={1000} />
            </div>
            <h3 className="text-xl font-medium">{article.title || "No title available"}</h3>
            <span className="text-gray-600 dark:text-gray-300">{article.published_at || "No Published Date available"}</span>
        </div>
    )
}

export const RightTopRightBlog = ({ articles }: { articles: ArticleData[] }) => {

    /*
            * This component renders a grid of articles on the right top section.
            * Each article is displayed with its image, title, and publication date.
            * @param {ArticleData[]} articles - An array of article data to be displayed in the grid.
            */

    const RightTopRightArticle = ({ article }: { article: ArticleData }) => {

        /*
            * This sub-component renders an individual article within the RightTopRightBlog section.
            * @param {ArticleData} article - The article data to be displayed.
            */

        return (
            <>
                <div className="aspect-square h-full">
                    <div className="overflow-hidden h-full rounded-xl">
                        <GetImageFromArticle article={article} width={100} height={100} />
                    </div>
                </div>
                <div className="flex flex-col justify-between py-2">
                    <h3 className="xl:text-xl font-medium">{article.title || "No title available"}</h3>
                    <span className="text-gray-600 dark:text-gray-300">{article.published_at || "No Published Date available"}</span>
                </div>
            </>
        )
    }

    return (
        <div className="
            grid grid-rows-4 gap-10 h-full
            max-xl:gap-4
            max-lg:gap-10
            max-md:gap-4
        ">
            {
                articles.slice(0, 4).map((article, index) => (
                    <div key={index} className="
                        flex gap-10
                        max-xl:gap-4
                        max-lg:gap-10
                        max-md:gap-4
                    ">
                        <RightTopRightArticle article={article} />
                    </div>
                ))
            }
        </div>

    )
}


export const RightBottomArticle = ({ article }: { article: ArticleData }) => {

    /**
            * This component renders the right bottom article section.
            * It displays the article image along with a category link.
            * @param {ArticleData} article - The article data to be displayed.
            */

    return (
        <div className="flex-1 max-h-100 overflow-hidden rounded-xl relative">
            <GetImageFromArticle article={article} width={1000} height={500} />
            <div className="absolute left-0 top-0 w-full h-full bg-black opacity-30 pointer-events-none"></div>
            <Link aria-label={`Click this to go to ${article.title || "Demo"} Page`} href={`/category/${article.category || ""}`}>
                <button className="absolute right-4 top-4 text-white border-2 border-white px-6 py-2 uppercase hover:bg-white hover:text-black font-bold cursor-pointer">
                    {article.category || "No category available"}
                </button>
            </Link>
        </div>
    )
}



export const GetImageFromArticle = ({ article, width, height }: { article: ArticleData, width: number, height: number }) => {

    /**
            * This component retrieves and displays the image associated with an article.
            * @param {ArticleData} article - The article data containing the image source.
            * @param {number} width - The width of the image.
            * @param {number} height - The height of the image.
            */

    return (
        <Link aria-label={`Click this to go to ${article.title || "Demo"} Page`} href={`article/${article.id}`} className="group">
            <Image
                loading="lazy"
                src={article.image_src || '/empty_image.webp'}
                alt={article.title || 'No alt available'}
                width={width}
                height={height}
                className="w-full h-full object-cover group-hover:scale-110 transition-scale duration-300 rounded-xl"
            />
        </Link>
    )
}
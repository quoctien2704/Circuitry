import type { Metadata } from "next";

export async function generateMetadata(
    { params }: { params: { id: string } }
): Promise<Metadata> {
    const { id } = await params;
    const articleId = Number(id);

    if (Number.isNaN(articleId)) {
        return { title: "Article Not Found", robots: { index: false } };
    }

    const article = getArticleByID(articleId);
    if (!article) {
        return { title: "Article Not Found", robots: { index: false } };
    }

    return {
        title: article.title,
        description: article.excerpt ?? article.maincontent[0]?.content,

        alternates: {
            canonical: `/article/${article.id}`
        },

        openGraph: {
            type: "article",
            title: article.title,
            description: article.excerpt,
            images: [
                {
                    url: article.image_src,
                    width: 1200,
                    height: 630,
                    alt: article.title
                }
            ]
        },

        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
            images: [article.image_src]
        },

        robots: {
            index: true,
            follow: true
        }
    };
}


import { BreadCrumbSecond } from "@/components/breadcrumb/breadcrumb";
import { ScrollToTop } from "@/components/Interactive/ScrollToTop";
import { articlesData, getArticleByID } from "@/data/articles/articles";
import { ArticleData, BreadCrumbData } from "@/types/item";
import { notFound } from "next/navigation";
import { AuthorData } from "@/types/item";
import { authorsData, getAuthorByID } from "@/data/authors/authors";
import Image from 'next/image'
import Link from "next/link";
import { getReadingTime } from "@/utils/helper";
import { PrimaryButton } from "@/components/button/primaryButton";
export default async function Article({ params }: { params: { id: number } }) {
    const { id } = await params;
    const articleId = Number(id);

    if (Number.isNaN(articleId)) notFound();

    const article: ArticleData | undefined = getArticleByID(articleId);
    if (!article || article.id === -1) notFound();

    const author: AuthorData | undefined = getAuthorByID(article.author_id);
    const prevArticle = getArticleByID(articleId - 1) && getArticleByID(articleId - 1).id !== -1;
    const nextArticle = getArticleByID(articleId + 1) && getArticleByID(articleId + 1).id !== -1;
    const breadCrumbData: BreadCrumbData = [
        { title: "Home", href: "/" },
        { title: "Blog", href: "/blog" },
        { title: article.author as string, href: `/author/${article.author_id}` as string },
        { title: article.title as string, href: `/article/${article.id}` as string }
    ]
    const readingMinutes = getReadingTime(article.content);
    return (
        <>
            <ScrollToTop />
            <section className="mt-29.5 lg:mb-19.5 min-h-[80vh] relative">
                <BreadCrumbSecond data={breadCrumbData} />
                <div className="container mx-auto px-4">
                    <div className="
                        my-20 max-lg:my-10 flex
                        max-lg:flex-col
                    ">
                        <div className="flex-2 lg:pr-10">
                            <div className="flex flex-col gap-10 max-lg:gap-4">
                                <h2 className="
                                    text-5xl  font-medium font-serif
                                    max-lg:text-2xl
                                ">
                                    {article.title}
                                </h2>
                                <div className="
                                    flex gap-4 items-end justify-between
                                    max-lg:flex-col max-lg:items-start
                                ">
                                    {author && (
                                        <div className="flex gap-10 max-lg:gap-4">
                                            <Link href={`/author/${author.id}`}>
                                                <div className="overflow-hidden rounded-full hover:-translate-y-3 transition-all duration-300">
                                                    <Image
                                                        className="aspect-square"
                                                        src={author.avatar || '/empty_image.webp'}
                                                        alt={author.name}
                                                        width={96}
                                                        height={96}
                                                    />
                                                </div>
                                            </Link>
                                            <div className="flex-1 flex flex-col items-start justify-center">
                                                <strong className="text-xl">{author.name}</strong>
                                                <h3 className="text-lg text-gray-600 dark:text-gray-300">{author.role}</h3>
                                            </div>
                                        </div>
                                    )}
                                    <time className="text-lg text-gray-600 dark:text-gray-300 font-medium text-right flex gap-2">
                                        <span>{readingMinutes} min read</span>
                                        <span>|</span>
                                        <span>{article.published_at}</span>
                                    </time>
                                </div>
                                <div className="overflow-hidden rounded-4xl flex items-center justify-center">
                                    <Image
                                        className="aspect-4/2 w-full hover:scale-110 transition-scale duration-300"
                                        src={article.image_src}
                                        alt={article.title}
                                        width={1200}
                                        height={600}
                                    />
                                </div>
                                {article.maincontent.length > 0 && (
                                    <ul className="flex flex-col gap-10 max-lg:gap-4">
                                        {article.maincontent.map(main_content => (
                                            <li className="flex flex-col gap-4" key={main_content.title}>
                                                <h4 className="text-3xl font-medium font-serif">{main_content.title}</h4>
                                                <p className="text-gray-600 dark:text-gray-300">{main_content.content}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="
                                    flex  gap-4 justify-between 
                                    max-lg:hidden
                                ">
                                    {prevArticle &&
                                        <Link href={`/article/${articleId - 1}`}>
                                            <PrimaryButton content="Prev" />
                                        </Link>
                                    }
                                    {nextArticle &&
                                        <Link href={`/article/${articleId + 1}`} className="ml-auto">
                                            <PrimaryButton content="Next" />
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="lg:p-4 lg:sticky lg:h-[90vh] lg:top-19.5 lg:z-12 w-full">
                                <div className="flex flex-col gap-10 h-full max-lg:gap-4">
                                    <div className="flex gap-2 flex-wrap items-center">
                                        <h3 className="text-l font-bold font-serif">Tags: </h3>
                                        {article.tags.length > 0 && (
                                            <ul className="flex gap-2">
                                                {article.tags.map(tag => (
                                                    <li className="text-lg font-medium font-serif text-gray-600 dark:text-gray-300 hover:text-primary cursor-pointer" key={tag}>
                                                        <Link href={`/blog?tags=${tag}`}>
                                                            {tag}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col gap-4">
                                        <h3 className="text-l font-bold font-serif">Articles: </h3>
                                        {articlesData.length > 0 && (
                                            <ul className="flex flex-col gap-10 max-lg:gap-4">
                                                {articlesData.filter(article => article.id != id).slice(0, 2).map(article => (
                                                    <li key={article.title}>
                                                        <div className="flex flex-col gap-4 group">
                                                            <Link href={`/article/${article.id}`}>
                                                                <div className="rounded-xl overflow-hidden">
                                                                    <Image
                                                                        className="w-full group-hover:scale-110 transition-scale duration-300"
                                                                        src={article.image_src}
                                                                        alt={article.title}
                                                                        width={320}
                                                                        height={320}
                                                                    />
                                                                </div>
                                                            </Link>
                                                            <div className="flex flex-wrap justify-between items-start lg:gap-4 max-lg:flex-col">
                                                                <Link href={`/author/${article.author_id}`}>
                                                                    <h4 className="
                                                                        font-medium text-lg hover:text-primary
                                                                        max-lg:text-base
                                                                    ">
                                                                        {article.author}
                                                                    </h4>
                                                                </Link>
                                                                <time className="
                                                                    font-medium text-lg text-gray-600
                                                                    max-lg:text-base
                                                                ">
                                                                    {article.published_at}
                                                                </time>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="flex gap-2 flex-wrap items-end">
                                        <h3 className="text-l font-bold font-serif">Author:</h3>
                                        {authorsData.length > 0 && (
                                            <ul className="flex gap-2">
                                                {authorsData.filter(author => author.id !== article.author_id).map(author => (
                                                    <li key={author.name}>
                                                        <Link href={`/author/${author.id}`} className="group">
                                                            <div className="overflow-hidden rounded-full transition-all hover:-translate-y-1" title={author.name}>
                                                                <Image
                                                                    className="aspect-square"
                                                                    src={author.avatar}
                                                                    alt={author.name}
                                                                    width={48}
                                                                    height={48}
                                                                />
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="
                                        flex gap-4
                                        lg:hidden lg:justify-between 
                                    ">
                                        {prevArticle &&
                                            <Link href={`/article/${articleId - 1}`}>
                                                <PrimaryButton content="Prev" />
                                            </Link>
                                        }
                                        {nextArticle &&
                                            <Link href={`/article/${articleId + 1}`} className="ml-auto">
                                                <PrimaryButton content="Next" />
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
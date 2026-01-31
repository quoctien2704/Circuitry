import { ArticleData } from '@/types/item'
import rawArticle from './articles.json'
import { getBlogByID } from '../blogs/blogs';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const articlesData = rawArticle.slice(1, rawArticle.length) satisfies ArticleData[]

export const getArticleByID = (id: number): ArticleData => {
    return articlesData.find((article) => article.id == id) || rawArticle[0];

}
export const getArticleByAuthorID = (id: number): ArticleData[] => {
    return articlesData.filter((article) => article.author_id == id) || [];

}

export const countAuthorsByCategory = (category: string): number => {
    return articlesData.filter(article => article.category.toLowerCase() === category.toLowerCase()).length;
}

export const getArticleBySearchContent = (content: string): ArticleData[] => {
    if (!content) return [];
    return articlesData.filter((article) => article.title.toLowerCase().indexOf(content.toLowerCase()) > -1)
}

export const FilterForArticle = (articles: ArticleData[], filter?: ReadonlyURLSearchParams): ArticleData[] => {
    if (!filter) return articles;
    let result: ArticleData[] = articles;
    const query = filter.get('query') || ''
    const slug = filter.get('slug') || ''
    const tags = filter.get('tags') || ''

    if (query !== '') result = result.filter((article) => article.title.toLowerCase().indexOf(query.toLowerCase()) > -1)
    if (tags !== '') result = result.filter((article) => article.tags.includes(tags));
    if (slug !== '') result = result.filter((article) => article.slug.indexOf(slug) > -1);

    return result
}

export const getArticleAsCustomBlog = (ids: number[]): ArticleData[] => {
    if (!ids) return articlesData
    return articlesData.filter((article) => ids.includes(article.id))
}
export const getArticleByBlogID = (id?: number): ArticleData[] => {
    if (!id) return articlesData
    return articlesData.filter((article) => getBlogByID(id)?.articles.includes(article.id))
}

export const getArticleByBlogCategory = (category?: string): ArticleData[] => {
    if (!category) return articlesData
    return articlesData.filter((article) => article.category.toLowerCase() === category.toLowerCase())
}
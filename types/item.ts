import { ImageData } from ".";

export type ArticleData = {
    id: number;
    title: string,
    slug: string,
    excerpt: string,
    content: string;
    image_src: string;
    author: string;
    author_id: number;
    published_at: string;
    category: string;
    tags: string[]
    maincontent: {
        title: string;
        content: string;
    }[]
}
export type CategoryData = {
    id: number;
    name: string
    image: ImageData;
    link: string;
}

export type BlogData = {
    id: number
    name: string;
    link: string
    articles: number[];
}

export type CommentData = {
    id: number
    article_id: number
    author_id: number
    content: string
    created_at: string
    parent_id?: number | null
    likes?: number
    status?: "approved" | "pending"
}

export type AuthorData = {
    id: number;
    name: string;
    slug: string;
    role: string;
    bio: string;
    avatar: string;
    socials: {
        twitter?: string;
        linkedin?: string;
        website?: string;
    }
}


export type BreadCrumbData = {
    title: string;
    href: string;
}[]
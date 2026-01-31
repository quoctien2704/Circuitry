import rawBlogs from './blogs.json'
import { BlogData } from '@/types/item'

const blogData = rawBlogs satisfies BlogData[];

export const getBlogByID = (id: number): BlogData | undefined => {
    return blogData.find((blog) => blog.id === Number(id))
}

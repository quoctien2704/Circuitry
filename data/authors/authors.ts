import { AuthorData } from '@/types/item'
import rawAuthors from './authors.json'

export const authorsData = rawAuthors satisfies AuthorData[]

export const getAuthorByID = (id: number): AuthorData | undefined => {
    const author = authorsData.find((author) => author.id == id)
    if (!author) return undefined
    return author;
}

export const getAuthorsByIDArray = (ids: number[]): AuthorData[] => {
    return authorsData.filter((author) => ids.includes(author.id))
}
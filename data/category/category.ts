import rawCategoryData from './category.json'
import { CategoryData } from '@/types/item'

export const categoriesData = rawCategoryData satisfies CategoryData[]

export const getCategoryByID = (id: number): CategoryData | undefined => {
    return categoriesData.find(category => category.id === id);
}
export const getCategoryByName = (name: string): CategoryData | undefined => {
    return categoriesData.find(category => category.name === name);
}
export const getCategoryByArrayID = (id: number[]): CategoryData[] => {
    return categoriesData.filter(category => id.includes(category.id));
}
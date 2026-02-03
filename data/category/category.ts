import rawCategoryData from './category.json'
import { CategoryData } from '@/types/item'
export const categoriesData = rawCategoryData satisfies CategoryData[];

const categoryMap = new Map(categoriesData.map(cat => [cat.id, cat]));

export const getCategoryByID = (id: number): CategoryData | undefined => {
    return categoriesData.find(category => category.id === id);
}

export const getCategoryByName = (name: string): CategoryData | undefined => {
    return categoriesData.find(category => category.name === name);
}

export const getCategoryByArrayID = (ids: number[]): CategoryData[] => {
    return ids
        .map(id => getCategoryByID(id))
        .filter((category): category is CategoryData => !!category);
}

import rawImages from './images.json'

export interface globalImagesType {
    [key: string]: {
        [key: string]: string
    }
}

export const globalImages: globalImagesType = rawImages;
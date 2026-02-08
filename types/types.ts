export interface FieldBaseText {
    type: string
    data: string;
}

export interface FieldTextData extends FieldBaseText {
    type: "text",
}

export interface FieldNumberData {
    type: "number",
    data: string
}

export interface FieldNumberData {
    type: "number",
    data: string
}

export interface FieldDefaultSoftData {
    type: "unspecified",
    data: any
}

export interface FieldArticlesData {
    type: "articles"
    data: number[];
}

export type InterferenceSoftData = FieldTextData | FieldNumberData | FieldDefaultSoftData
export type InterferenceHardData = FieldArticlesData
export interface fieldSiteData {
    [key:string]: InterferenceSoftData | InterferenceHardData
}

export interface layoutSiteData {
    [key:string]:fieldSiteData
}
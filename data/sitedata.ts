import {
    AboutData,
    AuthorData,
    BlogPageData,
    CategoryData,
    ChangeLogPageData,
    FooterData, GlobalArticleListData, HeaderData,
    HomeLayoutFourData,
    HomeLayoutOneData,
    HomeLayoutThreeData,
    HomeLayoutTwoData,
    MembershipData,
    siteDataType,
    TermsData
} from '@/types'

import rawSiteData from './sitedata.json'


export const globalSiteData = rawSiteData satisfies siteDataType

// Global Layout Data
export const headerData = rawSiteData.header satisfies HeaderData;
export const footerData = rawSiteData.footer satisfies FooterData;

// Global Component Data
export const globalArticleData = rawSiteData.global_articles satisfies GlobalArticleListData

// Home page data
export const homeData = rawSiteData.home.layout_1 satisfies HomeLayoutOneData
export const homeLayoutTwoData = rawSiteData.home.layout_2 satisfies HomeLayoutTwoData
export const homeLayoutThreeData = rawSiteData.home.layout_3 satisfies HomeLayoutThreeData
export const homeLayoutFourData = rawSiteData.home.layout_4 satisfies HomeLayoutFourData

// About page data
export const aboutData = rawSiteData.about satisfies AboutData

// Membership page Data
export const membershipData = rawSiteData.membership satisfies MembershipData

// Terms page data
export const termsData = rawSiteData.terms satisfies TermsData

// Category page data
export const categoryData = rawSiteData.category satisfies CategoryData

// Author page data
export const authorData = rawSiteData.author satisfies AuthorData

// Blog page data
export const blogData = rawSiteData.blog satisfies BlogPageData

// Changelog page data
export const changelogData = rawSiteData.changelog satisfies ChangeLogPageData
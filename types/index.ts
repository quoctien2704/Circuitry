import { BlogData, BreadCrumbData } from "./item";
import { NavLinks } from "./menu"

export type LinksData = {
    name: string,
    href: string
}

export type HeaderData = {
    header_text: string;
    header_logo_src?: string; //SVG
    header_url: string;
    nav_links: NavLinks[];
}

export type SocialLinksData = {
    readonly type: string | 'social'
    social_svg?: string;
    social_name: string;
    social_href: string;
}

export type FooterData = {
    footer_logo_src: string;
    footer_logo_text: string;
    footer_logo_url: string;
    footer_paragraph?: string;
    footer_social_links?: SocialLinksData[];
    footer_button_content?: string
    footer_column_links: {
        name: string
        href: string
        footer_column_list: LinksData[]
    }[]
    footer_copyRight: string;
    footer_term_links: LinksData[]
}

export type ImageData = {
    readonly type: string | 'image'
    src: string;
    alt: string;
    width: number;
    height: number;
}


// Home One

export type HomeSliderData = {
    home_layout_one_header_001: string;
    home_layout_one_sub_header_002?: string;
    home_layout_one_sub_header_href_003?: string;
    home_layout_one_bottom_left_sliders_article_data_004: number[];
    home_layout_one_top_right_item_title_005: string;
    home_layout_one_top_right_item_medium_title_006: string;
    home_layout_one_top_right_item_big_title_007: string;
    home_layout_one_top_right_item_link_text_008: string;
    home_layout_one_top_right_item_link_href_009: string;
    home_layout_one_bottom_right_image_010: ImageData;
    home_layout_one_bottom_right_button_content_011: string;
    home_layout_one_bottom_right_button_href_012: string;
}

export type HomeLatestNewData = {
    header: string;
    main_article: number,
    sub_articles: number[];
}

export type HomeCategoryData = {
    categories: number[];
}

export type HomeTrendingData = {
    header: string;
    articles: number[];
}

export type HomeSubscribeData = {
    header: string;
    sub_header: string;
    placeHolder: string;
    support_text: string;
}

export type HomeArticlesListData = {
    header: string;
    author_title: string;
    author_title_link: string;
    authors_id: number[];
    articles_id: number[];
    article_title: string;
    article_title_link: string;
}

// Home Two 


export type HomeSliderTwoData = {
    articles: number[];
}
export type HomeBlogTwoData = {
    title: string;
    sub_title: string;
    blog_id: number;
}

export type HomeBlogColumnTwoData = {
    big_articles_blog_id: number;
    grid_articles: number;
}

export type HomeBlogLatestTwoData = {
    main_blog_id: number;
    extra_articles_id: number[];
}

export type HomeBlogBannerTwoData = {
    left_top_article_id: number;
    left_bottom_article_id: number;
    left_right_article_id: number;
}


export type HomeSubscribeTwoData = {
    image: ImageData;
    title: string;
    content: string;
    placeHolder: string;
}

// Home Three
export type HomeHeroThreeData = {
    left: {
        sub_title: string;
        title: string;
        paragraph: string;
        primary_button_content: string;
        primary_button_href: string;
        secondary_button_content: string;
        secondary_button_href: string;
    }
    right: {
        image_container: ImageData
        content_container: {
            title: string;
            sub_title: string;
        }[]
    }

}
export type HomeFeaturedGridData = {
    sub_ttile: string;
    title: string;
    paragraph: string;
    articles_id: number[]
}
export type HomeVideoSectionData = {
    big_title: string;
    medium_title: string;
    small_title: string;
    button_cotent: string;
    button_href: string;
    video_src: {
        title: string;
        src: string
    }

}
export type HomeGalleryData = {
    title: {
        top: string;
        mid: string;
        bottom: string;
    }
    articles: number[];
}
export type HomeSubscribeThreeData = {
    left: {
        image: ImageData
    }
    right: {
        span: {
            text: string;
            highlight_text: string;
        }
        title: string;
        form_placeholder: string;
        form_button_content: string;
        paragraph: string;
    }
}

// Home Four
export type HomeBreakingNewsData = {
    title: string;
    article_matrix: number[][];
}
export type HomeMainContentFourData = {
    left: number;
    right: {
        title: string;
        top: {
            left_article: number;
            right_articles: number[];
        }
        bottom_article: number;
    }
}

export type HomePromoBannerItemData = {
    image: ImageData;
    title: string;
    paragraph: string;
    button_content: string;
    button_href: string;
}
export type HomePromoBannerData = {
    banners: HomePromoBannerItemData[];
}
export type HomePopularCategoryData = {
    sub_title: string;
    title: string;
    left_title_category: string;
    blog_id: number;
}
export type HomeNewsletterBoxData = {
    title: string;
    paragraph: string;
    contents: {
        svg: SocialLinksData
        content: string;
    }[];
    form_title: string;
    form_placeholder: string;
    form_button_content: string;
}

// Big Data
export type HomeLayoutOneData = {
    slider: HomeSliderData;
    category: HomeCategoryData;
    latest: HomeLatestNewData;
    trend: HomeTrendingData;
    subscribe: HomeSubscribeData;
}

export type HomeLayoutTwoData = {
    slider: HomeSliderTwoData;
    blog: HomeBlogTwoData;
    column: HomeBlogColumnTwoData;
    latest: HomeBlogLatestTwoData;
    banner: HomeBlogBannerTwoData;
    subscribe: HomeSubscribeTwoData;
}

export type HomeLayoutThreeData = {
    hero: HomeHeroThreeData;
    feature: HomeFeaturedGridData;
    video: HomeVideoSectionData;
    gallery: HomeGalleryData;
    subscribe: HomeSubscribeThreeData;
}
export type HomeLayoutFourData = {
    news: HomeBreakingNewsData;
    content: HomeMainContentFourData
    promo: HomePromoBannerData;
    popular: HomePopularCategoryData;
    letter: HomeNewsletterBoxData;
}

export interface HomeData{
    layout_1: HomeLayoutOneData,
    layout_2: HomeLayoutTwoData,
    layout_3: HomeLayoutThreeData,
    layout_4: HomeLayoutFourData
}

export interface siteDataType {
    header: HeaderData,
    global_articles: GlobalArticleListData,
    home: HomeData,
    about: AboutData,
    membership: MembershipData,
    terms: TermsData,
    category: CategoryData
    author: AuthorData
    blog: BlogPageData
    footer: FooterData,
    changelog: ChangeLogPageData
}

export type GlobalArticleListData = HomeArticlesListData;



// About

export type AboutTopContentData = {
    sub_title: string;
    sub_title_href: string;
    title: string;
}

export type AboutColumnContentData = {
    sub_title: string;
    sub_title_href: string;
    paragraph: string;
    image: ImageData
}


export type AboutIntroduceData = {
    title: string
    sub_title: string;
    image: ImageData
}

export type AboutContactData = {
    title: string
    sub_title: string;
    contacts: {
        svg_data: SocialLinksData
        contact_title: string;
        contact_paragraph: string;
    }[]
}

export type AboutStoryData = {
    title: string;
    paragraph: string;
    button_content: string;
    button_href: string;
    image: ImageData
}

export type AboutFullBannerData = {
    image: ImageData
    left_Title: string;
    right_multiple_content: string[];
}
export type AboutParameterContentData = {
    title: string;
    parameters: {
        parameter: string
        sub_content: string;
    }[]
}

export type AboutData = {
    top: AboutTopContentData
    contact: AboutContactData
    column: AboutColumnContentData
    introduce: AboutIntroduceData
    story: AboutStoryData
    full_banner: AboutFullBannerData
    parameter: AboutParameterContentData
}

// Membership

export type SaleItemData = {
    sv_icon: SocialLinksData
    sales_string: string;
    sales_paragraph: string;
    sales_title: string;
    sale_sub_title: string;
    sales_button_content: string;
}

export type MembershipTopContentData = {
    sub_title: string;
    header: string;
    paragraph: string;
    sub_paragraph: string;
}
export type MembershipSalesData = SaleItemData[];

export type MemberShipSliderItemData = {
    image: ImageData;
    slider_content: string;
    slider_href: string;
}
export type MembershipSliderData = {
    sliders: MemberShipSliderItemData[];
}

export type MembershipBenefitItemData = {
    image: ImageData;
    benefit_title: string;
    benefit_paragraph: string;
    benefit_category: string;
}
export type MembershipBenefitData = {
    title: string;
    content: string;
    button_content: string;
    button_href: string;
    benefitItems: MembershipBenefitItemData[];
}

export type MembershipData = {
    top: MembershipTopContentData,
    sales: MembershipSalesData,
    slider: MembershipSliderData
    benefit: MembershipBenefitData
}

// Term
export type TermsData = {
    breadcrumb: BreadCrumbData
    sub_title: string;
    title: string;
    terms_and_conditions: {
        title: string;
        content: string;
    }[]
}

// Tags

export type CategoryListData = {
    title: string;
    sub_title: string;
    sub_title_href: string;
}

export type CategoryData = {
    image: ImageData
    list: CategoryListData
    breadcrumb: BreadCrumbData
};

// Authors

export type AuthorListData = {
    title: string;
    sub_title: string;
    sub_title_href: string;
}

export type AuthorData = {
    image: ImageData
    list: CategoryListData
    breadcrumb: BreadCrumbData
};

// Blog

export type BlogPageData = {
    image: ImageData;
    list: {
        title: string;
    }
    breadcrumb: BreadCrumbData
}

// Changelog

export type ChangeLogSection = {
    title: string
    contents: string[]
}

export type ChangeLogVersion = {
    version: string
    date: string
    changes: ChangeLogSection[]
}

export type ChangeLogPageData = {
    title: string;
    breadcrumb: BreadCrumbData
    updates: ChangeLogVersion[]
}

export type EditorValue = ImageData | SocialLinksData;

export interface fieldSiteData {
    [key:string]: string | number | number[] | EditorValue
}
export interface layoutSiteData {
    [key:string]:fieldSiteData
}
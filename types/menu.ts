export type MenuPage =
    | {
        type: string
        items?: { name: string; href: string }[]
        data?: string
    }

export type NavLinks = {
    name: string;
    href?: string;
    menu_page?: MenuPage;
}
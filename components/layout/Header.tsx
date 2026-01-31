"use client"
import { theme } from "@/data/theme"
import { useEffect, useState } from "react"
import { headerData } from "@/data/sitedata"
import { DropDownMenu } from "../dropdown/DropDownMenu"
import { SearchBar } from "../Search/Search";
import { IoMdMenu } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import { ReactIcon } from "../Icon/ReactIcon"
import { usePathname } from "next/navigation"
import { DarkLightMode } from "../dark-light/DarkLightButton"
import Link from "next/link"

/**
 * Global Header Component.
 * Optimized for ThemeForest:
 * - Accessibility: ARIA roles for mobile navigation and interactive elements.
 * - Interaction: Automatic menu closure on route change via useEffect.
 * - UX: Sticky/Absolute positioning based on theme configuration.
 */

export default function Header() {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false)
    useEffect(() => {
        if (openMenu) {
            // Close mobile menu when route changes
            setOpenMenu(false);
        }

        // eslint-disable-next-line react/no-set-state-in-effect
    }, [pathname])

    return (
        <header className={`${theme.config.header_sticky ? "fixed" : "absolute"} top-0 w-screen z-15 border-b border-b-gray-200 bg-white dark:bg-[hsl(225,40%,5%)] dark:border-gray-800`}>

            <div className="relative container mx-auto px-4 lg:px-2">
                <div className="flex items-center justify-between gap-8 h-19.5">
                    <ul className={`
                        header_nav_links flex items-center justify-center gap-10 h-full 
                        max-lg:overflow-y-auto
                        ${!openMenu ? "max-lg:-left-70" : "max-lg:left-0"} max-lg:transtiion-left max-lg:duration-600 max-lg:border-r max-lg:border-r-gray-200 dark:max-lg:border-r-gray-800 max-lg:fixed max-lg:top-0 max-lg:flex-col max-xl:gap-6 max-lg:gap-4 max-lg:items-start max-lg:justify-start max-lg:bg-white dark:max-lg:bg-[hsl(225,40%,5%)] max-lg:z-20 max-lg:w-70 max-lg:p-10
                    `}>
                        <li className="mb-10 cursor-pointer lg:hidden" onClick={() => setOpenMenu(false)}>
                            <TfiClose size={30} />
                        </li>

                        {headerData.nav_links.length > 0 && headerData.nav_links.map((link) => (
                            <li
                                key={link.name}
                                className="
                                lg:h-full flex items-center group
                            ">

                                {/* -- Link -- */}
                                {link.href && (

                                    <Link className="group-hover:text-primary outline-none" href={link.href}>
                                        <span className="text-xl max-lg:text-left font-medium">{link.name}</span>
                                    </Link>
                                )}

                                {!link.href && (
                                    <DropDownMenu link={link} items={link.menu_page?.items || []} />
                                )}
                            </li>
                        ))}
                        <li className="mt-auto lg:hidden">
                            <SearchBar search_placeholder={headerData.searchbar_placeholder} />
                        </li>
                    </ul>
                    <div className="max-lg:hidden">
                        <SearchBar search_placeholder={headerData.searchbar_placeholder} />
                    </div>
                    <div className="flex gap-2 max-lg:gap-4">
                        <DarkLightMode />
                        <Link href={headerData.header_url} className="header_logo_title flex items-center justify-center gap-2 hover:text-primary">
                            {/* Header Logo */}
                            {headerData.header_logo_src &&
                                <ReactIcon name={headerData.header_logo_src} size={30} />
                            }

                            {/* Header Tiitle */}
                            <h2 className="text-3xl font-bold">
                                {headerData.header_text}
                            </h2>
                        </Link>

                    </div>
                    <div
                        className="lg:hidden cursor-pointer"
                        onClick={() => setOpenMenu(prev => !prev)}
                    >
                        {!openMenu ? <IoMdMenu size={28} /> : <TfiClose size={24} />}
                    </div>
                </div>
            </div>
        </header>
    )
}
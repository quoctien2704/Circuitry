"use client"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa6";
import { NavLinks } from "@/types/menu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
type LinkData = {
    name: string,
    href: string
}

/**
 * DropDownMenu Component
 * Optimized for SEO (ARIA labels) and UX (Data Fallbacks).
 * Comments added for ThemeForest review standards.
 */
export function DropDownMenu({ items, link }: { items: LinkData[], link: NavLinks }) {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        if (openMenu) {
            // Close mobile menu when route changes
            setOpenMenu(false)
        }

        // eslint-disable-next-line react/no-set-state-in-effect
    }, [pathname])

    return (
        <button
            aria-haspopup="true"
            aria-expanded={openMenu} // UX: Synchronize expanded state with logic
            aria-label={`Open ${link.name || 'navigation'} menu`} // SEO: Accessible name
            style={link.menu_page?.type === 'dropdown' ? { position: "relative" } : undefined}
            className="outline-none h-full max-lg:flex max-lg:flex-col"
        >
            <span
                onClick={() => {
                    setOpenMenu(prev => !prev);
                }}
                className={`outline-none font-medium h-full text-xl flex items-center justify-start cursor-pointer gap-2 w-fit group-hover:text-primary ${openMenu ? "text-primary" : ""}`}
            >
                {/* Decorative icon hidden from Screen Readers for better SEO */}
                <FaArrowRight
                    size={12}
                    aria-hidden="true"
                    className={`transtion-all duration-300 group-hover:rotate-90 ${openMenu ? "rotate-90" : ""}`}
                />
                {link.name}
            </span>

            {/*-- Dropdown Menu Panel --*/}
            <div className={`
                lg:absolute
                z-15
                top-full left-0 lg:rounded-b-2xl lg:shadow-lg
                lg:bg-white lg:dark:bg-[hsl(225,40%,5%)] lg:dark:border lg:dark:border-gray-800
                group-hover:lg:visible group-hover:lg:opacity-100 group-hover:lg:p-4
                ${openMenu ? "visible opacity-100 p-4" : "invisible opacity-0 p-0 max-lg:h-0 overflow-hidden"}
            `}>
                <ul className="
                    flex flex-col gap-4
                    lg:items-start lg:justify-start
                " role="menu"> {/* SEO: Semantic role for menu lists */}
                    {items && items.length > 0 ? (
                        items.map((item) => (
                            <li key={item.name} className="relative group/inner w-fit max-lg:ml-6" role="none">
                                <Link
                                    role="menuitem" // SEO: Standard role for interactive menu links
                                    aria-label={`Maps to ${item.name}`}
                                    className="group-hover/inner:text-primary transition-color duration-300 flex gap-2 items-center justify-center whitespace-nowrap"
                                    href={item.href || "#"}
                                >
                                    <span className="text-xl font-medium">{item.name}</span>
                                </Link>
                                <div className="group-hover/inner:w-full absolute left-0 bottom-0 w-0 h-px bg-black group-hover/inner:bg-primary transition-all duration-300"></div>
                            </li>
                        ))
                    ) : (
                        /* Fallback: Shown when no items are provided in the data array */
                        <li className="text-gray-400 italic text-sm py-2 px-4 whitespace-nowrap">
                            No links available
                        </li>
                    )}
                </ul>
            </div>
        </button >
    )
}
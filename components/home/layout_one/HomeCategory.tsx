"use client"

import { homeData } from "@/data/sitedata"
import { CategoryItem } from "../../category/CategoryItem"
import { useState } from "react"
import { getCategoryByArrayID } from "@/data/category/category"
import { CategoryData } from "@/types/item"

/**
 * This component renders the featured categories section on the home page.
 * It serves as a navigational hub, displaying a curated list of blog categories 
 * in a responsive grid-like flexbox layout.
 */
export function HomeCategory() {

    /**
     * Initializes the categories state by filtering/fetching category details 
     * based on an array of IDs provided in the 'homeData' configuration.
     */
    const [categorys] = useState(getCategoryByArrayID(homeData.category.categories))

    return (
        <section className="my-30">
            <div className="container mx-auto px-4">
                {/* * Conditional rendering: Only displays the list if categories are found.
                  * Limits the display to the first 6 items to maintain a clean UI.
                */}
                {categorys && categorys.length > 0 && (
                    <ul className="
                        flex gap-10 items-center flex-wrap
                        max-sm:gap-4 justify-center
                    ">
                        {categorys.slice(0, 6).map((category: CategoryData) => (
                            <li className="w-40 max-lg:w-35" key={category.name}>
                                <CategoryItem categoryData={category} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}
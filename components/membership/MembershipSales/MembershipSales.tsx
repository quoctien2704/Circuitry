import { membershipData } from "@/data/sitedata";
import { SaleItem } from "./SaleItem";

/**
 * Renders the membership pricing tiers or sales options.
 * Optimized for ThemeForest:
 * - Accessibility: Uses 'list' role and descriptive section labeling.
 * - Semantic: Wraps sales items in a logical list structure for SEO.
 * - Robustness: Implements safe data access with fallback checks.
 */

export function MembershipSales() {
    const salesData = membershipData?.sales || [];

    return (
        <section className="my-20 max-md:my-10" aria-label="Membership Pricing Tiers">
            <div className="container mx-auto px-4">
                {salesData.length > 0 ? (
                    <ul
                        className="flex gap-10 max-lg:flex-col max-lg:gap-4"
                        role="list"
                    >
                        {salesData.map((sale, index) => (
                            <li
                                className="flex-1 list-none"
                                key={sale.sales_title || index}
                            >
                                <SaleItem saleItem={sale} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    // Optional: Fallback UI if no sales data exists
                    <div className="text-center py-10 opacity-50 italic">
                        No active offers at the moment.
                    </div>
                )}
            </div>
        </section>
    );
}

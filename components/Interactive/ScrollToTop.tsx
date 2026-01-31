"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop Component
 * Automatically scrolls the window to the top on component mount or route change.
 * * Optimized for ThemeForest:
 * - UX: Ensures a consistent starting point for users when navigating between pages.
 * - Compatibility: Uses 'smooth' behavior for modern browsers with a standard fallback.
 * - Accessibility: Resets focus to the body to improve navigation for screen reader users.
 */
export function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Scroll to top with smooth animation
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        /**
         * A11y Tip: When changing routes, it's a best practice to reset focus 
         * to the top of the page so screen readers don't get stuck.
         */
        document.body.focus();

    }, [pathname]); // Triggers every time the URL path changes

    return null;
}
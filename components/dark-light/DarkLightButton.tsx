"use client";

import { useEffect, useState } from "react";

/**
 * DarkLightMode Component
 * Manages theme switching between Light and Dark modes.
 * Persists user preference in localStorage and toggles the 'dark' class on the document root.
 */
export function DarkLightMode() {
    // State to track the current theme (true for dark, false for light)
    const [dark, setDark] = useState(false);

    // Synchronize state with localStorage and system preference on initial mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        // Check if user previously selected dark mode
        if (savedTheme === "dark") {
            setDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    /**
     * Toggles the theme between light and dark.
     * Updates the component state, document class, and localStorage.
     */
    const toggleTheme = () => {
        const newDarkState = !dark;
        setDark(newDarkState);

        if (newDarkState) {
            // Enable Dark Mode: update DOM and storage
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            // Enable Light Mode: update DOM and storage
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <button
            onClick={toggleTheme}
            // Accessibility: Provides clear context for screen readers
            aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
            title={`Toggle ${dark ? 'Light' : 'Dark'} Mode`}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 cursor-pointer shadow-sm active:scale-95"
        >
            {/* Visual Indicator: Switches icons based on theme state */}
            <span className="text-lg">
                {dark ? "🌙" : "☀️"}
            </span>

            {/* Label: Hidden on mobile devices (max-md) for a cleaner UI */}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-md:hidden">
                {dark ? "Dark" : "Light"}
            </span>
        </button>
    );
}
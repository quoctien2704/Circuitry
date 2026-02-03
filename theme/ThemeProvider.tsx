"use client"

import { theme } from "@/data/theme";
import { ThemeConfig } from "@/types/theme";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface ThemeContextData {
    config: ThemeConfig
    updateTheme: (newConfig: ThemeConfig) => void;
}

const themeContext = createContext<ThemeContextData | undefined>(undefined);

export const ThemeProvder = ({ children }: { children: React.ReactNode }) => {
    const [config, setConfig] = useState<ThemeConfig>(theme);
    const value = useMemo(() => ({
        config,
        updateTheme: (newConfig: ThemeConfig) => setConfig(newConfig)
    }), [config]);

    useEffect(() => {
        const root = document.documentElement;

        // Map giá trị từ object config vào CSS variables
        root.style.setProperty("--primary", config.colors.primary);
        root.style.setProperty("--secondary", config.colors.secondary);
        root.style.setProperty("--dark-primary", config.colors.dark_primary);
        root.style.setProperty("--dark-secondary", config.colors.dark_secondary);


    }, [config])

    return (
        <themeContext.Provider value={value}>
            {children}
        </themeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(themeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
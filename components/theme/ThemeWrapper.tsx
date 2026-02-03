"use client"
import React from 'react';
export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <main>
            {children}
        </main>
    )
}
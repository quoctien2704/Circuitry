"use client"

import { useRouter } from "next/navigation";
import { PrimaryButton } from "./primaryButton";

/**
 * A navigation component that provides a "Go Back" functionality.
 * It wraps the PrimaryButton and utilizes Next.js navigation hooks to 
 * return the user to their previous location in the browser history.
 */

export function GoBackButton() {

    /**
     * Handles the click event by triggering the router's back method.
     * Note: This relies on the browser's history stack. If no history exists, 
     * the behavior may vary depending on the browser.
     */

    const router = useRouter();
    return <div onClick={() => router.back()}>
        <PrimaryButton content="Go back" />
    </div>
}
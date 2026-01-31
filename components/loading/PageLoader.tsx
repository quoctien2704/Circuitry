import { BeatLoader } from "react-spinners";

/**
 * PageLoader Component
 * Visual feedback for users during data fetching or page transitions.
 * * ThemeForest Best Practices:
 * - Accessibility: Uses ARIA 'status' role and 'polite' live region.
 * - UX: Centered layout with consistent vertical spacing.
 * - Semantic: Provides hidden text for screen readers while showing a spinner.
 */

export function PageLoader() {
    return (
        <div
            className="flex items-center justify-center min-h-[80vh] font-bold text-5xl"
            role="status" // Notifies assistive technologies that this is a loading state
            aria-live="polite" // Updates the user without interrupting their current task
            aria-busy="true" // Indicates that the page/section is currently busy loading
        >
            <BeatLoader loading={true} size={16} />

            {/* Visually hidden but readable by screen readers */}
            <span className="sr-only">Loading content, please wait...</span>
        </div>
    )
}
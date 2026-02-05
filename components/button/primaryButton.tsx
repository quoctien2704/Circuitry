/**
 * A reusable primary button component that serves as the main call-to-action (CTA).
 * It utilizes the 'primary' theme color for its base state and features a high-contrast 
 * hover effect that inverts the color scheme for better user feedback.
 * * @param {string} content - The text label to be displayed inside the button.
 */

export function PrimaryButton({ content }: { content: string }) {

    /**
     * Renders a button with the platform's primary branding.
     * Features:
     * - State Transitions: Smooth 300ms transition for background, border, and text color.
     * - Dynamic Hover: Swaps to a light background (or dark-themed HSL) while shifting text to primary color.
     * - Responsive Design: Reduces padding and font size at the 'lg' breakpoint to maintain layout integrity.
     */

    return (
        <div className="
            transition-all duration-300 shadow-lg bg-primary border-2 border-primary hover:bg-gray-100 dark:hover:bg-[hsl(225,40%,5%)] hover:text-primary text-lg text-white px-5 py-2.5 rounded-lg font-medium cursor-pointer
            max-lg:px-4 max-lg:py-2 max-lg:text-base
        ">
            <span>
                {content || "No content available"}
            </span>
        </div>
    )
}
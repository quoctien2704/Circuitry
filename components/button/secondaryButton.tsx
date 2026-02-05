/**
 * A reusable secondary button component designed for the Circuitry platform.
 * It features a solid 'secondary' theme color with a clear hover inversion effect,
 * swapping background and text colors to maintain high interactivity.
 * * @param {string} content - The text or label to be displayed inside the button.
 */

export function SecondaryButton({id, content }: {id:string, content: string }) {

    /**
     * Renders a styled button with a focus on smooth transitions and responsiveness.
     * Features:
     * - Inversion on Hover: Changes background to light/dark based on theme and text to secondary.
     * - Dark Mode Support: Uses a specific HSL value for hover background in dark mode.
     * - Responsive Sizing: Automatically scales padding and font size for tablet/mobile (max-lg).
     */

    return (
        <button 
            id={id}
            className="
                transition-all duration-300 shadow-lg bg-secondary border-2 border-secondary hover:bg-gray-100 dark:hover:bg-[hsl(225,40%,5%)] hover:text-secondary text-lg text-white px-5 py-2.5 rounded-lg font-medium cursor-pointer
                max-lg:px-4 max-lg:py-2 max-lg:text-base
            ">
            <span>
                {content || 'No content available'}
            </span>
        </button>
    )
}
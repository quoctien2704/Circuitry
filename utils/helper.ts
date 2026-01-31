export const scrollToTop = (): void => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
}
export function capitalize(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

import readingTime from "reading-time";

export function getReadingTime(text: string) {
    const stats = readingTime(text);
    return Math.ceil(stats.minutes); // 3.2 → 4 min
}
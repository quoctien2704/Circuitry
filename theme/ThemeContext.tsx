import { createContext, useContext } from "react";
import { ThemeConfig } from "@/types/theme";

interface ThemeContextData {
    config: ThemeConfig
    themeOptions: string[],
    iframeRef: React.RefObject<HTMLIFrameElement | null>;
    updateTheme: (newConfig: ThemeConfig) => void;
    updateNestedConfig: (path:string,value:any) => void,
    registerIframe: (ref: HTMLIFrameElement | null) => void;
}
export const ThemeContext = createContext<ThemeContextData | undefined>(undefined);


export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
};
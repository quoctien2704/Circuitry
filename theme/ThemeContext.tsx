import { createContext, useContext } from "react";
import { ThemeConfig } from "@/types/theme";
import { layoutSiteData, siteDataType } from "@/types";



interface ThemeContextData {
    config: ThemeConfig
    themeOptions: string[],
    iframeRef: React.RefObject<HTMLIFrameElement | null>;
    handleAddNewStyleToConfig: (formdata: FormData) => boolean;
    resetConfig: () => void,
    siteData: siteDataType,
    selectedSiteData: layoutSiteData;
    layoutName: string
    SaveAll: () => void;
    updateTheme: (newConfig: ThemeConfig) => void;
    updateNestedConfig: (path:string,value:any) => void,
    updateNestedSiteData: (path:string,value:any) => void,
    registerIframe: (ref: HTMLIFrameElement | null) => void;
    getDeep: (obj:any, path: string) => void | null
}
export const ThemeContext = createContext<ThemeContextData | undefined>(undefined);


export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
};
import { createContext, useContext } from "react";
import { ThemeConfig } from "@/types/theme";
import {  siteDataType } from "@/types";



// interface ThemeContextData {
//     config: ThemeConfig
//     themeOptions: string[],
//     iframeRef: React.RefObject<HTMLIFrameElement | null>;
//     handleAddNewStyleToConfig: (formdata: FormData) => boolean;
//     resetConfig: () => void,
//     siteData: siteDataType,
//     selectedSiteData: layoutSiteData;
//     layoutName: string
//     SaveAll: () => void;
//     updateTheme: (newConfig: ThemeConfig) => void;
//     updateNestedConfig: (path:string,value:any) => void,
//     updateNestedSiteData: (path:string,value:any) => void,
//     registerIframe: (ref: HTMLIFrameElement | null) => void;
//     getDeep: (obj:any, path: string) => void | null
// }

// export const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

interface ThemeDataContextProps {
    config: ThemeConfig,
    siteData: siteDataType
    pageName: string
    iframeRef: React.RefObject<HTMLIFrameElement | null>
}

interface ThemeActionContextProps {
    updateConfig: (path: string,data: any) => void;
    updateSiteData: (path: string,data: any) => void;
    updatePageName: (data: string) => void;
    registerIframe: (element: HTMLIFrameElement | null) => void
    triggerAddStylePanel: (isOpen: boolean) => void
}

interface ThemeModelContextProps {
    isAddStylePanelOpen: boolean
}


export const ThemeActionContext = createContext<ThemeActionContextProps | undefined>(undefined)
export const ThemeModelContext = createContext<ThemeModelContextProps | undefined>(undefined)
export const ThemeDataContext = createContext<ThemeDataContextProps | undefined>(undefined)

export const useThemeActions = () => {
    const context = useContext(ThemeActionContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}

export const useThemeModel = () => {
    const context = useContext(ThemeModelContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}

export const useThemeData = () => {
    const context = useContext(ThemeDataContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}




    "use client"


    import { ThemeConfig } from "@/types/theme";
    import { ThemeContext } from "./ThemeContext";
    import React, { useEffect, useMemo, useRef, useState } from "react";
    import toast from "react-hot-toast";
    import { layoutSiteData, siteDataType } from "@/types";
    import { theme } from "@/data/theme";
    import { globalSiteData } from "@/data/sitedata";


    export const ThemeProvder = ({ children }: { children: React.ReactNode }) => {

        // #region State
        
        const [config, setConfig] = useState<ThemeConfig>(theme);
        const [siteData,setSiteData] = useState<siteDataType>(globalSiteData)
        const [layoutName,setLayoutName] = useState<string>("");
        // #endregion

        const { theme_mode } = config.config

        const iframeRef = useRef<HTMLIFrameElement | null>(null);
        
        // #region Memo

        const selectedSiteData = useMemo((): layoutSiteData => {
            if(layoutName === "") return {};

            const newConfig = JSON.parse(JSON.stringify(siteData)); 
            const keys = layoutName.split('.');
            let current = newConfig;
            // Chạy vòng lặp đến phần tử SÁT CUỐI
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                // Nếu đường dẫn không tồn tại, tự tạo object rỗng (phòng xa)
                if (!(key in current)) current[key] = {}; 
                current = current[key];
            }
            return current      
            
        },[layoutName,siteData]);


        const themeOptions = useMemo(() => {
            return Object.keys(config.colors) || ['light','dark'];
        },[config.colors])

        const value = useMemo(() => ({
            config,
            themeOptions,
            iframeRef,
            siteData,
            selectedSiteData,
            layoutName,
            SaveAll: () => SaveAll(),
            handleAddNewStyleToConfig: (formdata: FormData) => handleAddNewStyleToConfig(formdata),
            resetConfig: () => resetConfig(),
            getDeep: (obj:any, path: string) => getDeep(obj,path),
            updateTheme: (newConfig: ThemeConfig) => setConfig(newConfig),
            updateNestedConfig: (path:string,value:any) => updateNestedConfig(path,value),
            updateNestedSiteData: (path:string,value:any) => updateNestedSiteData(path,value),
            registerIframe: (ref: HTMLIFrameElement | null) => registerIframe(ref)
        }), [config,siteData,layoutName]);


        // #endregion

        // #region UseEffect
        useEffect(() => {

            const isEditor = (window.location.pathname.startsWith('/') && !iframeRef.current && window.parent.window.location.pathname.startsWith('/theme-editor'))
            const handleMessage = (event: MessageEvent) => {
                const { type, payload } = event.data;
                const root = document.documentElement;
                switch(type){

                    case "UPDATE_CONFIG" : setConfig(payload); break;
                    case "LOCAL_UPDATE_PRIMARY": root.style.setProperty("--primary", payload|| config.colors['light'].primary); break;
                    case "LOCAL_UPDATE_SECONDARY": root.style.setProperty("--secondary", payload || config.colors['light'].secondary); break;
                    case "LOCAL_UPDATE_BACKGROUND": root.style.setProperty("--background", payload || config.colors['light'].background); break;
                    case "LOCAL_UPDATE_FOREGROUND": root.style.setProperty("--foreground", payload || config.colors['light'].foreground); break;
                    case "UPDATE_LAYOUT_NAME": setLayoutName(payload); break;
                }
            }
            window.addEventListener('message',handleMessage)
            
            if(isEditor){
                const root = document.documentElement;
                root.classList.remove(...themeOptions)
                root.classList.add(config.config.theme_mode);
                root.style.setProperty("--primary", config.colors[theme_mode].primary || config.colors['light'].primary);
                root.style.setProperty("--secondary", config.colors[theme_mode].secondary ||  config.colors['light'].secondary);
                root.style.setProperty("--background", config.colors[theme_mode].background || config.colors['light'].background)
                root.style.setProperty("--foreground",  config.colors[theme_mode].foreground || config.colors['light'].foreground)
            }

            

            () => window.removeEventListener('message',handleMessage)

        }, [config.colors,config.config.theme_mode])

        useEffect(() => {

            const handleMessage = (event: MessageEvent) => {
                const { type, payload } = event.data;
                switch(type){
                    case "RESET_CONTENT": setSiteData(globalSiteData); break;
                    case "UPDATE_CONTENT_FIELD": updateNestedSiteData(payload.updatePathName,payload.value); break;
                    case "UPDATE_CONTENT_ARTICLES": updateNestedSiteData(payload.updatePathName,payload.value); break;
                    case "UPDATE_CONTENT_IMAGE": updateNestedSiteData(payload.updatePathName,payload.value); break;
                }
            }
            window.addEventListener('message',handleMessage);
            () => window.removeEventListener('message',handleMessage)

            console.log(siteData.home.layout_1.slider.home_layout_one_bottom_left_sliders_article_data_004)

        },[siteData])

        useEffect(() => {
            
            requestAnimationFrame(() => {
                const savedTheme = localStorage.getItem('config') as string;
                const savedSite = localStorage.getItem('sitedata') as string;
                if (savedTheme) {
                    try {
                        setConfig(JSON.parse(savedTheme));
                    } catch (error) {
                        console.error("Lỗi parse JSON:", error);
                    }
                }
                if (savedSite) {
                    try {
                        setSiteData(JSON.parse(savedSite));
                    } catch (error) {
                        console.error("Lỗi parse JSON:", error);
                    }
                }
                
                const isEditor = (window.location.pathname.startsWith('/') && !iframeRef.current && window.parent.window.location.pathname.startsWith('/theme-editor'))

                if(!isEditor){
                    const root = document.documentElement;
                    root.classList.remove(...themeOptions)
                    root.classList.add(config.config.theme_mode);
                    root.style.setProperty("--primary",config.colors['light'].primary);
                    root.style.setProperty("--secondary",config.colors['light'].secondary);
                    root.style.setProperty("--background",config.colors['light'].background)
                    root.style.setProperty("--foreground",config.colors['light'].foreground)                    
                }

            })
            
        },[])

        // #endregion
        
        // #region config function
        const resetConfig = async () => {
            if(config !== theme) {
                setConfig(theme);
            }
                
            if(siteData !== globalSiteData){
                iframeRef.current?.contentWindow?.postMessage({
                    type:"RESET_CONTENT"
                },"*")
                setSiteData(globalSiteData);
            }
                
        }

        const SaveAll = async () => {
            await new Promise(resolve => setTimeout(resolve,500))
            await saveConfig();
            await saveSiteData();
        }

        const saveConfig = async () => {
            await localStorage.setItem('config',JSON.stringify(config))
        }
        const saveSiteData = async () => {
            await localStorage.setItem('sitedata',JSON.stringify(siteData))
        }

        const setDeep = (obj:any, path: string, value:any): any => {

            const newConfig = JSON.parse(JSON.stringify(obj)); 
            const keys = path.split('.');
            
            let current = newConfig;
            
            // Chạy vòng lặp đến phần tử SÁT CUỐI
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                // Nếu đường dẫn không tồn tại, tự tạo object rỗng (phòng xa)
                if (!(key in current)) current[key] = {}; 
                current = current[key];
            }

            // Gán giá trị vào key cuối cùng của object "current" lúc này
            const lastKey = keys[keys.length - 1];
            if(current[lastKey] !== value){
                current[lastKey] = value;
                return newConfig;
            }

           

            return obj;
            
        }
        
        const getDeep = (obj:any, path: string): any | null => {
            const newObj = JSON.parse(JSON.stringify(obj)); 
            const keys = path.split('.');
            let current = newObj;
            // Chạy vòng lặp đến phần tử SÁT CUỐI
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                // Nếu đường dẫn không tồn tại, tự tạo object rỗng (phòng xa)
                if (!(key in current)) current[key] = {}; 
                current = current[key];
            }
            return current || null
        }
    
        const updateNestedConfig = (path: string, value: any) => {
            setConfig((prev) => {
                if (!prev) return prev;
                return setDeep(prev,path,value);
            });
        };

        const updateNestedSiteData = (path: string, value: any) => {
            setSiteData((prev) => {
                if (!prev) return prev;
                return setDeep(prev,path,value);
            });
        };

        const handleAddNewStyleToConfig = (formData: FormData) : boolean => {
            const name = (formData.get('name') as string).toLowerCase();
            if(!name && !name?.trim()){
                toast.error("Missing name")
                return false;
            }
            if(themeOptions.includes(name)) {
                toast.error("The name of this style already exists, please change it.")
                return false;
            }
            const updatedData = {
                primary: formData.get("Primary") || '#ffffff',
                secondary: formData.get("Secondary") || '#ffffff',
                background: formData.get("Background") || '#ffffff',
                foreground: formData.get("Foreground") || '#ffffff'
            }

            updateNestedConfig(`colors.${name}`,updatedData)
            toast.success("Sucessfully create new style")
            return true;

        }

        // #endregion

        const registerIframe = (element: HTMLIFrameElement | null) => {
            iframeRef.current = element;
        };

        return (
            <ThemeContext.Provider value={value}>
                {children}
            </ThemeContext.Provider>
        )
    }

"use client"

import { theme } from "@/data/theme";
import { ThemeConfig } from "@/types/theme";
import { ThemeContext } from "./ThemeContext";
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";


export const ThemeProvder = ({ children }: { children: React.ReactNode }) => {
    const [config, setConfig] = useState<ThemeConfig>(theme);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const themeOptions = useMemo(() => {
        return Object.keys(config.colors) || ['light','dark'];
    },[config.colors])

    const value = useMemo(() => ({
        config,
        themeOptions,
        iframeRef,
        updateTheme: (newConfig: ThemeConfig) => setConfig(newConfig),
        updateNestedConfig: (path:string,value:any) => updateNestedConfig(path,value),
        registerIframe: (ref: HTMLIFrameElement | null) => registerIframe(ref)
    }), [config]);

    useEffect(() => {
        const isInsideIFrame = window.self !== window.top
        const handleMessage = (event: MessageEvent) => {
            const { type, payload } = event.data;
            const root = document.documentElement;
            switch(type){

                case "UPDATE_CONFIG" : setConfig(payload); break;
                case "LOCAL_UPDATE_PRIMARY": root.style.setProperty("--primary", payload|| config.colors['light'].primary); break;
                case "LOCAL_UPDATE_SECONDARY": root.style.setProperty("--secondary", payload || config.colors['light'].secondary); break;
                case "LOCAL_UPDATE_BACKGROUND": root.style.setProperty("--background", payload || config.colors['light'].background); break;
                case "LOCAL_UPDATE_FOREGROUND": root.style.setProperty("--foreground", payload || config.colors['light'].foreground); break;
                
            }
        }
        window.addEventListener('message',handleMessage)
        
        if(isInsideIFrame){
            const root = document.documentElement;
            root.classList.remove(...themeOptions)
            root.classList.add(config.config.theme_mode);
            root.style.setProperty("--primary", config.colors[config.config.theme_mode].primary || config.colors['light'].primary);
            root.style.setProperty("--secondary", config.colors[config.config.theme_mode].secondary ||  config.colors['light'].secondary);
            root.style.setProperty("--background", config.colors[config.config.theme_mode].background || config.colors['light'].background)
            root.style.setProperty("--foreground",  config.colors[config.config.theme_mode].foreground || config.colors['light'].foreground)
        }

        () => window.removeEventListener('message',handleMessage)
    }, [config])

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove(...themeOptions)
        root.classList.add(config.config.theme_mode);
        root.style.setProperty("--primary", config.colors[config.config.theme_mode].primary || config.colors['light'].primary);
        root.style.setProperty("--secondary", config.colors[config.config.theme_mode].secondary ||  config.colors['light'].secondary);
        root.style.setProperty("--background", config.colors[config.config.theme_mode].background || config.colors['light'].background)
        root.style.setProperty("--foreground",  config.colors[config.config.theme_mode].foreground || config.colors['light'].foreground)
        
    },[])

    const setDeep = (obj:any, path: string, value:any): any => {
        const [head,...tail] = path.split('.');
        if(tail.length === 0)
            return {...obj,[head]:value};
        
        return {
            ...obj,
            [head]: setDeep(obj[head] || {},tail.join('.'),value)
        }
    }

    const updateNestedConfig = (path: string, value: any) => {
        setConfig((prev) => {
            if (!prev) return prev;
            
            const newConfig = JSON.parse(JSON.stringify(prev)); 
            const keys = path.split('.');
            
            let current = newConfig;
            
            // Chạy vòng lặp đến phần tử SÁT CUỐI
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                console.log(key);
                // Nếu đường dẫn không tồn tại, tự tạo object rỗng (phòng xa)
                if (!(key in current)) current[key] = {}; 
                current = current[key];
            }

            // Gán giá trị vào key cuối cùng của object "current" lúc này
            const lastKey = keys[keys.length - 1];
            current[lastKey] = value;
            
            console.log("Config mới đã cập nhật:", newConfig);
            return newConfig;
        });
    };

    const registerIframe = (element: HTMLIFrameElement | null) => {
        iframeRef.current = element;
        console.log("Iframe đã được đăng ký với Provider!");
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

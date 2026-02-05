"use client";
import { EditorSideBar } from "@/components/admin/EditorSideBar";
import { PrimaryButton } from "@/components/button/primaryButton";
import { ReactIcon } from "@/components/Icon/ReactIcon";
import { useTheme } from "@/theme/ThemeContext";
import { useEffect, useRef, useState } from "react";

interface MenuItemData {
    name: string;
    icon: string;
    responsive: string
}

const menus: MenuItemData[] = [

    {
        name: "Desktop",
        icon: "desktop_icon",
        responsive: "1440px"
    },
    {
        name: "Tablet",
        icon: "tablet_icon",
        responsive: "768px"
    },
    {
        name: "Mobile",
        icon: "mobile_icon",
        responsive: "390px"
    },
    {
        name: "Full",
        icon: "full_icon",
        responsive: "100%"
    },
]

export default function ThemeEditorPage () {

    //State Data
    const [saving,setSavimg] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [currentWidth,setCurrentWidth] = useState("1440px");

    // Data

    // Provider Data
    const { config, registerIframe,iframeRef,SaveAll } = useTheme();

    const handleFinishedLoading = async () => {
        await new Promise(resolve => setTimeout(resolve,1000));
        setIsLoading(false)
    }

    const handleSaving = async () => {
        setSavimg(true);
        await SaveAll();
        setSavimg(false);
    }
    // State Event
    useEffect(() => {
        if(iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
                type:"UPDATE_CONFIG",
                payload:config
            },"*")
        }
    },[config])

    return (
        <div className="relative flex h-screen max-h-screen">
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-20">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-sm text-gray-500 font-medium">Đang tải bản xem trước...</p>
                </div>
            )}
            
            <div className={`border-r h-full overflow-hidden transition-width duration-300 ${currentWidth === '100%' ? "w-0" : "w-100 min-w-70 border-gray-200"}`}>
                <EditorSideBar />
            </div>
            <div className="flex-1 h-full flex flex-col">
                <div className="relative py-2 flex items-center justify-center gap-4 border-b border-gray-200 mix-blend-multiply">
                    {menus.map((item) => (
                        <button
                            key={item.name}
                            role="button"
                            aria-label={`Button ${item.name}`}
                            onClick={() => setCurrentWidth(item.responsive)}
                            className={`w-20 aspect-4/2 flex flex-col gap items-center justify-center px-3 py-2 rounded-md text-sm transition-all mix-blend-multiply ${
                                currentWidth === item.responsive 
                                ? "bg-primary text-white shadow-md" 
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >   
                            <ReactIcon name={item.icon} size={16} />
                            <span className="m-0 p-0 font-medium italic">{item.name}</span>
                        </button>
                        
                    ))}
                    <button
                        role="button"
                        className="absolute right-4 top-[50%] -translate-[50%] mix-blend-multiply"
                        onClick={handleSaving}
                    >
                        <PrimaryButton content={saving ? "Savig..." : "Save"} />
                    </button>
                </div>
                <div 
                    className="w-full h-full flex items-center justify-center bg-gray-400"
                >
                    {/* Iframe */}
                    <iframe
                        ref={registerIframe}
                        src="/"
                        style={{ width: currentWidth }}
                        className={`max-w-full h-full transition-all duration-500`}
                        onLoad={handleFinishedLoading}
                    ></iframe>
                </div>
            </div>
            
        </div>
    )
}


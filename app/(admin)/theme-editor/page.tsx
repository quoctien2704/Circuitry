"use client";
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
    const [isLoading,setIsLoading] = useState(true);
    const [currentWidth,setCurrentWidth] = useState("1440px");

    // Data

    // Provider Data
    const { config, registerIframe,iframeRef } = useTheme();

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
        <div className="flex h-screen max-h-screen">
            <div className={`border-r  h-full overflow-hidden transition-width duration-300 ${currentWidth === '100%' ? "w-0" : "w-100 border-gray-200"}`}>
                <EditorSideBar />
            </div>
            <div className="flex-1 h-full flex flex-col">
                <div className="py-2 flex items-center justify-center gap-4 border-b border-gray-200">
                        {menus.map((item) => (
                        <button
                            key={item.name}
                            role="button"
                            aria-label={`Button ${item.name}`}
                            onClick={() => setCurrentWidth(item.responsive)}
                            className={`w-20 aspect-4/2 flex flex-col gap items-center justify-center px-3 py-2 rounded-md text-sm transition-all ${
                                currentWidth === item.responsive 
                                ? "bg-primary text-white shadow-md" 
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >   
                            <ReactIcon name={item.icon} size={16} />
                            <span className="m-0 p-0 font-medium italic">{item.name}</span>
                        </button>
                    ))}
                </div>
                <div 
                    
                    className="relative w-full h-full flex items-center justify-center bg-gray-200"
                >
                    {/* Hiệu ứng Loading (Skeleton) */}
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-20">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-4 text-sm text-gray-500 font-medium">Đang tải bản xem trước...</p>
                        </div>
                    )}

                    {/* Iframe */}
                    <iframe
                        ref={registerIframe}
                        src="/"
                        style={{ width: currentWidth }}
                        className={`max-w-full h-full transition-all duration-500`}
                        onLoad={() => setIsLoading(false)} // Tắt loading khi iframe tải xong
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export const EditorSideBar = () => {

    // React State Data
    const [OpenEditColorMenu,setOpenEditColorMenu] = useState(false);

    // Data
    const { themeOptions, config} = useTheme();
    const { theme_mode } = config.config

    // Event
    const handleAddStyleEvent = () => {
        alert("You Trying to add new style please add seomthing");
    }

    const handleOpenColorMenu = () => {
        setOpenEditColorMenu(prev => !prev)
    }





    return (
        <div className="h-full">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200 shadow-xs">
                    <h2 className="text-2xl">Sidebar</h2>
                    <button className="text-xl cursor-pointer">Reset</button>
                </div>
                <div className="px-4 flex flex-col gap-2 border-b pb-4 border-gray-200 shadow-xs">
                    <h3 className="text-xl font-medium italic">Quick Preset</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {themeOptions.map(style => (
                            <StylePicker key={style} style={style} />
                        ))}
                        <button 
                            role="button"
                            aria-label="Click this button to add new style"
                            className={`outline-none flex flex-col gap-2 items-center justify-center cursor-pointer px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-200 transition-background duration-300`}
                            onClick={handleAddStyleEvent}
                        >
                            
                            <div className="w-10 aspect-square flex items-center justify-center rounded-full overflow-hidden gap-0.5">
                                <ReactIcon size={20} name="plus_icon" />
                            </div>
                            <span className="font-medium text-lg uppercase">ADD</span>
                        </button>
                    </div>
                </div>
                <div className="px-4 flex flex-col gap-2 border-b pb-4 border-gray-200 shadow-xs">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-medium italic">Colors Mode: {theme_mode.toUpperCase()}</h3>
                        <button
                            className="cursor-pointer"
                            onClick={handleOpenColorMenu}
                        >
                            {OpenEditColorMenu ? <ReactIcon size={18} name="arrow_up_icon"/> : <ReactIcon size={18} name="arrow_down_icon"/>}
                            
                        </button>

                    </div>
                    <div className={`flex flex-col gap-2 ${OpenEditColorMenu && "hidden"}`}>
                        <ColorPicker theme_name={theme_mode} type={"LOCAL_UPDATE_PRIMARY"} title={"Primary"} color={config.colors[theme_mode].primary} />
                        <ColorPicker theme_name={theme_mode} type={"LOCAL_UPDATE_SECONDARY"} title={"Secondary"} color={config.colors[theme_mode].secondary} />
                        <ColorPicker theme_name={theme_mode} type={"LOCAL_UPDATE_BACKGROUND"} title={"Background"} color={config.colors[theme_mode].background} />
                        <ColorPicker theme_name={theme_mode} type={"LOCAL_UPDATE_FOREGROUND"} title={"Foreground"} color={config.colors[theme_mode].foreground} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const StylePicker = ({style}: {style: string}) => {

    const { updateNestedConfig ,config} = useTheme();
    const { theme_mode } = config.config
    return (
        <button 
            role="button"
            aria-label={`Click to change theme to ${style} mode`}
            title={`Theme ${style} mode`}
            key={style} 
            className={`outline-none flex flex-col gap-2 items-center justify-center cursor-pointer px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-200 transition-background duration-300 ${style === theme_mode ? "bg-gray-200" : "bg-white"}`}
            onClick={() => updateNestedConfig('config.theme_mode',style)}
        >
            <div className="w-10 aspect-square flex rounded-full overflow-hidden gap-0.5">
                <div className="flex-1" style={{ backgroundColor: config.colors[style].primary }}></div>
                <div className="flex-1" style={{ backgroundColor: config.colors[style].secondary }}></div>
            </div>
            <span className="font-medium text-lg uppercase">{style}</span>
        </button>
    )
}

export const ColorPicker = ({ theme_name, title, color, type }: { theme_name:string, title: string, color: string, type:string }) => {
    const { iframeRef,updateNestedConfig } = useTheme();
    // Khởi tạo trực tiếp từ props để tránh useEffect thừa
    const [localColor, setLocalColor] = useState<string>(color);

    const handleLocalColorChange = (value: string) => {
        // 1. Cập nhật State Local TRƯỚC để Input mượt mà
        setLocalColor(value);

        console.log(`config.colors.${theme_name}.${title}`);
        // 2. Dùng requestAnimationFrame để gửi tin nhắn 
        // Nó sẽ đợi trình duyệt rảnh (thường là sau khi vẽ xong UI) mới gửi tin
        requestAnimationFrame(() => {
            iframeRef.current?.contentWindow?.postMessage({
                type: type,
                payload: value
            }, "*");
        });
    };

    // Cập nhật lại màu khi đổi Preset (config thay đổi)
    useEffect(() => {
        setLocalColor(color);
    }, [color]);

    return (
        <div className="flex justify-between items-center">
            <label htmlFor={title} className="font-medium italic uppercase">{title} Color: </label>
            <input 
                id={title}
                className="aspect-square w-10 h-10 cursor-pointer" 
                type="color" 
                value={localColor} 
                // Dùng onInput thường mượt hơn onChange cho Color Picker trong một số trình duyệt
                onInput={(e) => handleLocalColorChange(e.currentTarget.value)} 
                onBlur={(e) => updateNestedConfig(`colors.${theme_name}.${title.toLowerCase()}`,e.target.value)}
            />
        </div>
    );
};
import { memo, useEffect, useState } from "react"
import { ReactIcon } from "../Icon/ReactIcon";
import { ThemeModeData } from "@/types/theme";
import { ColorPicker } from "./EditorColorPicker";
import { useThemeActions } from "@/theme/ThemeContext";

export const EditorColorMenu = memo(({themeMode,selectedStyle}:{themeMode: string,selectedStyle:ThemeModeData}) => {

    const { updateConfig } = useThemeActions();
    const [OpenEditColorMenu,setOpenEditColorMenu] = useState(true);

    useEffect(() => {
        setOpenEditColorMenu(true);
    },[themeMode])

    return (
        <div className="px-4 flex flex-col gap-2 border-b pb-4 border-gray-200 shadow-xs">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium italic">Colors Mode: {themeMode.toUpperCase()}</h3>
                <button
                    className="cursor-pointer"
                    onClick={() => setOpenEditColorMenu(prev => !prev)}
                >
                    {OpenEditColorMenu ?  <ReactIcon size={30} name="close_icon"/> : <ReactIcon size={30} name="plus_icon"/>}
                </button>

            </div>
            <div className={`flex flex-col gap-2 ${OpenEditColorMenu === false && "hidden"}`}>
                {Object.entries(selectedStyle).map(([key,value]) => (
                    <ColorPicker 
                        key={key} 
                        name={key} 
                        color={value} 
                        onUpdateConfig={(updateValue: string) => updateConfig(`colors.${themeMode}.${key}`,updateValue)} />
                ))}
                
            </div>
        </div>
    )
})
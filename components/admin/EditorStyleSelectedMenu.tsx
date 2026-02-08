import { ThemeModeData } from "@/types/theme"
import { StylePicker } from "./EditorStylePickder"
import { memo, useCallback } from "react"
import { ReactIcon } from "../Icon/ReactIcon"
import { useThemeActions } from "@/theme/ThemeContext"

interface EditorStyleSelectedMenuProps {
    themeOptions: {
        [key: string]:ThemeModeData
    }
    themeMode: string
}

export const EditorStyleSelectedMenu = memo(({themeOptions,themeMode} : EditorStyleSelectedMenuProps) => { 

    const { updateConfig,triggerAddStylePanel } = useThemeActions();

    return (
        <div className="px-4 flex flex-col gap-2 border-b pb-4 border-gray-200 shadow-xs">
            <h3 className="text-xl font-medium italic">Quick Preset</h3>
            <div className="grid grid-cols-3 gap-4">
                {Object.entries(themeOptions).map(([key,value]) => (
                    <StylePicker 
                        key={key} 
                        name={key} 
                        value={value} 
                        isActive={key === themeMode}
                        onClick={() => updateConfig('config.theme_mode',key)}
                    />
                ))}
                <button 
                    role="button"
                    aria-label="Click this button to add new style"
                    className={`outline-none flex flex-col gap-2 items-center justify-center cursor-pointer px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-200 transition-background duration-300`}
                    onClick={() => triggerAddStylePanel(true)}
                >
                    
                    <div className="w-10 aspect-square flex items-center justify-center rounded-full overflow-hidden gap-0.5">
                        <ReactIcon size={30} name="plus_icon" />
                    </div>
                    <span className="font-medium text-lg uppercase">ADD</span>
                </button>
            </div>
        </div>
    )
})

import { memo } from "react";
import { ThemeModeData } from "@/types/theme";

export const StylePicker = memo(({name = 'default',value,isActive,onClick,}: {
    name:string,
    value: ThemeModeData
    isActive: boolean,
    onClick: () => void;
}) => {
    return (
        <button 
            role="button"
            aria-label={`Click to change theme to ${name} mode`}
            title={`Theme ${name} mode`}
            className={`outline-none flex flex-col gap-2 items-center justify-center cursor-pointer px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-200 transition-background duration-300 ${isActive ? "bg-gray-200" : "bg-white"}`}
            onClick={onClick}
        >
            <div className="w-10 aspect-square flex rounded-full overflow-hidden gap-0.5">
                <div className="flex-1" style={{ backgroundColor: value.primary }}></div>
                <div className="flex-1" style={{ backgroundColor: value.secondary }}></div>
            </div>
            <span className="font-medium text-lg uppercase">{name}</span>
        </button>
    )
},(prevProps,nextProps) => {
    return prevProps.value === nextProps.value && prevProps.isActive === nextProps.isActive
})
import { useTheme } from "@/theme/ThemeContext";

export const StylePicker = ({style}: {style: string}) => {

    const { updateNestedConfig ,config} = useTheme();
    const { theme_mode } = config.config

    const handleStyleChanged = () => {
        updateNestedConfig('config.theme_mode',style)
    }

    return (
        <button 
            role="button"
            aria-label={`Click to change theme to ${style} mode`}
            title={`Theme ${style} mode`}
            key={style} 
            className={`outline-none flex flex-col gap-2 items-center justify-center cursor-pointer px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-200 transition-background duration-300 ${style === theme_mode ? "bg-gray-200" : "bg-white"}`}
            onClick={handleStyleChanged}
        >
            <div className="w-10 aspect-square flex rounded-full overflow-hidden gap-0.5">
                <div className="flex-1" style={{ backgroundColor: config.colors[style].primary }}></div>
                <div className="flex-1" style={{ backgroundColor: config.colors[style].secondary }}></div>
            </div>
            <span className="font-medium text-lg uppercase">{style}</span>
        </button>
    )
}
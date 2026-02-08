import { useThemeData } from "@/theme/ThemeContext";
import { memo, useCallback, useEffect, useState } from "react";

export const ColorPicker = memo(({ color,name, onUpdateConfig } : { 
    color: string,
    name: string,
    onUpdateConfig: (updateValue: string) => void 
}) => {

    const { iframeRef } = useThemeData();

    const [localColor,setLocalColor] = useState<string>(color);

    useEffect(() => {
        setLocalColor(color);
    }, [color]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setLocalColor(val);

        requestAnimationFrame(() => {
            iframeRef?.current?.contentWindow?.postMessage({
                type:`UPDATE_COLOR_${name.toUpperCase()}`,
                payload: val,
            },"*")
        })

    },[])
    
    const handleBlur = useCallback(() => {
            // Kiểm tra an toàn trước khi gọi hàm
            if (typeof onUpdateConfig === "function") {
                onUpdateConfig(localColor);
            }
    }, [onUpdateConfig, localColor]);

    return (
        <div className="flex justify-between items-center">
            <label htmlFor={name} className="font-medium italic uppercase">{name} Color: </label>
            <input 
                id={name}
                className="aspect-square w-10 h-10 cursor-pointer" 
                type="color" 
                value={localColor} 
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    );
},(prevProps, nextProps) => {
    return prevProps.color === nextProps.color &&   prevProps.name === nextProps.name
});
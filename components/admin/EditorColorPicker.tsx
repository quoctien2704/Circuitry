import { useTheme } from "@/theme/ThemeContext";
import { useEffect, useState } from "react";

export const ColorPicker = ({ theme_name, title, color, type }: { theme_name:string, title: string, color: string, type:string }) => {
    const { iframeRef,updateNestedConfig } = useTheme();
    // Khởi tạo trực tiếp từ props để tránh useEffect thừa
    const [localColor, setLocalColor] = useState<string>(color);

    const handleLocalColorChange = (value: string) => {
        // 1. Cập nhật State Local TRƯỚC để Input mượt mà
        setLocalColor(value);
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
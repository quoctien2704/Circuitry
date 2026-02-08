export const scrollToTop = (): void => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
}
export function capitalize(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

import readingTime from "reading-time";

export function getReadingTime(text: string) {
    const stats = readingTime(text);
    return Math.ceil(stats.minutes); // 3.2 → 4 min
}

export  const setDeep = (obj:any, path: string, value:any): any => {
    
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
        console.log(newConfig)
        return newConfig;
    }

    return obj;
    
}
import { ThemeConfig } from "@/types/theme";


export const ValidationForAddNewStyle = (formData: FormData,config: ThemeConfig ) => {

    let isSuccess = true;
    let message = "You successfully added new style"
    
    const newStyleName = (formData.get('name') as string || '').trim();

    const themeStyleNames = Object.keys(config.colors).map(name => name.toLowerCase());

    
    if(isSuccess && newStyleName.length < 3) {
        message = "Style name must have at least 3 letter"
        isSuccess=false
    }

    if(isSuccess && themeStyleNames.includes(newStyleName.toLowerCase())){
        message = "This name already exists in the style library."
        isSuccess=false
    }
    
    const data = {
        primary: formData.get("Primary"),
        secondary: formData.get("Secondary"),
        background: formData.get("Background"),
        foreground: formData.get("Foreground")
    }

    return {
        isSuccess,
        message,
        data,
        key: newStyleName
    };
}
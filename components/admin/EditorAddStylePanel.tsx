import Form from "next/form";
import { theme } from "@/data/theme";
import { PrimaryButton } from "../button/primaryButton";
import { ReactIcon } from "../Icon/ReactIcon";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useTheme } from "@/theme/ThemeContext";

interface EditorStyleBarColorPickersType {
    title: string;
    color: string;
}

const EditorStyleBarColorPickers: EditorStyleBarColorPickersType[] = [
    {
        title:"Primary",
        color: theme.colors['light'].primary
    },
    {
        title:"Secondary",
        color: theme.colors['light'].secondary
    },
    {
        title:"Background",
        color: theme.colors['light'].background
    },
    {
        title:"Foreground",
        color: theme.colors['light'].foreground
    }
]

export const EditorAddStylePanel = ({isOpen,onClose}:{isOpen:boolean,onClose: () => void}) => {

    const { handleAddNewStyleToConfig } = useTheme();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleAddNewStyleLocal = (formData: FormData) => {
        const isSuccess = handleAddNewStyleToConfig(formData);
        if(isSuccess)
            onClose();
    }

    if(!isOpen) return;
    return createPortal(
        <div className="fixed left-0 top-0 w-full h-full bg-black/60 z-19">
            <button
                role="button"
                aria-label="Click this to close Editor Add Style Panel"
                className="absolute right-4 top-4 text-white hover:scale-125 cursor-pointer transition-all duration-300"
                onClick={onClose}
            >
                <ReactIcon name="close_icon" size={32} />
            </button>
            <div className="absolute left-[50%] top-[50%] -translate-[50%] bg-white rounded-2xl lg:min-w-200 w-full lg:max-w-200 max-lg:max-w-[90%]"> 
                <div className="flex flex-col gap-4 p-6">
                    <div className="flex gap-10 justify-between items-center">
                        <h3 className="text-3xl font-medium italic font-serif">Create New Style</h3>
                        <button
                            role="button"
                            aria-label="Click this to close Editor Add Style Panel"
                            className="text-black hover:scale-125 cursor-pointer transition-all duration-300"
                            onClick={onClose}
                        >
                            <ReactIcon name="close_icon" size={32} />
                        </button>
                    </div>
                    <hr className="border-gray-200"></hr>
                    <Form action={handleAddNewStyleLocal} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-medium text-xl">Title: </label>
                            <input type="text" className="border border-gray-400 px-2 py-1 outline-none rounded-md" placeholder="Please enter your style name" name="name"></input>
                        </div>
                        {EditorStyleBarColorPickers.map((style) => (
                            <div key={style.title} className="flex gap-2 items-center">
                                <input 
                                    type="color" 
                                    id={style.title} className="outline-none w-10 h-10" 
                                    defaultValue={style.color ?? '#ffffff'}
                                    name={style.title}
                                    />
                                <label htmlFor={style.title} className="font-medium text-lg flex justify-between flex-1 text-foreground/60">
                                    <span>{style.title} Color </span>
                                    <ReactIcon size={25} name={"color_icon"} />
                                    </label>

                            </div>
                        ))}
                        <div className="flex gap-2 flex-wrap">
                            <button
                                role="button"
                                aria-label="Click this to close Editor Add Style Panel"
                                className="text-black flex-1"
                                onClick={onClose}
                            >
                                <PrimaryButton content="Cancle"/>
                            </button>
                            <button
                                role="button"
                                aria-label="Click this to close Editor Add Style Panel"
                                className="text-black flex-1 text-nowrap"
                                type="submit"
                            >
                                <PrimaryButton content="Create Style"/>
                            </button>
                        </div>

                    </Form>
                </div>
            </div>
        </div>,
        document.body
    )
        

    
}




import Form from "next/form";
import { theme } from "@/data/theme";
import { PrimaryButton } from "../button/primaryButton";
import { ReactIcon } from "../Icon/ReactIcon";
import { createPortal } from "react-dom";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useThemeActions, useThemeData, useThemeModel } from "@/theme/ThemeContext";
import toast from "react-hot-toast";
import { ValidationForAddNewStyle } from "@/utils/validation";

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

export const EditorAddStylePanel = () => {

    const { config } = useThemeData();
    const { updateConfig } = useThemeActions()

    const { triggerAddStylePanel } = useThemeActions();
    const { isAddStylePanelOpen } = useThemeModel();


    const handleClosePanel = useCallback(() => {
        
        triggerAddStylePanel(false);
    },[triggerAddStylePanel])


    const handleAddNewStyleLocal = useCallback((formData: FormData )=> {
        const { isSuccess, message, data, key } = ValidationForAddNewStyle(formData,config);
        if(!isSuccess){
            toast.error(message)
            return
        } else {
            toast.success(message);
            updateConfig(`colors.${key}`,data);
            handleClosePanel();
        }
    },[config])
    
    return  <EditorAddStylePanelWithPortal onClose={handleClosePanel} handleAddNewStyleLocal={handleAddNewStyleLocal} isOpen={isAddStylePanelOpen} />
        

    
}



const EditorAddStylePanelWithPortal = memo(({isOpen, handleAddNewStyleLocal, onClose} : {
    isOpen: boolean
    handleAddNewStyleLocal: (formData: FormData) => void
    onClose: () => void
}) => {

    useEffect(() => {
        if (!isOpen) return;
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = originalStyle; };
    }, [isOpen]);
    
    if(!isOpen) return
    return createPortal(
        <div className="fixed left-0 top-0 w-full h-full bg-black/60 z-19">
            <div className="absolute left-0 top-0 w-full h-full backdrop-blur cursor-pointer" onClick={onClose}></div>
            <div className="absolute left-[50%] top-[50%] -translate-[50%] border-3 box-shadow-lg bg-white rounded-2xl lg:min-w-200 w-full lg:max-w-200 max-lg:max-w-[90%]"> 
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
                        <MemorizeColorInput style={EditorStyleBarColorPickers[0]} />
                        <MemorizeColorInput style={EditorStyleBarColorPickers[1]} />
                        <MemorizeColorInput style={EditorStyleBarColorPickers[2]} />
                        <MemorizeColorInput style={EditorStyleBarColorPickers[3]} />
                        <div className="flex gap-2 flex-wrap">
                            <button
                                role="button"
                                aria-label="Click this to close Editor Add Style Panel"
                                className="text-black flex-1"
                                onClick={onClose}
                            >
                                <PrimaryButton content="Cancel"/>
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
},(prevProps,nextProps) => (
    prevProps.isOpen === nextProps.isOpen
)) 

const MemorizeColorInput = memo(({style}:{style:EditorStyleBarColorPickersType}) => {
    return (
        <div className="flex gap-2 items-center">
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
    )
},(prevProps,nextProps) => (
    prevProps.style.title === nextProps.style.title && prevProps.style.color === nextProps.style.color
))
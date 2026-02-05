"use client"

import { useTheme } from "@/theme/ThemeContext";
import { useEffect, useState } from "react";
import { StylePicker } from "./EditorStylePickder";
import { ReactIcon } from "../Icon/ReactIcon";
import { ColorPicker } from "./EditorColorPicker";
import { EditorAddStylePanel } from "./EditorAddStylePanel";
import { EditorValue, fieldSiteData, layoutSiteData, SocialLinksData } from "@/types";
import { articlesData, getArticleAsCustomBlog } from "@/data/articles/articles";
import { EditorHelper } from "./EditorHelper";
import toast from "react-hot-toast";



export const EditorSideBar = () => {

    // React State Data
    const [isAddStyleEditorOpen,setIsAddStyleEditorOpen] = useState(false);
    const [isOpenHelperEditor,setIsOpenHelperEditor] = useState(false);
    const [OpenEditColorMenu,setOpenEditColorMenu] = useState(false);
    const [openEditContentMenu,setOpenEditContentMenu] = useState(true);
    const [boxID,setBoxID] = useState<string | null>(null);

    const { themeOptions, config, resetConfig, selectedSiteData, layoutName} = useTheme();
    const { theme_mode } = config.config

    // Event
    const handleAddStyleEvent = () => {
        setIsAddStyleEditorOpen(true);  
    }

    const handleOnCloseEditorHelper = () => {

        setIsOpenHelperEditor(false);
        setBoxID(null);
    }

    const handleOpenHelperEditor = (box_id: string | null) => {
        if( window.innerWidth < 1024){
            setIsOpenHelperEditor(false);
            setBoxID(null);
            return;
        }
        setIsOpenHelperEditor(true);
        setBoxID(box_id);
    }

    const handleOpenColorMenu = () => {
        setOpenEditColorMenu(prev => !prev)
    }

    const handleOpenEditContentMenu = () => {
        setOpenEditContentMenu(prev => !prev)
    }

    useEffect(() => {
        setOpenEditColorMenu(true);
    },[theme_mode])




    return (
        <>
            <EditorAddStylePanel isOpen={isAddStyleEditorOpen} onClose={() => setIsAddStyleEditorOpen(false)} />
            <EditorHelper box_id={boxID} isOpen={isOpenHelperEditor} onClose={handleOnCloseEditorHelper} />
            <div className="h-full overflow-y-scroll">
                
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200 shadow-xs">
                        <h2 className="text-2xl">Sidebar</h2>
                        <button 
                            role="button"
                            aria-label="Click this to reset config"
                            className="text-xl cursor-pointer"
                            onClick={resetConfig}
                        >
                            Reset
                        </button>
                    </div>
                    <div className="px-4 flex flex-col gap-2 border-b pb-4 border-gray-200 shadow-xs">
                        <h3 className="text-xl font-medium italic">Quick Preset</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {themeOptions.map(style => (
                                <StylePicker key={style} style={style} />
                            ))}
                            <button 
                                role="button"
                                aria-label="Click this button to add new style"
                                className={`outline-none flex flex-col gap-2 items-center justify-center cursor-pointer px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-200 transition-background duration-300`}
                                onClick={handleAddStyleEvent}
                            >
                                
                                <div className="w-10 aspect-square flex items-center justify-center rounded-full overflow-hidden gap-0.5">
                                    <ReactIcon size={20} name="plus_icon" />
                                </div>
                                <span className="font-medium text-lg uppercase">ADD</span>
                            </button>
                        </div>
                    </div>
                    <div className="px-4 flex flex-col gap-2 border-b pb-4 border-gray-200 shadow-xs">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-medium italic">Colors Mode: {theme_mode.toUpperCase()}</h3>
                            <button
                                className="cursor-pointer"
                                onClick={handleOpenColorMenu}
                            >
                                {OpenEditColorMenu ?  <ReactIcon size={30} name="close_icon"/> : <ReactIcon size={30} name="plus_icon"/>}
                            </button>

                        </div>
                        <div className={`flex flex-col gap-2 ${OpenEditColorMenu === false && "hidden"}`}>
                            <ColorPicker theme_name={theme_mode} type={"LOCAL_UPDATE_PRIMARY"} title={"Primary"} color={config.colors[theme_mode].primary} />
                            <ColorPicker theme_name={theme_mode} type={"LOCAL_UPDATE_SECONDARY"} title={"Secondary"} color={config.colors[theme_mode].secondary} />
                            <ColorPicker theme_name={theme_mode} type={"LOCAL_UPDATE_BACKGROUND"} title={"Background"} color={config.colors[theme_mode].background} />
                            <ColorPicker theme_name={theme_mode} type={"LOCAL_UPDATE_FOREGROUND"} title={"Foreground"} color={config.colors[theme_mode].foreground} />
                        </div>
                    </div>
                    <div className="px-4 flex flex-col gap-2 border-b pb-4 border-gray-200 shadow-xs">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-medium italic">Layout Content:</h3>
                            <button
                                className="cursor-pointer"
                                onClick={handleOpenEditContentMenu}
                            >
                                {openEditContentMenu ? <ReactIcon size={30} name="close_icon"/> : <ReactIcon size={30} name="plus_icon"/>}
                            </button>
                            
                        </div>
                        <div className={`flex flex-col gap-4 ${openEditContentMenu === false && "hidden"}`}>
                            {Object.entries(selectedSiteData).map(([key,value]) => (
                                <EditorSiteMenu event={handleOpenHelperEditor} key={key} name={key} value={value}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export const EditorSiteMenu = ({name,value,event}:{name:string,value:fieldSiteData,event:(box_menu: string | null) => void}) => {
    const [openEditSectionMenu,setOpenEditSectionMenu] = useState(false);

    const handleOpenEditSectionMenu = () => {
        setOpenEditSectionMenu(prev => !prev)
    }

    return(
        <div className="flex flex-col gap-2 ">
            <div className="flex justify-between items-center">
                <h3 className="font-medium italic">{name.toUpperCase()} SECTION:</h3>
                <button
                    className="cursor-pointer"
                    onClick={handleOpenEditSectionMenu}
                >
                    {openEditSectionMenu ? <ReactIcon size={30} name="close_icon"/> : <ReactIcon size={30} name="plus_icon"/>}
                </button>
            </div>
            {openEditSectionMenu && 
                <div className="flex flex-col gap-4">
                    {Object.entries(value).map(([key,value]) => 
                        {
                            switch(typeof value){
                                case 'string':
                                    return <EditorSiteMenuField event={event} key={key} id={key} value={value} pathName={name}/>
                                
                                case "object":
                                    if(Array.isArray(value)) 
                                        return <EditorSiteMenuListNumber key={key} id={key} value={value} />
                                    else
                                        return <EditorSiteMenuImage key={key} id={key} value={value} />

                                default: return (
                                    <div key={key} className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-base font-medium uppercase" htmlFor={key}>{key}</label>
                                            <span className="text-foreground/20"><ReactIcon size={24} name="circle_question_icon" /></span>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    )}      
                </div>
            }

        </div>
    )   
}

export const EditorSiteMenuField = ({id,value,pathName,event}:{id:string,value:string,pathName: string,event: (box_menu:string | null) => void}) => {
    const ids = id.split("_");

    const { layoutName,updateNestedSiteData,iframeRef } = useTheme();

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatePathName = `${layoutName}.${pathName}.${id}`
        updateNestedSiteData(updatePathName,e.target.value)
        iframeRef.current?.contentWindow?.postMessage({
            type:"UPDATE_CONTENT_FIELD",
            payload:{
                updatePathName,
                value: e.target.value
            }
        },"*")
    }

    const getBoxFromElementId = (id: string): string | null => {

        return id;
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <label className="text-base font-medium uppercase" htmlFor={`input_${id}`}>Field ID: {ids[ids.length-1]}</label>
                <button 
                    role="button"
                    className="text-foreground/20 hover:text-foreground cursor-pointer transition-color duration-300 outline-none"
                    title={`Clikc this to go to element with ID: ${id}`}
                    onClick={() => event(getBoxFromElementId(id))}
                >
                    <ReactIcon 
                        size={24} 
                        name="circle_question_icon" 
                    />
                </button>
            </div>
            <input 
                type="text" 
                id={`input_${id}`}
                name="key" 
                defaultValue={value || 'Empty'} 
                className="border-2 px-2 font-mono py-1 rounded-md outline-none border-foreground/20"
                onChange={updateField}
            />
        </div>
    )
}

export const EditorSiteMenuListNumber = ({id,value}:{id:string,value:number[]}) => {

    const articles = getArticleAsCustomBlog(value);
    const ids = id.split("_");
    return (
        <div className="flex flex-col gap-4 py-4">
            <div className="flex justify-between items-center">
                <label className="text-base font-medium uppercase" htmlFor={id}>Articles ID: {ids[ids.length-1]}</label>
                <span 
                    className="text-foreground/20"
                    title={`Clikc this to go to articles with ID: ${id}`}
                >
                    <ReactIcon 
                        size={24} 
                        name="circle_question_icon" 
                    />
                </span>
            </div>
            <ul className="flex flex-col gap-2">
                {articles.map((article,index) => (
                    <li key={index} className="flex justify-between items-center">
                        <select 
                            name={article.id.toString()} 
                            id={article.id.toString()} 
                            defaultValue={article.id} 
                            className="border w-full p-1 px-2 font-medium border-gray-400 rounded-md"
                            onChange={e => console.log(e.target.value)}
                        >
                            {articlesData.map((article) => (
                                <option key={article.id} value={article.id}>{article.title}</option>
                            ))}
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const EditorSiteMenuImage = ({id,value}:{id:string,value: EditorValue}) => {
    const ids = id.split("_");
    const imageTypeProperties = {
        src: "text",
        alt: "text",
        width: "number",
        height: "number"
    }
    if(value.type === 'image') {
        return (
            <div className="flex flex-col gap-4 py-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-base font-medium uppercase">Image ID: {ids[ids.length-1]}</h3>
                    <span 
                        className="text-foreground/20"
                        title={`Clikc this to go to Image with ID: ${id}`}
                    >
                        <ReactIcon 
                            size={24} 
                            name="circle_question_icon" 
                        />
                    </span>
                </div>
                <div className="flex flex-col gap-4">
                    {Object.entries(imageTypeProperties).map(([key,props],index) => {
                        const val = value[key as keyof EditorValue];
                        return (
                            <div key={key} className="flex justify-between items-center">
                                <label className="text-sm font-medium uppercase min-w-20" htmlFor={`${key} - ${index}`}>{key} : </label>
                                <input type={props || 'text'} id={`${key} - ${index}`} name="key" defaultValue={val} className="border-2 px-2 font-mono py-1 rounded-md outline-none border-foreground/20 flex-1"></input>
                            </div>                                
                        )

                    })}
                </div>
            </div>
        )
    }

    if(value.type === 'social') {
        return (
            <div className="flex flex-col gap-4 py-4">
                <div className="flex justify-between items-center">
                    <label className="text-base font-medium uppercase" htmlFor={id}>Social</label>
                    <span className="text-foreground/20"><ReactIcon size={24} name="circle_question_icon" /></span>
                    <div></div>
                </div>
            </div>
        )
    }

    return null;
}


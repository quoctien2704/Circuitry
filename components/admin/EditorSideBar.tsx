"use client"

import { useThemeData,useThemeActions, useThemeModel } from "@/theme/ThemeContext";
import { useEffect, useMemo, useState } from "react";
import { StylePicker } from "./EditorStylePickder";
import { ReactIcon } from "../Icon/ReactIcon";
import { ColorPicker } from "./EditorColorPicker";
import { EditorAddStylePanel } from "./EditorAddStylePanel";
import { EditorValue, SocialLinksData } from "@/types";
import { fieldSiteData, layoutSiteData} from "@/types/types";
import { articlesData, getArticleAsCustomBlog } from "@/data/articles/articles";
import { EditorHelper } from "./EditorHelper";
import Image from 'next/image'
import toast from "react-hot-toast";
import { globalImages } from "@/data/images/images";
import { createPortal } from "react-dom";
import { EditorStyleSelectedMenu } from "./EditorStyleSelectedMenu";
import { EditorColorMenu } from "./EditorColorMenu";



export const EditorSideBar = () => {


    const [OpenEditColorMenu,setOpenEditColorMenu] = useState(false);
    const [openEditContentMenu,setOpenEditContentMenu] = useState(true);

    // const [isAddStyleEditorOpen,setIsAddStyleEditorOpen] = useState(false);
    // const [isOpenHelperEditor,setIsOpenHelperEditor] = useState(false);
    // const [boxID,setBoxID] = useState<string | null>(null);

    // const { themeOptions, config, resetConfig, selectedSiteData, layoutName} = useTheme();

    const { config } = useThemeData();
    
   

    const themeMode = useMemo(() => config.config.theme_mode,[config.config.theme_mode])
    const themeOptions = useMemo(() => config.colors,[config.colors])

    const selectedStyle = useMemo(() => ({
        primary: config.colors[themeMode].primary,
        secondary: config.colors[themeMode].secondary,
        background: config.colors[themeMode].background,
        foreground: config.colors[themeMode].foreground
    }),[themeMode])

    // Event
    // const handleAddStyleEvent = () => {
    //     setIsAddStyleEditorOpen(true);  
    // }

    // const handleOnCloseEditorHelper = () => {


    //     // Note: I Still don't know how to fix it when you are on mobile mode so please don't resize it on mobile mode xd
    //     setIsOpenHelperEditor(false);
    //     setBoxID(null);
    // }

    // const handleOpenHelperEditor = (box_id: string | null) => {
    //     setIsOpenHelperEditor(true);
    //     setBoxID(box_id);
    // }

    const handleOpenColorMenu = () => {
        setOpenEditColorMenu(prev => !prev)
    }

    const handleOpenEditContentMenu = () => {
        setOpenEditContentMenu(prev => !prev)
    }



    return (
        <>
            {<EditorAddStylePanel />}
            {/* <EditorAddStylePanel isOpen={isAddStyleEditorOpen} onClose={() => setIsAddStyleEditorOpen(false)} />
            <EditorHelper box_id={boxID} isOpen={isOpenHelperEditor} onClose={handleOnCloseEditorHelper} /> */}
            <div className="h-full overflow-y-scroll">
                
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200 shadow-xs">
                        <h2 className="text-2xl">Sidebar</h2>
                        <button 
                            role="button"
                            aria-label="Click this to reset config"
                            className="text-xl cursor-pointer"
                            // onClick={resetConfig}
                        >
                            Reset
                        </button>
                    </div>
                    <EditorStyleSelectedMenu themeOptions={themeOptions} themeMode={themeMode} />
                    <EditorColorMenu selectedStyle={selectedStyle} themeMode={themeMode} />
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
                            {/* {Object.entries(selectedSiteData).map(([key,value]) => {
                                return <EditorSiteMenu event={handleOpenHelperEditor} key={key} name={key} value={value}/>
                            })} */}
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
                            switch(value.type){
                                case "text": 
                                    return <EditorTextField event={event} key={key} id={key} pathName={name} />
                                case "articles":
                                    return <EditorArticlesField pathName={name} key={key} id={key} event={event} />

                                default:
                                        return <div key={key}>Type {value.type} Not Exist</div>;
                            }
                            // if(!value.type)
                            // switch(typeof value){
                            //     case 'string':
                            //         return <EditorSiteMenuField event={event} key={key} id={key} pathName={name}/>
                                
                            //     case "object":
                            //         if(Array.isArray(value)) 
                            //             return <EditorSiteMenuListNumber pathName={name} key={key} id={key} value={value} event={event} />
                            //         else
                            //             return <EditorSiteMenuImage pathName={name} key={key} id={key} value={value} event={event} />

                            //     default: return (
                            //         <div key={key} className="flex flex-col gap-2">
                            //             <div className="flex justify-between items-center">
                            //                 <label className="text-base font-medium uppercase" htmlFor={key}>{key}</label>
                            //                 <span className="text-foreground/20"><ReactIcon size={24} name="circle_question_icon" /></span>
                            //             </div>
                            //         </div>
                            //     )
                            // }
                        }
                    )}      
                </div>
            }

        </div>
    )   
}

interface SiteMenuFieldType {
    id:string,
    pathName: string,
    event: (box_menu:string | null) => void
}

export const EditorTextField = ({id,pathName,event}:SiteMenuFieldType) => {
    const ids = id.split("_");
    
    const { layoutName, updateNestedSiteData, iframeRef, selectedSiteData, getDeep } = useTheme();

    const getPathName = `${pathName}.${id}.data`
    const setPathName = `${layoutName}.${pathName}.${id}.data`    

    const defaultValue = getDeep(selectedSiteData,getPathName);

    const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateNestedSiteData(setPathName,e.target.value)
        iframeRef.current?.contentWindow?.postMessage({
            type:"UPDATE_CONTENT_FIELD",
            payload:{
                setPathName,
                value: e.target.value
            }
        },"*")
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <label className="text-base font-medium uppercase" htmlFor={`input_${id}`}>Field ID: {ids[ids.length-1]}</label>
                <button 
                    role="button"
                    className="text-foreground/20 hover:text-foreground cursor-pointer transition-color duration-300 outline-none"
                    title={`Clikc this to go to element with ID: ${id}`}
                    onClick={() => event(id)}
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
                value={defaultValue ?? ''} 
                className="border-2 px-2 font-mono py-1 rounded-md outline-none border-foreground/20"
                onChange={updateField}
            />
        </div>
    )
}



interface SiteMenuArticlesType {
    id:string,
    pathName: string,
    event: (box_menu:string | null) => void
}

export const EditorArticlesField = ({id,pathName,event}:SiteMenuArticlesType) => {
    
    const { updateNestedSiteData, iframeRef, selectedSiteData, getDeep } = useTheme();
    const ids = id.split("_");
    const getPathName = `${pathName}.${id}.data`

    const defaultValue: number[] = getDeep(selectedSiteData,getPathName) || [];
    const articles = getArticleAsCustomBlog(defaultValue);

    const updateField = (e: React.ChangeEvent<HTMLSelectElement>,index: number) => {
        const value = parseInt(e.target.value)
        const setPathName = `${pathName}.${id}.data.${index}`
        console.log(setPathName)
        updateNestedSiteData(setPathName,value)
        iframeRef.current?.contentWindow?.postMessage({
            type:"UPDATE_CONTENT_ARTICLES",
            payload:{
                setPathName,
                value: value
            }
        },"*")
    }

    return (
        <div className="flex flex-col gap-4 py-4">
            <div className="flex justify-between items-center">
                <label className="text-base font-medium uppercase" htmlFor={id}>Articles ID: {ids[ids.length-1]}</label>
                <button 
                    role="button"
                    className="text-foreground/20 hover:text-foreground cursor-pointer transition-color duration-300 outline-none"
                    title={`Clikc this to go to element with ID: ${id}`}
                    onClick={() => event(id)}
                >
                    <ReactIcon 
                        size={24} 
                        name="circle_question_icon" 
                    />
                </button>
            </div>
            <ul className="flex flex-col gap-2">
                {articles.map((article,index) => (
                    <li key={index} className="flex justify-between items-center">
                        <select 
                            name={article.id.toString()} 
                            id={article.id.toString()} 
                            defaultValue={article.id} 
                            className="border w-full p-1 px-2 font-medium border-gray-400 rounded-md"
                            onChange={e => updateField(e,index)}
                        >
                            {articlesData.map((globalArticle) => (
                                <option  disabled={defaultValue.includes(globalArticle.id)} key={globalArticle.id} value={globalArticle.id}>{globalArticle.title}</option>
                            ))}
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    )
}

interface imageTypeProperties { 
    src: string,
    alt: string,
    width: number,
    height: number
}

export const EditorSiteMenuImage = ({id,value,pathName,event}:{id:string,value: EditorValue,pathName: string,event: (box_menu:string | null) => void}) => {


    const { layoutName, updateNestedSiteData, iframeRef, selectedSiteData, getDeep } = useTheme();
    const ids = id.split("_");

    const defaultValue: imageTypeProperties = getDeep(selectedSiteData,`${pathName}.${id}`) || {src:"",alt:"",width:0,height:0};

    const updateField = (e: React.ChangeEvent<HTMLInputElement>,src: string) => {
        let value;
        const updatePathName = `${layoutName}.${pathName}.${id}.${src}`
        switch(src){
            case "src":
                value = e.target.value;
            break;
            case "alt":
                value = e.target.value;
            break;
            case "width":
                value = parseInt(e.target.value)
            break;
            case "height":
                value = parseInt(e.target.value)
            break;
        }
        
        updateNestedSiteData(updatePathName,value)
        iframeRef.current?.contentWindow?.postMessage({
            type:"UPDATE_CONTENT_IMAGE",
            payload:{
                updatePathName,
                value: value
            }
        },"*")
    }

    const updateImage = (imageVariable: string) => {
        const updatePathName = `${layoutName}.${pathName}.${id}.src`
        updateNestedSiteData(updatePathName,imageVariable)
        iframeRef.current?.contentWindow?.postMessage({
            type:"UPDATE_CONTENT_IMAGE",
            payload:{
                updatePathName,
                value: imageVariable
            }
        },"*")
    }

    if(value.type === 'image') {
        return (
            <div className="flex flex-col gap-4 py-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-base font-medium uppercase">Image ID: {ids[ids.length-1]}</h3>
                    <button 
                        role="button"
                        className="text-foreground/20 hover:text-foreground cursor-pointer transition-color duration-300 outline-none"
                        title={`Clikc this to go to element with ID: ${id}`}
                        onClick={() => event(id)}
                    >
                        <ReactIcon 
                            size={24} 
                            name="circle_question_icon" 
                        />
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    {Object.entries(defaultValue).map(([key,props],index) => {
                        if(props==='image') return;
                        const type = (typeof props === 'string') ? "text" : 'number'
                        let val = props;
                        if(key === 'src') {
                          return (
                                <div 
                                    key={key} 
                                    className="flex justify-between items-center"
                                >
                                    <label 
                                        className="text-sm font-medium uppercase min-w-20" 
                                        htmlFor={`${key} - ${index}`}>{key} : 
                                    </label>
                                    <ImageSelect onUpdateImage={updateImage} src={props}/>
                                    
                                </div>                                
                            )  
                        }
                        else {
                            return (
                                <div 
                                    key={key} 
                                    className="flex justify-between items-center"
                                >
                                    <label 
                                        className="text-sm font-medium uppercase min-w-20" 
                                        htmlFor={`${key} - ${index}`}>{key} : 
                                    </label>
                                    <input  
                                        type={type} 
                                        id={`${key} - ${index}`} 
                                        name={`${key} - ${index}`}
                                        value={val} 
                                        onChange={e => updateField(e,key)}
                                        className="border-2 px-2 font-mono py-1 rounded-md outline-none border-foreground/20 flex-1"
                                    />
                                </div>                                
                            )
                        }
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

    if(value.type === 'category') {
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

const ImageSelect = ({src,onUpdateImage}:{src:string,onUpdateImage: (imageVariable: string) => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    setIsOpen(false);
    setSelected(src);
  },[src])

  const handleOpenGrallery = () => {
    setIsOpen(true);
  }
  const handleCloseGrallery = () => {
    setIsOpen(false)
  }

  const handleImageSelectedGrallery = (selectedImageID: string) => {
    //setSelected(selectedImageID)
    onUpdateImage(selectedImageID);
    handleCloseGrallery();
  }

  if(!selected) return;
  return (
    <div 
        
        className="cursor-pointer relative"
    >
        <Image 
            onClick={handleOpenGrallery}
            className="aspect-square object-cover rounded-xl"
            width={100}
            height={100}
            alt={`Image with ID: ${selected}`}
            loading="lazy"
            src={selected}
        />
        
        {isOpen && <ImageGrallery onHandleImageSelectedGrallery={handleImageSelectedGrallery} onClose={handleCloseGrallery}/>}
    </div>
  )
}
const ImageGrallery = ({onClose,onHandleImageSelectedGrallery}:{onClose:() => void,onHandleImageSelectedGrallery: (selectedImageID: string) => void}) => {
    
    const [searchBar,setSearchBar] = useState('');
    const [selectedTab,setSelectedTab] = useState('');
    
    const formattedImage = useMemo(() => {
        return Object.keys(globalImages).map(key => ({
            key: key,
            label: key.slice(0,1).toUpperCase() + key.slice(1,key.length - 1),
            images: globalImages[key]
        }))
    },[globalImages])


    const allImages = useMemo(() => {
        // Lấy tất cả các object con (ví dụ: các object chứa article_1, article_2,...)
        return Object.values(globalImages).flatMap(categoryObj => 
            // Lấy tất cả values (URL) trong từng object đó
            Object.entries(categoryObj)
        );
    }, [globalImages]);
    
    return createPortal(
        <div className="fixed left-0 top-0 w-full h-full bg-black/20">
            <div 
                className="absolute left-0 top-0 w-full h-full"
                onClick={onClose}
            />
            <div className="absolute left-[50%] top-[50%] -translate-[50%] z-3 w-[80%] h-[80%]">
                
                <div className="bg-white p-8 flex flex-col gap-4 rounded-xl h-full">
                    <div className="flex gap-10">
                        <div className="flex-1 flex gap-4 items-center">
                            <ReactIcon size={35} name="image_search_icon" />
                            <div className="flex flex-col gap-px">
                                <h3 className="text-3xl font-medium">Select Images</h3>
                                <p className="text-foreground/80">Browse and manage your visual assets</p>
                            </div>
                        </div>
                        <button>
                            <ReactIcon size={35} name="circle_question_icon" />
                        </button>
                        <button>
                            <ReactIcon size={35} name="close_icon" />
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Search image by name"
                            value={searchBar}
                            className="w-full border-2 outline-none p-2 border-foreground/30 rounded-lg"
                            onChange={e => setSearchBar(e.target.value)}
                        />
                        <div
                            className="border-2 border-foreground/30 rounded-lg px-2 flex items-center justify-center"
                        >
                            <select 
                                value={selectedTab} 
                                className="outline-none font-medium"
                                onChange={e => setSelectedTab(e.target.value)}
                            >
                                <option disabled={selectedTab === ''} value={''}>All Types</option>
                                
                                {formattedImage && formattedImage.length > 0 && formattedImage.map(tab => (
                                    <option disabled={tab.key === selectedTab} key={tab.key} value={tab.key}>{tab.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    { selectedTab === '' ? <div className=" grid grid-cols-5 gap-2 overflow-y-scroll h-full">
                        {allImages.map(([key,value]) => (
                            <div key={key} className=" flex flex-col gap-2 group cursor-pointer">
                                <div 
                                    className="rounded-xl overflow-hidden relative"
                                    onClick={() => onHandleImageSelectedGrallery(value)}
                                >
                                    <Image 
                                        className="object-cover aspect-square w-full transition-transform duration-300 group-hover:scale-110"
                                        width={400}
                                        height={400}
                                        alt={`Image with ID: ${key}`}
                                        loading="lazy"
                                        src={value}
                                    />
                                    <div className="absolute left-0 top-0 w-full h-full bg-black/50"></div>
                                    <span className="absolute left-4 bottom-4 text-center text-white font-medium italic">{key}</span>
                                </div>
                            </div>
                        ))}
                    </div> : <div className=" grid grid-cols-5 gap-2 overflow-y-scroll h-full">
                        {Object.entries(globalImages[selectedTab]).map(([key,value]) => (
                            <div key={key} className=" flex flex-col gap-2 group cursor-pointer">
                                <div 
                                    className="rounded-xl overflow-hidden relative"
                                    onClick={() => onHandleImageSelectedGrallery(value)}
                                >
                                    <Image 
                                        className="object-cover aspect-square w-full transition-transform duration-300 group-hover:scale-110"
                                        width={400}
                                        height={400}
                                        alt={`Image with ID: ${key}`}
                                        loading="lazy"
                                        src={value}
                                    />
                                    <div className="absolute left-0 top-0 w-full h-full bg-black/50"></div>
                                    <span className="absolute left-4 bottom-4 text-center text-white font-medium italic">{key}</span>
                                </div>

                            </div>
                        ))}
                    </div>}
                    {/* <div className="grid grid-cols-5  gap-4">
                        {tabs.map((tabKey) => (
                            <div key={tabKey}>
                                {tabKey}
                            </div>
                            // <div key={key} className="flex flex-col gap-2 relative rounded-xl overflow-hidden">
                                
                            //     <Image 
                            //         className="aspect-square object-cover w-full"
                            //         width={400}
                            //         height={400}
                            //         alt={`Image with ID: ${key}`}
                            //         loading="lazy"
                            //         src={value}
                            //     />
                            //     <div className="absolute left-0 top-0 w-full h-full bg-black/30"></div>
                            //     <span className="absolute left-4 bottom-4 text-center text-white font-medium italic">{key}</span>
                            // </div>
                        ))}
                    </div> */}
                </div>

            </div>
        </div>
    ,
    document.body)

}
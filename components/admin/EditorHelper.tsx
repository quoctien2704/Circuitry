import { BoundingBox } from "@/types/item"
import { ScrollToTop, ScrollToTopPosition } from "../Interactive/ScrollToTop"
import { useEffect, useState } from "react"
import { useTheme } from "@/theme/ThemeContext"
import next from "next"

export const EditorHelper = ({isOpen,onClose,box_id}:{isOpen:boolean,onClose: () => void,box_id: string | null}) => {
    
    const { iframeRef } = useTheme();   
    const [box, setBox] = useState<BoundingBox | null>(null);
    

    useEffect(() => {
        
        const updateBox = () => {
            const nextBox = getBoxFromElementId(box_id || '');
            if(!nextBox === null) return null
            setBox(nextBox);
            return nextBox;
        }

        const updatePosition = (bounding_box: BoundingBox | null) => {
            if(!bounding_box) return;
            iframeRef.current?.contentWindow?.scrollTo({
                top: (bounding_box?.top || 0) + (iframeRef.current?.contentWindow?.scrollY || 0)  -window.innerHeight / 2 + (bounding_box.height/2),
                behavior: "smooth",
            });
        }

        const nextBox = updateBox();
        updatePosition(nextBox);

        iframeRef.current?.contentWindow?.addEventListener('resize',() => {
            const nextBox = updateBox();
            updatePosition(nextBox);
        })
        iframeRef.current?.contentWindow?.addEventListener('scroll',updateBox)
        return () => {
            iframeRef.current?.contentWindow?.removeEventListener('resize',() => {
                const nextBox = updateBox();
                updatePosition(nextBox);
            })
            iframeRef.current?.contentWindow?.removeEventListener('scroll',updateBox)
        }

        

    },[box_id])
    

    const getBoxFromElementId = (id: string): BoundingBox | null => {
        const iframe = iframeRef.current;
        if (!iframe) return null;

        const doc = iframe.contentDocument;
        if (!doc) return null;

        const el = doc.getElementById(id || '');
        if (!el) return null;

        const elRect = el.getBoundingClientRect();
        const iframeRect = iframe.getBoundingClientRect();
        
        return {
            left: iframeRect.left + elRect.left,
            top: iframeRect.top + elRect.top,
            width: elRect.width,
            height: elRect.height,
        };
    };

    if(!box || !isOpen) return
    const padding = 12
    return (
        <div className="fixed left-0 top-0 w-full h-full bg-black/60 mix-blend-multiply">
            <button className="sticky w-full h-full z-29 isolate" onClick={onClose}></button>
            <div
                className="absolute pointer-events-none z-30 animate-pulse"
                    style={{
                        left: box?.left - padding,
                        top: box?.top - padding ,
                        width: box?.width + padding * 2,
                        height: box?.height + padding * 2,
                }}
            >
                
                <div className="bg-white overflow-hidden w-full h-full mix-blend-screen border-2 border-primary rounded-xl border-dotted"></div>
            </div>
        </div>

    )
}
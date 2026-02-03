"use client"
import { ScrollToTop } from "@/components/Interactive/ScrollToTop";
import { MoonLoader } from "react-spinners";
export default function Loading() {
    return <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <ScrollToTop />
        <MoonLoader loading={true} size={64} />
    </div>
}
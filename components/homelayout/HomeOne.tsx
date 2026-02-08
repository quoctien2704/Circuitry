"use client";
import { HomeArticleList } from "@/components/home/global/HomeArticleList";
import { HomeCategory } from "@/components/home/layout_one/HomeCategory";
import { HomeLastestBlog } from "@/components/home/layout_one/HomeLatestBlog";
import { HomeSlider } from "@/components/home/layout_one/HomeSlider";
import { HomeSubscribe } from "@/components/home/layout_one/HomeSubscribe";
import { HomeTrending } from "@/components/home/layout_one/HomeTrending";
import { useEffect } from "react";

export default function HomeOne() {

    // const { iframeRef } = useTheme();

    // useEffect(() => {
    //     window.parent.postMessage({
    //         type:"UPDATE_LAYOUT_NAME",
    //         payload: "home.layout_1"
    //     },"*")
    // },[])

    return (
        <>
            <HomeSlider />
            {/* <HomeCategory />
            <HomeLastestBlog />
            <HomeTrending />
            <HomeArticleList />
            <HomeSubscribe /> */}
        </>
    )
}
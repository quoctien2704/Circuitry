import { HomeArticleList } from "@/components/home/global/HomeArticleList";
import { HomeSliderTwo } from "../home/layout_two/HomeSliderTwo";
import { HomeBlogTwo } from "../home/layout_two/HomeBlogTwo";
import { HomeColumnTwo } from "../home/layout_two/HomeColumnTwo";
import { HomeLatestTwo } from "../home/layout_two/HomeLatestTwo";
import { HomeBannerTwo } from "../home/layout_two/HomeBlogBannerTwo";
import { HomeSubscribeTwo } from "../home/layout_two/HomeSubscribeTwo";
import { useTheme } from "@/theme/ThemeContext";
import { useEffect } from "react";

export default function HomeTwo() {

    const { iframeRef } = useTheme();

    useEffect(() => {
        window.parent.postMessage({
            type:"UPDATE_LAYOUT_NAME",
            payload: "home.layout_2"
        },"*")
    },[])

    return (
        <>
            <HomeSliderTwo />
            <HomeBlogTwo />
            <HomeColumnTwo />
            <HomeBannerTwo />
            <HomeLatestTwo />
            <HomeArticleList />
            <HomeSubscribeTwo />
        </>
    )
}
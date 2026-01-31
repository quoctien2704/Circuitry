import { HomeArticleList } from "@/components/home/global/HomeArticleList";
import { HomeHeroThree } from "../home/layout_three/HomeHeroThree";
import { HomeFeaturedGrid } from "../home/layout_three/HomeFeaturedGrid";
import { HomeVideoSection } from "../home/layout_three/HomeVideoSection";
import { HomeGallery } from "../home/layout_three/HomeGallery";
import { HomeSubscribeThree } from "../home/layout_three/HomeSubscribeThree";

export default function HomeThree() {
    return (
        <>
            <HomeHeroThree />
            <HomeFeaturedGrid />
            <HomeVideoSection />
            <HomeArticleList />
            <HomeGallery />
            <HomeSubscribeThree />
        </>
    )
}
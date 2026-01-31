import { HomeArticleList } from "@/components/home/global/HomeArticleList";
import { HomeBreakingNews } from "../home/layout_four/HomeBreakingNews";
import { HomeMainContentFour } from "../home/layout_four/HomeMainContentFour";
import { HomePromoBanner } from "../home/layout_four/HomePromoBanner";
import { HomePopularCategory } from "../home/layout_four/HomePopularCategory";
import { HomeNewsletterBox } from "../home/layout_four/HomeNewsletterBox";

export default function HomeFour() {
    return (
        <>
            <HomeBreakingNews />
            <HomeMainContentFour />
            <HomePromoBanner />
            <HomePopularCategory />
            <HomeArticleList />
            <HomeNewsletterBox />
        </>
    )
}

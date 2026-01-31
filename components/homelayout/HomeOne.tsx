import { HomeArticleList } from "@/components/home/global/HomeArticleList";
import { HomeCategory } from "@/components/home/layout_one/HomeCategory";
import { HomeLastestBlog } from "@/components/home/layout_one/HomeLatestBlog";
import { HomeSlider } from "@/components/home/layout_one/HomeSlider";
import { HomeSubscribe } from "@/components/home/layout_one/HomeSubscribe";
import { HomeTrending } from "@/components/home/layout_one/HomeTrending";

export default function HomeOne() {
    return (
        <>
            <HomeSlider />
            <HomeCategory />
            <HomeLastestBlog />
            <HomeTrending />
            <HomeArticleList />
            <HomeSubscribe />
        </>
    )
}
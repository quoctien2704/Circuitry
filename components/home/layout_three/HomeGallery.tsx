import { homeLayoutThreeData } from "@/data/sitedata"
import { ArtcileGralleryItem } from "../../article/article_item"
import { getArticleAsCustomBlog } from "@/data/articles/articles"

/**
 * Renders a stylized gallery section with a grid of article items.
 * Optimized for ThemeForest:
 * - Semantic SEO: Fixed heading hierarchy (avoiding h3/h4 for purely visual styles).
 * - Accessibility: Added aria-label for the gallery grid.
 * - Robustness: Safe data mapping with unique keys.
 */

export function HomeGallery() {
    const galleryData = homeLayoutThreeData?.gallery || {};
    const galleryItems = getArticleAsCustomBlog(galleryData.articles) || [];

    return (
        <section className="my-40 max-lg:my-20" aria-labelledby="gallery-main-title">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-4">

                    {/* Stylized Header Group */}
                    <div className="flex flex-col items-center justify-center text-center">
                        <span className="text-5xl max-lg:text-2xl text-secondary font-bold block">
                            {galleryData.title?.top}
                        </span>
                        <h2
                            id="gallery-main-title"
                            className="text-6xl max-lg:text-3xl -mt-4 font-bold bg-[rgba(255,255,255,0.75)] dark:bg-[rgba(0,0,0,0.25)] shadow-lg py-2 px-10 relative z-3 text-primary uppercase tracking-tight"
                        >
                            {galleryData.title?.mid}
                        </h2>
                        <span className="text-5xl max-lg:text-2xl -mt-4 text-secondary font-bold block">
                            {galleryData.title?.bottom}
                        </span>
                    </div>

                    {/* Gallery Grid */}
                    <div
                        className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 mt-8"
                        role="list"
                        aria-label="Photo gallery articles"
                    >
                        {galleryItems.map((article, index) => (
                            <div key={article.id || index} role="listitem">
                                <ArtcileGralleryItem article={article} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
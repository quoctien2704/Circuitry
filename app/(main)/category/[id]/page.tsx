import { BreadCrumb } from "@/components/breadcrumb/breadcrumb";
import { CategoryArticleList } from "@/components/category/CategoryArticleList";
import { CategoryImage } from "@/components/category/CategoryImage";
import { BreadCrumbData } from "@/types/item";
import { capitalize } from "@/utils/helper";
import { categoriesData } from "@/data/category/category";
import type { Metadata } from "next";

export async function generateMetadata(
    { params }: { params: { id: number } }
): Promise<Metadata> {

    const { id } = await params;
    const category = categoriesData.find(
        (item) => item.id === id
    );

    if (!category) {
        return {
            title: "Category Not Found | Circuitry",
            robots: { index: false, follow: false }
        };
    }

    return {
        metadataBase: new URL("https://circuitry-demo.vercel.app"),
        title: `${category.name}`,
        description:
            `Explore articles about ${category.name} covering electronics, tech accessories, and modern gadgets.`,

        alternates: {
            canonical: `/category/${category.slug}`
        },

        openGraph: {
            type: "website",
            locale: "en_US",
            url: `https://circuitry-demo.vercel.app/category/${category.slug}`,
            siteName: "Circuitry",
            title: `${category.name} | Circuitry`,
            description:
                `Latest articles and guides about ${category.name}.`,
            images: [{ url: 'book.ico' }]
        },

        twitter: {
            card: "summary_large_image",
            title: `${category.name} | Circuitry`,
            description:
                `Read the latest posts about ${category.name}.`,
            creator: "@circuitry"
        },

        robots: {
            index: true,
            follow: true
        },

        category: "technology"
    };
}
export default async function CategoryPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const breadCrumbData: BreadCrumbData = [
        {
            title: "Home",
            href: "/"
        },
        {
            title: "Category",
            href: "/category"
        },
        {
            title: capitalize(id) as string,
            href: `/category/${id}` as string
        }
    ]

    return (
        <div className="min-h-[80vh]">
            <CategoryImage />
            <BreadCrumb data={breadCrumbData} />
            <CategoryArticleList category={id} />
        </div>
    );
}

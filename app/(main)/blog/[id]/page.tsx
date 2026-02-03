import type { Metadata } from "next";
import { getBlogByID } from "@/data/blogs/blogs";

export async function generateMetadata(
    { params }: { params: { id: string } }
): Promise<Metadata> {
    const { id } = await params;
    const blogId = Number(id);

    if (Number.isNaN(blogId)) {
        return {
            title: "Article Not Found | Circuitry",
            robots: { index: false, follow: false }
        };
    }

    const blog = getBlogByID(blogId);

    if (!blog) {
        return {
            title: "Article Not Found | Circuitry",
            robots: { index: false, follow: false }
        };
    }

    return {
        title: blog.name,
        description:
            blog.name ??
            "Read the latest technology and electronics articles on Circuitry.",

        alternates: {
            canonical: `/blog/${blog.id}`
        },

        openGraph: {
            type: "article",
            url: `/blog/${blog.id}`,
            title: `${blog.name} | Circuitry`,
            description:
                blog.name ??
                "Technology and electronics insights on Circuitry.",
            images: [
                {
                    url: 'book.ico'
                }
            ]
        },

        twitter: {
            card: "summary_large_image",
            title: `${blog.name} | Circuitry`,
            description:
                blog.name ??
                "Read this technology article on Circuitry.",
        },

        robots: {
            index: true,
            follow: true
        },

        category: "technology"
    };
}

import { BlogImage } from "@/components/blog/BlogImage";
import { BlogList } from "@/components/blog/BlogList";
import { BreadCrumb } from "@/components/breadcrumb/breadcrumb";
import { BreadCrumbData } from "@/types/item";

export default async function BlogPage({ params }: { params: { id: number } }) {
    const { id } = await params;
    const data = getBlogByID(id)
    const breadCrumbData: BreadCrumbData = [
        {
            title: "Home",
            href: "/"
        },
        {
            title: "Blog",
            href: "/blog"
        },
        {
            title: data?.name as string,
            href: data?.link as string
        }
    ]
    return (
        <div className="min-h-[80vh]">
            <BlogImage title={`Blog ${id} Page`} />
            {data && <BreadCrumb data={breadCrumbData} />}
            <BlogList id={id} />
        </div>
    )
}

import type { Metadata } from "next";
import { getAuthorByID } from "@/data/authors/authors";

export async function generateMetadata(
    { params }: { params: { id: string } }
): Promise<Metadata> {
    const { id } = await params;
    const authorId = Number(id);

    if (Number.isNaN(authorId)) {
        return {
            title: "Author Not Found | Circuitry",
            robots: { index: false, follow: false }
        };
    }

    const author = getAuthorByID(authorId);

    if (!author) {
        return {
            title: "Author Not Found | Circuitry",
            robots: { index: false, follow: false }
        };
    }

    return {
        title: author.name,
        description:
            author.bio ??
            `Read articles written by ${author.name} on Circuitry, covering technology, electronics, and tech accessories.`,

        alternates: {
            canonical: `/author/${author.id}`
        },

        openGraph: {
            type: "profile",
            url: `/author/${author.id}`,
            title: `${author.name} | Circuitry`,
            description:
                author.bio ??
                `Articles and insights by ${author.name} on Circuitry.`,
            images: [{ url: 'book.ico' }]
        },

        twitter: {
            card: "summary_large_image",
            title: `${author.name} | Circuitry`,
            description:
                author.bio ??
                `Explore articles written by ${author.name}.`,
        },

        robots: {
            index: true,
            follow: true
        }
    };
}

import { BreadCrumbSecond } from "@/components/breadcrumb/breadcrumb";
import { ScrollToTop } from "@/components/Interactive/ScrollToTop";
import { BreadCrumbData } from "@/types/item";
import { notFound } from "next/navigation";
import { AuthorData } from "@/types/item";
import { AuthorInfo } from "@/components/author/AuthorInfo";
import { AuthorArticlesList } from "@/components/author/AuthorArticleList";
export default async function Article({ params }: { params: { id: number } }) {
    const { id } = await params; // ✅ bắt buộc await
    const authorId = Number(id);

    if (Number.isNaN(authorId)) notFound();

    const author: AuthorData | undefined = getAuthorByID(authorId);
    if (!author) notFound();
    const breadCrumbData: BreadCrumbData = [
        { title: "Home", href: "/" },
        { title: "Author", href: "/author" },
        { title: author.name, href: `/author/${author.id}` }
    ];
    return (
        <>
            <ScrollToTop />

            <div className="mt-29.5 lg:mb-19.5 min-h-[80vh] relative">
                <BreadCrumbSecond data={breadCrumbData} />
                <AuthorInfo author={author} />
                <AuthorArticlesList author={author} />
            </div>
        </>

    )
}
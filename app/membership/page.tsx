import { MembershipBenefit } from "@/components/membership/MembershipBenefit/MembershipBenefit";
import { MembershipSales } from "@/components/membership/MembershipSales/MembershipSales";
import { MembershipSlider } from "@/components/membership/MemberShipSlider/MembershipSlider";
import { MembershipTop } from "@/components/membership/MembershipTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Membership Plans",
    description:
        "Unlock premium content, exclusive articles, and member-only benefits on Circuitry. Choose a membership plan designed for tech enthusiasts and professionals.",

    alternates: {
        canonical: "/membership",
    },

    keywords: [
        "Circuitry membership",
        "tech blog membership",
        "premium technology content",
        "electronics blog subscription",
        "exclusive tech articles"
    ],

    openGraph: {
        type: "website",
        url: "https://circuitry-demo.vercel.app/membership",
        siteName: "Circuitry",
        title: "Circuitry Membership – Premium Tech Content",
        description:
            "Join Circuitry Membership to access premium technology articles, expert insights, and exclusive member benefits."
    },

    twitter: {
        card: "summary_large_image",
        title: "Circuitry Membership – Premium Tech Content",
        description:
            "Get access to exclusive technology articles and member-only benefits on Circuitry."
    },

    robots: {
        index: true,
        follow: true,
    },

    category: "technology",
};
export default function Membership() {
    return (
        <div className="min-h-[80vh] mt-19.5">
            <MembershipSlider />
            <MembershipTop />
            <MembershipSales />
            <MembershipBenefit />
        </div>
    );
}

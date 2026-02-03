"use client";

import dynamic from "next/dynamic";
import { JSX } from "react";
import { PageLoader } from "../loading/PageLoader";

const HomeOne = dynamic(() => import("./HomeOne"), {
    loading: () => <PageLoader />
});

const HomeTwo = dynamic(() => import("./HomeTwo"), {
    loading: () => <PageLoader />
});
const HomeThree = dynamic(() => import("./HomeThree"), {
    loading: () => <PageLoader />
});
const HomeFour = dynamic(() => import("./HomeFour"), {
    loading: () => <PageLoader />
});

export function HomeLayout({ id }: { id: number }) {
    const layouts: Record<number, JSX.Element> = {
        1: <HomeOne />,
        2: <HomeTwo />,
        3: <HomeThree />,
        4: <HomeFour />,
    };

    return (
        <div className="min-h-[80vh]">
            {layouts[id] ?? <HomeOne />}
        </div>
    );
}

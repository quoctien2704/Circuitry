import { GoBackButton } from "@/components/button/GoBackButton";
import { ScrollToTop } from "@/components/Interactive/ScrollToTop";
export default function NotFound() {
    return <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <ScrollToTop />
        <h2 className="text-5xl font-medium italic font-serif">Author Not Found</h2>
        <GoBackButton />
    </div>
}
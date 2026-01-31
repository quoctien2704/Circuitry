"use client";
// Mark this file as a Client Component
// Required because we use client-side hooks like useSearchParams

import { HomeLayout } from "@/components/homelayout/HomeLayout";
import { ScrollToTop } from "@/components/Interactive/ScrollToTop";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { MoonLoader } from "react-spinners";

// This component reads query parameters from the URL
// It must be rendered inside a <Suspense> boundary
function HomeContent() {
  // Access URL search parameters (e.g. ?home=2)
  const searchParams = useSearchParams();

  // Convert "home" query param to number, fallback to 1 if not provided
  const homeLayout = Number(searchParams.get("home")) || 1;

  // Render layout based on query param
  return <HomeLayout id={homeLayout} />;
}

// Loading UI shown while Suspense is resolving
function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
      {/* Ensure page scrolls to top when loading */}
      <ScrollToTop />

      {/* Spinner indicator */}
      <MoonLoader loading={true} size={64} />
    </div>
  );
}

export default function Home() {
  return (
    // Suspense is required because useSearchParams is async-aware
    // The fallback UI is shown during initial render / hydration
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  );
}
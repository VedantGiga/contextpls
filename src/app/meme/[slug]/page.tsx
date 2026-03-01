import { getMemes, getMemeBySlug } from "@/lib/actions";
import { notFound } from "next/navigation";
import DetailPageClient from "./DetailPageClient";

export async function generateStaticParams() {
    // For build time generation optionally, but we will mostly rely on fresh data
    const res = await getMemes();
    if (!res.success) return [];

    return (res.memes || []).map((meme: any) => ({
        slug: meme.slug,
    }));
}

export default async function MemeDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    // Fetch live from database
    const result = await getMemeBySlug(slug);

    if (!result.success || !result.meme) {
        notFound();
    }

    return <DetailPageClient meme={result.meme} />;
}

import MemeCard from "@/components/MemeCard";
import { getMemesByCategory } from "@/lib/actions";
import { notFound } from "next/navigation";

// Map slugs back to proper DB category names
const slugToCategoryMap: Record<string, string> = {
    "tiktok": "TikTok",
    "streamer-culture": "Streamer Culture",
    "youtube-brainrot": "YouTube Brainrot",
    "viral-sounds": "Viral Sounds"
};

export default async function GenericCategoryPage({
    params
}: {
    params: { category: string }
}) {
    // If the slug doesn't match a known category, 404
    const dbCategoryName = slugToCategoryMap[params.category];
    if (!dbCategoryName) {
        notFound();
    }

    const { memes } = await getMemesByCategory(dbCategoryName);
    const colors = ["bg-yellow-400", "bg-sage", "bg-skyblue", "bg-coral"];

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 bg-yellow-400 border-b-8 border-black">
            <div className="container mx-auto">
                <div className="mb-16 border-8 border-black bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rotate-1">
                    <h1
                        className="text-5xl md:text-7xl lg:text-9xl font-black text-black uppercase leading-none tracking-tighter"
                        style={{ textShadow: "8px 8px 0px #FF5429" }}
                    >
                        {dbCategoryName}
                    </h1>
                    <p
                        className="mt-8 text-2xl font-bold max-w-2xl bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase text-black"
                    >
                        Browsing all documented artifacts within the {dbCategoryName} ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
                    {memes?.map((item: any, i: number) => (
                        <MemeCard
                            key={item.slug}
                            title={item.title}
                            description={item.shortDefinition}
                            tag={item.tags[0]?.name || dbCategoryName}
                            imageUrl={item.imageUrl}
                            color={colors[i % colors.length]}
                            href={`/meme/${item.slug}`}
                            delay={i * 0.1}
                        />
                    ))}
                    {(!memes || memes.length === 0) && (
                        <div className="col-span-full py-24 text-center">
                            <h2 className="text-3xl md:text-5xl font-black uppercase text-black bg-white border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block px-8 py-4 -rotate-2">
                                NO SUBMISSIONS YET.
                            </h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

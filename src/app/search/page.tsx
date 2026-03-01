import { searchMemes } from "@/lib/actions";
import MemeCard from "@/components/MemeCard";
import { AlertTriangle, SearchX } from "lucide-react";

export default async function SearchPage({
    searchParams
}: {
    searchParams: { q: string }
}) {
    const query = searchParams.q || "";
    const result = await searchMemes(query);
    const memes = result.success && result.memes ? result.memes : [];

    const colors = [
        "bg-coral",
        "bg-skyblue",
        "bg-sage",
        "bg-yellow-400",
        "bg-white"
    ];

    return (
        <main className="min-h-screen pt-32 pb-24 px-4 bg-sage border-b-8 border-black">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-12 border-8 border-black bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rotate-1 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-black uppercase leading-none">
                            SEARCH
                        </h1>
                        <p className="mt-4 text-xl font-bold bg-black text-yellow-300 p-2 inline-block uppercase whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                            QUERY: "{query || 'Blank'}"
                        </p>
                    </div>
                    <div className="bg-skyblue border-4 border-black p-6 flex flex-col items-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-6xl font-black text-black">{memes.length}</span>
                        <span className="text-xl font-black uppercase text-black">Results</span>
                    </div>
                </div>

                {memes.length === 0 ? (
                    <div className="bg-white border-8 border-black p-16 text-center shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center -rotate-1">
                        <SearchX className="w-24 h-24 text-black mb-6" strokeWidth={3} />
                        <h2 className="text-4xl font-black uppercase text-black">No Results Found</h2>
                        <p className="text-2xl mt-4 font-bold text-gray-600">Your query yielded 0 hits in the brainrot index.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {memes.map((meme, i) => (
                            <MemeCard
                                key={meme.slug}
                                title={meme.title}
                                description={meme.shortDefinition}
                                tag={meme.tags[0]?.name || "Meme"}
                                imageUrl={meme.imageUrl || undefined}
                                color={colors[i % colors.length]}
                                href={`/meme/${meme.slug}`}
                                delay={i * 0.1}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

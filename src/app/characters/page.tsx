import MemeCard from "@/components/MemeCard";
import { getMemesByCategory } from "@/lib/actions";

export default async function CharactersPage() {
    const { memes } = await getMemesByCategory("Character");
    const colors = ["bg-sage", "bg-skyblue", "bg-white", "bg-coral"];

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 bg-coral border-b-8 border-black">
            <div className="container mx-auto">
                <div className="mb-16 border-8 border-black bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                    <h1
                        className="text-5xl md:text-7xl lg:text-9xl font-black text-black uppercase leading-none tracking-tighter"
                        style={{ textShadow: "8px 8px 0px #FF5429" }}
                    >
                        MEME <br className="hidden md:block" /> CHARACTERS
                    </h1>
                    <p
                        className="mt-8 text-2xl font-bold max-w-2xl bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase text-black"
                    >
                        The mascots of our collective digital consciousness. The faces we wear to express the inexpressible.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
                    {memes?.map((char: any, i: number) => (
                        <MemeCard
                            key={char.slug}
                            title={char.title}
                            description={char.shortDefinition}
                            tag={char.tags[0]?.name || "Character"}
                            imageUrl={char.imageUrl}
                            color={colors[i % colors.length]}
                            href={`/meme/${char.slug}`}
                            delay={i * 0.1}
                        />
                    ))}
                    {memes?.length === 0 && (
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

export const dynamic = "force-dynamic";

import { getMemesByCategory } from "@/lib/actions";
import SlangClientGrid from "@/components/SlangClientGrid";

export default async function SlangPage() {
    const { memes } = await getMemesByCategory("Slang");
    const colors = ["bg-coral", "bg-sage", "bg-skyblue", "bg-white"];

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 bg-skyblue border-b-8 border-black">
            <div className="container mx-auto">
                <div className="mb-16 border-8 border-black bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                    <h1
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-black uppercase leading-none tracking-tighter break-words"
                        style={{ textShadow: "4px 4px 0px #FF5429" }}
                    >
                        THE <br className="hidden md:block" /> DICTIONARY
                    </h1>
                    <p
                        className="mt-8 text-2xl font-bold max-w-2xl bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase text-black"
                    >
                        Words that made it from obscure Twitch chats to the Oxford English Dictionary.
                    </p>
                </div>

                <div className="w-full">
                    <SlangClientGrid initialMemes={memes || []} />
                </div>
            </div>
        </div>
    );
}

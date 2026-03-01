"use client";

import { useState } from "react";
import MemeCard from "@/components/MemeCard";
import { Search } from "lucide-react";

export default function SlangClientGrid({ initialMemes }: { initialMemes: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const colors = ["bg-coral", "bg-sage", "bg-skyblue", "bg-white"];

    const filteredMemes = initialMemes.filter(meme =>
        meme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meme.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Search Bar */}
            <div className="relative brutal-card overflow-hidden flex items-center p-2 flex-row bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-3xl">
                <Search className="h-6 w-6 md:h-8 md:w-8 text-black ml-4 flex-shrink-0" />
                <input
                    type="text"
                    className="w-full bg-transparent py-2 md:py-4 px-4 text-base md:text-2xl outline-none placeholder:text-black/50 font-black text-black uppercase text-left"
                    placeholder="SEARCH DICTIONARY..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
                {filteredMemes.map((term: any, i: number) => (
                    <MemeCard
                        key={term.slug}
                        title={term.title}
                        description={term.shortDefinition}
                        tag={term.tags[0]?.name || "Slang"}
                        imageUrl={term.imageUrl}
                        color={colors[i % colors.length]}
                        href={`/meme/${term.slug}`}
                        delay={0} // No stagger delay for instant search feel
                    />
                ))}
            </div>

            {filteredMemes.length === 0 && (
                <div className="col-span-full py-24 text-center">
                    <h2 className="text-3xl md:text-4xl font-black uppercase text-black bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block px-8 py-4 -rotate-2">
                        {searchQuery.trim() === ""
                            ? "NO MEMES FOUND"
                            : `NO RESULTS FOR "${searchQuery}"`}
                    </h2>
                </div>
            )}
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { searchGifs } from "@/lib/actions";
import { Search, Loader2, Check } from "lucide-react";

export default function GifsPage() {
    const [gifs, setGifs] = useState<any[]>([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const loadGifs = async (searchQuery: string) => {
        setLoading(true);
        const result = await searchGifs(searchQuery, 20);
        if (result.success) {
            const colors = ["bg-coral", "bg-sage", "bg-skyblue", "bg-white"];
            const mapped = result.gifs.map((g: any, i: number) => ({
                id: g.id,
                src: g.images.original.url,
                title: g.title || "GIF",
                colSpan: i % 5 === 0 ? "md:col-span-2" : "md:col-span-1",
                rowSpan: i % 3 === 0 ? "md:row-span-2" : "md:row-span-1",
                color: colors[i % colors.length]
            }));
            setGifs(mapped);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadGifs(""); // fetches trending on mount
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        loadGifs(query);
    };

    const copyGifToClipboard = async (url: string, id: string) => {
        try {
            // Browsers block programmatic copying of `image/gif` for security.
            // Workaround: We copy a rich-text HTML payload of the image tag, alongside the raw text URL fallback.
            // Discord, iMessage, and Twitter will instantly embed this HTML payload.
            const htmlBlob = new Blob([`<img src="${url}" alt="GIF">`], { type: "text/html" });
            const textBlob = new Blob([url], { type: "text/plain" });

            const item = new ClipboardItem({
                "text/html": htmlBlob,
                "text/plain": textBlob
            });
            await navigator.clipboard.write([item]);

            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error("Failed to copy GIF directly to clipboard", err);
            // Absolute fallback for highly restrictive browsers
            navigator.clipboard.writeText(url);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 bg-coral border-b-8 border-black">
            <div className="container mx-auto">
                <div className="mb-16 border-8 border-black bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rotate-1">
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl md:text-7xl lg:text-9xl font-black text-black uppercase leading-none tracking-tighter"
                        style={{ textShadow: "8px 8px 0px #FF5429" }}
                    >
                        GIF <br className="hidden md:block" /> CENTRE
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 text-xl md:text-2xl font-bold max-w-2xl bg-skyblue border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase text-black"
                    >
                        The moving pictures that ruined our attention spans. Grab and deploy. Click a GIF to copy its URL.
                    </motion.p>

                    <form onSubmit={handleSearch} className="mt-12 flex flex-col md:flex-row gap-4 max-w-2xl">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="SEARCH GIPHY..."
                            className="flex-1 bg-white text-black border-8 border-black p-4 text-2xl font-black uppercase placeholder-black/50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="brutal-btn bg-sage border-8 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="w-8 h-8 text-black animate-spin" strokeWidth={4} /> : <Search className="w-8 h-8 text-black" strokeWidth={4} />}
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 auto-rows-[120px] sm:auto-rows-[180px] md:auto-rows-[250px]">
                    {gifs.map((gif, index) => (
                        <motion.div
                            key={gif.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            onClick={() => copyGifToClipboard(gif.src, gif.id)}
                            className={cn(
                                "group relative overflow-hidden border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer",
                                gif.colSpan,
                                gif.rowSpan,
                                gif.color
                            )}
                        >
                            <img
                                src={gif.src}
                                alt={gif.title}
                                className="w-full h-full object-cover transition-all duration-300"
                            />

                            {/* Overlay tag */}
                            <div className="absolute bottom-4 left-4 right-4 bg-white border-4 border-black px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                                <span className="font-black text-black uppercase text-xl truncate pr-2">
                                    {gif.title || "UNTITLED"}
                                </span>
                                {copiedId === gif.id ? (
                                    <Check className="w-6 h-6 text-green-500 flex-shrink-0" strokeWidth={3} />
                                ) : null}
                            </div>

                            {/* Copied full overlay */}
                            {copiedId === gif.id && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                                    <div className="bg-sage border-4 border-black px-6 py-3 -rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                        <span className="text-black font-black text-2xl uppercase">COPIED!</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {!loading && gifs.length === 0 && (
                        <div className="col-span-full py-24 text-center">
                            <h2 className="text-3xl md:text-5xl font-black uppercase text-black bg-white border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block px-8 py-4 -rotate-2">
                                NO GIFS FOUND. YOU FELL OFF.
                            </h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

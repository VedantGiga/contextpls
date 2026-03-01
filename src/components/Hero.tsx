"use client";

import { motion } from "framer-motion";
import { Search, AlertTriangle } from "lucide-react";
import { useState } from "react";
import DraggableStickers from "./DraggableStickers";
import { useRouter } from "next/navigation";

const MARQUEE_TEXT = " CONTEXT PLS • TOUCH GRASS • SKIBIDI • GYATT • OHIO • RIZZ • SIGMA • MEWING • LOOKSMAXXING • FANUM TAX • ";

export default function Hero() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/search?q=${encodeURIComponent(search)}`);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full max-w-[100vw] bg-sage pt-20 border-b-8 border-black">

            {/* Top Marquee */}
            <div className="absolute top-24 left-0 w-full overflow-hidden bg-coral border-y-4 border-black py-2 z-0 transform -rotate-2 scale-110">
                <motion.div
                    className="whitespace-nowrap flex"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 10,
                            ease: "linear",
                        },
                    }}
                >
                    <span className="text-2xl font-black text-black tracking-widest uppercase flex-shrink-0">
                        {MARQUEE_TEXT}{MARQUEE_TEXT}
                    </span>
                    <span className="text-2xl font-black text-black tracking-widest uppercase flex-shrink-0">
                        {MARQUEE_TEXT}{MARQUEE_TEXT}
                    </span>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 z-10 flex flex-col items-center justify-center text-center mt-6 sm:mt-12 mb-20 md:mb-0 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-8 max-w-5xl relative flex flex-col items-center w-full"
                >
                    <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white border-4 border-black px-3 py-1.5 md:px-4 md:py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 md:mb-4 mt-8 md:mt-0 rotate-2">
                        <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-black animate-pulse" />
                        <span className="text-[0.65rem] md:text-sm font-black tracking-wide text-black uppercase">CHRONICALLY ONLINE ZONE</span>
                    </div>

                    <h1 className="text-[5rem] sm:text-[6rem] md:text-[10rem] font-display font-black tracking-tighter text-black uppercase leading-[0.80] md:leading-[0.85]" style={{ textShadow: '8px 8px 0px #FF5429' }}>
                        CONTEXT<br />PLS.
                    </h1>

                    <p className="text-sm sm:text-base md:text-3xl text-black font-bold max-w-3xl mx-auto leading-tight border-4 md:border-8 border-black bg-white p-3 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                        We explain the internet so you don't have to ask your younger brother.
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mt-4 md:mt-8 mb-16 md:mb-32 max-w-3xl mx-auto w-full relative">
                        <div className="relative brutal-card overflow-hidden flex items-center p-1 sm:p-2 flex-row bg-white">
                            <Search className="hidden sm:block h-6 w-6 md:h-8 md:w-8 text-black ml-2 md:ml-4 flex-shrink-0" />
                            <input
                                type="text"
                                className="w-full bg-transparent py-2 md:py-4 px-3 md:px-4 text-base md:text-2xl outline-none placeholder:text-black/50 font-black text-black uppercase text-left"
                                placeholder="SEARCH..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type="submit" className="brutal-btn px-4 md:px-6 py-2 md:py-4 mr-1 sm:mr-2 bg-skyblue text-base md:text-xl whitespace-nowrap">
                                GO
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Floating tags - Hidden on mobile to reduce clutter */}
            <div className="hidden md:block">
                <DraggableStickers />
            </div>

            {/* Bottom Marquee */}
            <div className="absolute bottom-12 left-0 w-full overflow-hidden bg-skyblue border-y-4 border-black py-2 z-0 transform rotate-1 scale-110">
                <motion.div
                    className="whitespace-nowrap flex"
                    animate={{ x: [-1000, 0] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 12,
                            ease: "linear",
                        },
                    }}
                >
                    <span className="text-2xl font-black text-black tracking-widest uppercase flex-shrink-0">
                        {MARQUEE_TEXT}{MARQUEE_TEXT}
                    </span>
                    <span className="text-2xl font-black text-black tracking-widest uppercase flex-shrink-0">
                        {MARQUEE_TEXT}{MARQUEE_TEXT}
                    </span>
                </motion.div>
            </div>
        </section>
    );
}

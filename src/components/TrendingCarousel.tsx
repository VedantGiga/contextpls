"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getMemes } from "@/lib/actions";

export default function TrendingCarousel() {
    const [memes, setMemes] = useState<any[]>([]);

    useEffect(() => {
        async function fetchTrending() {
            const res = await getMemes();
            if (res.success && res.memes) {
                setMemes(res.memes.slice(0, 10)); // Top 10 items
            }
        }
        fetchTrending();
    }, []);

    return (
        <section id="trending" className="py-24 relative overflow-hidden bg-white border-b-8 border-black">
            <div className="container mx-auto px-4 mb-12">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-black uppercase mb-4 shadow-black tracking-tighter" style={{ textShadow: '4px 4px 0px #39FF14' }}>
                            TRENDING ANOMALIES
                        </h2>
                        <p className="text-black text-xl font-bold max-w-xl bg-sage border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            Currently surging in the cultural zeitgeist. Proceed with caution.
                        </p>
                    </div>
                    <button className="hidden sm:flex brutal-btn px-6 py-3 bg-coral text-lg items-center gap-2">
                        VIEW ALGORITHM <ArrowRight className="w-5 h-5" strokeWidth={3} />
                    </button>
                </div>
            </div>

            <div className="flex overflow-x-auto pb-12 pt-4 px-4 sm:px-8 md:px-16 gap-8 snap-x snap-mandatory hide-scrollbar">
                {/* Spacer for initial margin */}
                <div className="w-1 md:w-8 shrink-0" />

                {memes.length > 0 ? memes.map((meme, index) => (
                    <CarouselCard key={meme.slug} meme={meme} index={index} />
                )) : (
                    <div className="w-full text-center py-12 px-4 border-4 border-black border-dashed">
                        <span className="text-xl font-black uppercase text-black/50">NO TRENDING DATA FOUND</span>
                    </div>
                )}

                {/* Spacer for final margin */}
                <div className="w-4 md:w-16 shrink-0" />
            </div>
        </section>
    );
}

function CarouselCard({ meme, index }: { meme: any; index: number }) {
    // Determine color based on score
    const getScoreColor = (score: number) => {
        if (score > 90) return "text-coral";
        if (score > 75) return "text-skyblue";
        return "text-sage";
    };

    const getPhaseColor = (phase: string) => {
        switch (phase) {
            case "Explosion": return "bg-coral text-black border-4 border-black";
            case "Saturation": return "bg-skyblue text-black border-4 border-black";
            case "Irony": return "bg-sage text-black border-4 border-black";
            case "Archive": return "bg-white text-black border-4 border-black";
            default: return "bg-white text-black border-4 border-black";
        }
    };

    return (
        <Link href={`/meme/${meme.slug}`} className="shrink-0 outline-none inline-block origin-top-left transition-transform duration-200 hover:-rotate-2">
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                className="snap-center w-[300px] sm:w-[350px] md:w-[400px] h-[450px] p-6 brutal-card relative overflow-hidden flex flex-col hover:bg-sage transition-colors duration-200"
            >
                <div className="flex justify-between items-start mb-auto">
                    <div className={cn("px-4 py-2 text-sm font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]", getPhaseColor(meme.lifecyclePhase))}>
                        {meme.lifecyclePhase}
                    </div>
                    <div className="flex items-center gap-2 bg-black px-4 py-2 border-4 border-black shadow-[2px_2px_0px_0px_rgba(255,0,127,1)]">
                        <Activity className={cn("w-5 h-5", getScoreColor(meme.brainrotScore))} strokeWidth={3} />
                        <span className="text-sm font-black text-white font-mono">{meme.brainrotScore}</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-4xl font-display font-black text-black uppercase mb-4 leading-none">
                        {meme.title}
                    </h3>
                    <p className="text-black text-lg font-bold line-clamp-3 mb-6 leading-tight bg-white border-2 border-black p-2">
                        {meme.shortDefinition}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                        {meme.tags && meme.tags.slice(0, 2).map((tag: any) => (
                            <span key={tag.id || tag.name} className="text-sm font-black px-3 py-1 bg-white border-2 border-black uppercase text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                #{tag.name}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t-4 border-black mt-auto">
                        <div className="flex items-center gap-2 text-sm font-bold text-black bg-white border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Clock className="w-4 h-4" strokeWidth={3} />
                            <span>{meme.firstSeen}</span>
                        </div>

                        <div className="w-12 h-12 border-4 border-black bg-coral text-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                            <ArrowRight className="w-6 h-6" strokeWidth={3} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

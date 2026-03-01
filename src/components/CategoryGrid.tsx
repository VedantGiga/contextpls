"use client";

import { motion } from "framer-motion";
import { Hash, Video, Tv, PlaySquare, Music, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
    { name: "Slang", icon: Hash, defaultCount: 0, color: "hover:bg-coral", text: "text-black", href: "/slang" },
    { name: "TikTok", icon: Video, defaultCount: 0, color: "hover:bg-skyblue", text: "text-black", href: "/category/tiktok" },
    { name: "Streamer Culture", icon: Tv, defaultCount: 0, color: "hover:bg-sage", text: "text-black", href: "/category/streamer-culture" },
    { name: "YouTube Brainrot", icon: PlaySquare, defaultCount: 0, color: "hover:bg-yellow-400", text: "text-black", href: "/category/youtube-brainrot" },
    { name: "Viral Sounds", icon: Music, defaultCount: 0, color: "hover:bg-white", text: "text-black", href: "/category/viral-sounds" },
    { name: "Meme Characters", icon: Users, defaultCount: 0, color: "hover:bg-coral", text: "text-black", href: "/characters" },
];

export default function CategoryGrid({ dbCounts = {} }: { dbCounts?: Record<string, number> }) {
    return (
        <section id="categories" className="py-24 relative overflow-hidden w-full max-w-[100vw] bg-white border-b-8 border-black">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-black uppercase mb-4 tracking-tighter" style={{ textShadow: '4px 4px 0px #39FF14' }}>
                            EXPLORE BY TAXONOMY
                        </h2>
                        <p className="text-black font-bold text-xl max-w-xl bg-sage border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            Navigate the digital ecosystem through structured classification.
                        </p>
                    </div>
                    <Link href="/categories" className="hidden md:flex brutal-btn px-6 py-3 bg-skyblue text-black text-lg items-center mt-4 md:mt-0">
                        VIEW ALL CATEGORIES &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Link
                                href={cat.href}
                                className={cn(
                                    "group block bg-white border-2 sm:border-4 border-black p-4 sm:p-8 transition-all duration-150 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                                    "hover:-translate-y-1 sm:hover:-translate-y-2 hover:-translate-x-1 sm:hover:-translate-x-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                                    cat.color
                                )}
                            >
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-6 sm:mb-12">
                                    <div className="p-2 sm:p-4 border-2 sm:border-4 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform duration-150">
                                        <cat.icon className={cn("w-6 h-6 sm:w-8 sm:h-8", cat.text)} strokeWidth={3} />
                                    </div>
                                    <span className="text-xs sm:text-lg font-black font-mono text-black bg-white px-1.5 py-0.5 sm:px-3 sm:py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        {dbCounts[cat.name] || cat.defaultCount} ENTRIES
                                    </span>
                                </div>

                                <h3 className="text-xl sm:text-3xl font-display font-black text-black uppercase underline decoration-2 sm:decoration-4 underline-offset-2 sm:underline-offset-4 group-hover:bg-white group-hover:px-1 sm:group-hover:px-2 inline-block transition-colors duration-150 break-words line-clamp-2">
                                    {cat.name}
                                </h3>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const meterLevels = [
    {
        level: 1,
        name: "Harmless",
        scoreRange: "0-20",
        color: "bg-sage",
        text: "text-sage",
        description: "Cute animals, gentle puns, and dad jokes. Safe for the broader population. Found on Facebook and family group chats.",
    },
    {
        level: 2,
        name: "Quirky",
        scoreRange: "21-50",
        color: "bg-skyblue",
        text: "text-skyblue",
        description: "Relatable humor with mild irony. Might require some internet literacy but generally accessible to casual scrollers.",
    },
    {
        level: 3,
        name: "Deep Fried",
        scoreRange: "51-75",
        color: "bg-yellow-400",
        text: "text-yellow-400",
        description: "Layers of irony. Visual degradation. Requires understanding of at least two prior meme lifecycles to decode.",
    },
    {
        level: 4,
        name: "Terminal",
        scoreRange: "76-100",
        color: "bg-coral",
        text: "text-coral",
        description: "Incomprehensible to outsiders. Auditory overload. Pure structural chaos. Symptoms include spontaneous quoting of complete nonsense.",
    }
];

export default function BrainrotMeter() {
    const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

    return (
        <section className="py-24 relative overflow-hidden w-full max-w-[100vw] bg-white border-b-8 border-black">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl lg:text-8xl font-display font-black mb-6 text-black uppercase tracking-tighter" style={{ textShadow: '6px 6px 0px #39FF14' }}>
                            THE BRAINROT SCALE
                        </h2>
                        <p className="text-xl text-black font-bold max-w-2xl mx-auto bg-sage border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            Our proprietary index for measuring the toxicity, absurdity, and cognitive degradation potential of any given trend.
                        </p>
                    </div>

                    <div className="bg-white border-8 border-black p-8 md:p-12 relative overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-stretch w-full">
                            {/* Meter (2x2 grid on mobile, stack on desktop) */}
                            <div className="w-full md:w-1/2 grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-4 mb-2 md:mb-0">
                                {meterLevels.map((level, i) => (
                                    <div
                                        key={level.name}
                                        onMouseEnter={() => setHoveredLevel(i)}
                                        onMouseLeave={() => setHoveredLevel(null)}
                                        onClick={() => setHoveredLevel(hoveredLevel === i ? null : i)}
                                        className={cn(
                                            "relative h-16 md:h-20 border-2 md:border-4 border-black flex items-center px-2 md:px-6 cursor-pointer overflow-hidden transition-all duration-150 uppercase font-black text-xs md:text-xl",
                                            hoveredLevel === i ? `scale-[1.02] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${level.color}` : "bg-white hover:bg-gray-200"
                                        )}
                                    >
                                        <div className="relative z-10 flex flex-col md:flex-row md:justify-between w-full text-black">
                                            <span>{level.name}</span>
                                            <span className="font-mono bg-white px-1 md:px-2 py-0.5 md:py-1 border-2 border-black inline-block w-fit mt-1 md:mt-0">[{level.scoreRange}]</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Dynamic Description Area */}
                            <div className={cn(
                                "min-w-[250px] flex-1 min-h-[200px] md:min-h-[250px] flex items-center justify-center p-4 md:p-8 border-4 md:border-8 border-black relative transition-colors duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inset-shadow",
                                hoveredLevel !== null ? meterLevels[hoveredLevel].color : "bg-white"
                            )}>
                                <AnimatePresence mode="wait">
                                    {hoveredLevel !== null ? (
                                        <motion.div
                                            key={`desc-${hoveredLevel}`}
                                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-left bg-white border-2 md:border-4 border-black p-4 md:p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full relative z-10"
                                        >
                                            <span className="inline-block px-2 md:px-3 py-1 border-2 border-black text-black text-xs md:text-sm font-black mb-2 md:mb-4 uppercase bg-sage shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                Level {hoveredLevel + 1}
                                            </span>
                                            <h3 className="text-xl md:text-3xl font-display font-black mb-2 md:mb-3 text-black uppercase decoration-2 md:decoration-4 underline">
                                                {meterLevels[hoveredLevel].name} Effect
                                            </h3>
                                            <p className="text-black font-bold text-sm md:text-lg leading-snug">
                                                {meterLevels[hoveredLevel].description}
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="desc-empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-center text-black font-black text-lg md:text-2xl uppercase border-2 md:border-4 border-dashed border-black p-4 md:p-6 w-full"
                                        >
                                            Tap or hover to view criteria.
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

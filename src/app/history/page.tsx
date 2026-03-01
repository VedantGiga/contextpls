"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ERAS = [
    {
        year: "1990s - 2005",
        name: "The Primal Age",
        description: "Email forwards, ASCII art, Hamster Dance, and Newgrounds. Memes were slow to spread but highly permanent. The Wild West.",
        color: "bg-sage"
    },
    {
        year: "2006 - 2012",
        name: "The Impact Font Era",
        description: "Top text, bottom text. Rage comics, Advice Animals, Troll Face, and the golden age of YouTube Poop. Memes became mainstream.",
        color: "bg-skyblue"
    },
    {
        year: "2013 - 2016",
        name: "The Vine Renaissance",
        description: "Six-second bursts of audio-visual chaos. Do it for the vine. What are those? Watermelon inside a watermelon. High density, high impact.",
        color: "bg-coral"
    },
    {
        year: "2017 - 2020",
        name: "The Post-Ironic Shift",
        description: "Deep-fried memes, surrealism, and the rise of TikTok. Memes stopped making logical sense and relied entirely on embedded layers of irony.",
        color: "bg-white"
    },
    {
        year: "2021 - Present",
        name: "Terminal Brainrot",
        description: "Skibidi Toilet, Ohio, AI-generated slop, and hyper-niche algorithmic echo chambers. Culture is moving faster than human comprehension.",
        color: "bg-sage"
    }
];

export default function HistoryPage() {
    return (
        <div className="min-h-screen pt-32 pb-48 px-4 bg-sage border-b-8 border-black">
            <div className="container mx-auto">
                <div className="mb-24 text-center border-8 border-black bg-white p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rotate-1 max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-black uppercase leading-none mb-6 tracking-tighter"
                        style={{ textShadow: "8px 8px 0px #FF5429" }}
                    >
                        INTERNET HISTORY
                    </motion.h1>
                    <p className="text-xl md:text-2xl font-bold bg-coral border-4 border-black p-4 inline-block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase text-black">
                        A chronological breakdown of our collective brain damage.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                    {ERAS.map((era, index) => (
                        <motion.div
                            key={era.year}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={cn(
                                "flex flex-col md:flex-row gap-6 items-start border-8 border-black p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] transition-all",
                                era.color
                            )}
                        >
                            <div className="bg-white border-4 border-black px-4 py-2 text-2xl font-black shrink-0 -rotate-2">
                                {era.year}
                            </div>
                            <div>
                                <h2 className="text-4xl md:text-5xl font-display font-black uppercase mb-4 underline decoration-4 underline-offset-4">
                                    {era.name}
                                </h2>
                                <p className="text-xl font-bold leading-relaxed">
                                    {era.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const timelinePhases = [
    {
        phase: "Incubation",
        description: "The birthplace. Obscure forums, niche Discord servers, or single TikToks before they breach the algorithm. Pure, unadulterated format.",
        color: "bg-sage",
        text: "text-black"
    },
    {
        phase: "Explosion",
        description: "The algorithmic breach. Rapid spreading across platforms. Influencers co-opt the format. The original meaning begins to dilute.",
        color: "bg-coral",
        text: "text-black"
    },
    {
        phase: "Saturation",
        description: "Peak visibility. Brands start using it on Twitter. Your parents ask you what it means. The format is structurally exhausted.",
        color: "bg-skyblue",
        text: "text-black"
    },
    {
        phase: "Irony",
        description: "Post-ironic revival. The meme is used exclusively to mock the meme itself or the people who still use it sincerely.",
        color: "bg-yellow-400",
        text: "text-black"
    },
    {
        phase: "Archive",
        description: "Cultural fossilization. The meme enters the permanent lexicon as slang or is entirely forgotten until a 10-year nostalgia cycle.",
        color: "bg-white",
        text: "text-black"
    }
];

export default function LifecycleTimeline() {
    return (
        <section className="py-24 relative bg-skyblue border-b-8 border-black w-full max-w-[100vw]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-24">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-black mb-6 text-black uppercase tracking-tighter break-words" style={{ textShadow: '4px 4px 0px #FF5429' }}>
                        THE MEME LIFECYCLE
                    </h2>
                    <p className="text-xl md:text-2xl text-black font-bold max-w-2xl mx-auto bg-sage border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase">
                        Every viral trend follows a predictable chronological trajectory. KEEP SCROLLING TO DESCEND.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto pb-48">
                    {timelinePhases.map((item, index) => (
                        <motion.div
                            key={item.phase}
                            className="sticky w-full mb-[20vh] origin-top"
                            style={{
                                top: `calc(15vh + ${index * 2}rem)`,
                                zIndex: index
                            }}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className={cn(
                                "w-full border-8 border-black p-8 md:p-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-transform hover:-translate-y-2 hover:shadow-[24px_24px_0px_0px_rgba(0,0,0,1)]",
                                item.color
                            )}>
                                <div className="text-8xl md:text-9xl font-black text-black border-4 border-black bg-white px-6 py-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-3">
                                    0{index + 1}
                                </div>
                                <div className="flex-1 bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1">
                                    <h3 className="text-4xl md:text-5xl font-display font-black text-black uppercase mb-4 decoration-8 underline underline-offset-4">
                                        {item.phase}
                                    </h3>
                                    <p className="text-2xl font-bold text-black leading-snug">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

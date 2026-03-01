"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const stickers = [
    { text: "TOUCH GRASS", color: "bg-coral", rotate: "-12deg", x: "5%", y: "15%" },
    { text: "SKIBIDI", color: "bg-skyblue", rotate: "8deg", x: "85%", y: "10%" },
    { text: "LORE ACCURATE", color: "bg-white", rotate: "-4deg", x: "80%", y: "65%" },
    { text: "BRAIN ROT", color: "bg-yellow-400", rotate: "15deg", x: "10%", y: "75%" },
];

export default function DraggableStickers() {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none z-30 overflow-hidden w-full h-full max-w-[1400px] mx-auto">
            {stickers.map((sticker, i) => (
                <motion.div
                    key={i}
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0.4}
                    whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
                    onClick={(e) => {
                        // Move to front on click
                        const target = e.currentTarget;
                        target.style.zIndex = "50";
                        setTimeout(() => { target.style.zIndex = "40"; }, 2000);
                    }}
                    className={`absolute pointer-events-auto cursor-grab border-8 border-black px-6 py-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${sticker.color} active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow`}
                    style={{
                        left: sticker.x,
                        top: sticker.y,
                        rotate: sticker.rotate,
                        zIndex: 40
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.1 }}
                >
                    <span className="text-2xl md:text-3xl font-black text-black uppercase whitespace-nowrap">
                        {sticker.text}
                    </span>
                    {/* Tape detail */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/70 border-4 border-black -rotate-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]" />
                </motion.div>
            ))}
        </div>
    );
}

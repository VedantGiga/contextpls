"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertOctagon, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-sage flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                className="bg-white border-8 border-black p-8 md:p-16 max-w-2xl w-full text-center shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative"
            >
                {/* Error Badge */}
                <div className="absolute -top-8 -left-8 bg-coral border-4 border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-12 flex items-center gap-2">
                    <AlertOctagon className="w-8 h-8 text-black" strokeWidth={3} />
                    <span className="text-2xl font-black text-black uppercase">ERROR 404</span>
                </div>

                <h1
                    className="text-8xl md:text-[12rem] font-black text-black uppercase leading-none mt-4 mb-8"
                    style={{ textShadow: "8px 8px 0px #39FF14" }}
                >
                    404
                </h1>

                <p className="text-3xl md:text-5xl font-display font-black text-black uppercase mb-6 leading-tight underline decoration-8 decoration-coral underline-offset-8">
                    YOU FELL OFF <br /> THE ALGORITHM.
                </p>

                <p className="text-xl font-bold text-black mb-12 bg-skyblue border-4 border-black p-4 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                    The page you are looking for has been archived, deleted, or never existed in this timeline.
                </p>

                <Link
                    href="/"
                    className="brutal-btn inline-flex items-center gap-4 bg-coral px-8 py-4 text-2xl rotate-2"
                >
                    <Home strokeWidth={3} />
                    RETURN TO TIMELINE
                </Link>
            </motion.div>
        </div>
    );
}

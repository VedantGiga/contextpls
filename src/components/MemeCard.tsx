"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MemeCardProps {
    title: string;
    description: string;
    href: string;
    color?: string; // e.g., "bg-sage", "bg-coral", "bg-white", "bg-skyblue"
    tag?: string;
    imageUrl?: string;
    delay?: number;
    className?: string;
}

export default function MemeCard({
    title,
    description,
    href,
    color = "bg-white",
    tag,
    imageUrl,
    delay = 0,
    className
}: MemeCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay }}
            className={cn("h-full", className)}
        >
            <Link href={href} className="block group h-full">
                <div className={cn(
                    "brutal-card h-full flex flex-col transition-all duration-200 group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]",
                    color
                )}>
                    {imageUrl && (
                        <div className="w-full h-48 sm:h-56 md:h-64 border-b-4 border-black overflow-hidden relative bg-white shrink-0">
                            <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                    )}

                    <div className="flex flex-col p-4 sm:p-6 flex-grow">
                        {tag && (
                            <div className="self-start bg-black text-white px-3 py-1 font-bold text-sm uppercase mb-4 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                                {tag}
                            </div>
                        )}

                        <h3 className="text-xl sm:text-2xl md:text-4xl font-display font-black text-black uppercase mb-1 sm:mb-3 leading-tight underline decoration-2 sm:decoration-4 decoration-transparent group-hover:decoration-black transition-colors break-words">
                            {title}
                        </h3>

                        <p className="text-xs sm:text-sm md:text-lg font-bold text-black flex-grow mb-4 md:mb-6 leading-snug">
                            {description}
                        </p>

                        <div className="mt-auto flex justify-between items-center border-t-2 sm:border-t-4 border-black pt-2 sm:pt-4">
                            <span className="font-black text-black uppercase text-sm sm:text-xl group-hover:tracking-widest transition-all">
                                View
                            </span>
                            <div className="bg-black text-white p-1 sm:p-2 rounded-none group-hover:rotate-45 transition-transform">
                                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={3} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

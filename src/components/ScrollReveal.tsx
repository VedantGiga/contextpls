"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    rotate?: number;
    y?: number;
}

export default function ScrollReveal({
    children,
    className,
    rotate = -2,
    y = 50
}: ScrollRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: y, rotate: rotate }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                type: "spring",
                bounce: 0.3
            }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.div>
    );
}

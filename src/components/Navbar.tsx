"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
    { name: "Characters", href: "/characters" },
    { name: "Slang", href: "/slang" },
    { name: "Decode", href: "/decode" },
    { name: "Translate", href: "/translate" },
    { name: "Submit", href: "/submit" },
];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [active, setActive] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-150%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
            <nav className="bg-white border-4 border-black px-6 py-3 flex items-center justify-between gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none relative z-50">
                <Link
                    href="/"
                    className="font-display text-black font-black text-2xl tracking-tight uppercase hover:text-coral transition-colors"
                >
                    CONTEXT PLS<span className="text-coral">.</span>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex items-center gap-1 sm:gap-2">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="relative px-4 py-2 text-sm xl:text-base font-bold text-black border-2 border-transparent hover:border-black hover:bg-sage hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all group whitespace-nowrap"
                                onMouseEnter={() => setActive(link.name)}
                                onMouseLeave={() => setActive("")}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger Toggle */}
                <button
                    className="lg:hidden p-2 text-black bg-white border-2 border-black active:bg-sage"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X className="w-6 h-6" strokeWidth={3} /> : <Menu className="w-6 h-6" strokeWidth={3} />}
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-4 right-4 mt-4 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 z-40 lg:hidden"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-2xl font-black text-black uppercase border-b-4 border-transparent hover:border-black pb-2 transition-all w-fit hover:text-coral"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}

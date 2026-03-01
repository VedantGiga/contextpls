import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-sage border-t-8 border-black pt-24 pb-12 overflow-hidden relative w-full max-w-[100vw]">
            <div className="container mx-auto px-4 z-10 relative">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-6xl font-black text-black uppercase mb-6 leading-none" style={{ textShadow: '4px 4px 0px #FF5429' }}>
                            STAY CHRONICALLY ONLINE.
                        </h2>
                        <p className="text-2xl font-bold text-black border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                            An archive mapping the absolute chaos of internet culture. Built for the culture, by the culture.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-auto">
                        <button className="brutal-btn px-8 py-4 bg-coral text-2xl flex justify-between items-center gap-6 rotate-1">
                            SUBMIT ENTRY <ArrowUpRight strokeWidth={3} />
                        </button>
                        <a href="https://x.com/VedantV32826501" target="_blank" rel="noopener noreferrer" className="brutal-btn px-8 py-4 bg-skyblue text-2xl flex justify-between items-center gap-6 -rotate-1 text-black hover:text-black">
                            FOLLOW ON X <ArrowUpRight strokeWidth={3} />
                        </a>
                    </div>
                </div>

                <div className="w-full border-t-8 border-black pt-12 flex flex-col md:flex-row justify-between items-center gap-8 relative z-20 bg-sage">
                    <p className="text-xl font-black text-black uppercase bg-white border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        &copy; {new Date().getFullYear()} CONTEXT PLS. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex flex-wrap gap-6 bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Link href="/privacy" className="text-xl font-black text-black uppercase hover:underline decoration-4 decoration-coral">PRIVACY</Link>
                        <Link href="/terms" className="text-xl font-black text-black uppercase hover:underline decoration-4 decoration-skyblue">TERMS</Link>
                        <Link href="/about" className="text-xl font-black text-black uppercase hover:underline decoration-4 decoration-sage">ABOUT</Link>
                    </div>
                </div>
            </div>

            {/* Massive Background Typography */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[110%] text-center pointer-events-none opacity-10 flex flex-col pt-12">
                <span className="text-[22vw] font-display font-black leading-[0.7] text-black whitespace-nowrap">
                    CONTEXT PLS
                </span>
                <span className="text-[22vw] font-display font-black leading-[0.7] text-black whitespace-nowrap mt-4">
                    CONTEXT PLS
                </span>
            </div>
        </footer>
    );
}

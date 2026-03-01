"use client";

import { motion } from "framer-motion";

export default function EditorialSection() {
    return (
        <section id="about" className="py-32 relative overflow-hidden bg-coral border-b-8 border-black w-full max-w-[100vw]">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center md:text-left flex flex-col md:flex-row gap-16 md:gap-24 items-center bg-white border-8 border-black p-8 md:p-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
                >
                    <div className="md:w-5/12">
                        <h2 className="text-xl font-black bg-black text-white px-4 py-2 inline-block uppercase mb-8 shadow-[4px_4px_0px_0px_rgba(57,255,20,1)] -rotate-2">
                            MISSION STATEMENT
                        </h2>
                        <h3 className="text-5xl md:text-6xl lg:text-8xl font-display font-black leading-none text-black uppercase tracking-tighter" style={{ textShadow: '4px 4px 0px #39FF14' }}>
                            WHY WE BUILT <br />
                            THIS ARCHIVE.
                        </h3>
                    </div>

                    <div className="md:w-7/12 space-y-8 text-2xl md:text-3xl font-bold leading-tight text-black flex flex-col justify-center">
                        <p className="bg-sage border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            Internet culture moves at the speed of computation, destroying context and history as quickly as it creates it.
                        </p>
                        <p className="border-l-8 border-black pl-6">
                            What is a devastatingly ironic joke on Tuesday becomes a global brand campaign by Friday, and an embarrassing relic by Sunday.
                        </p>
                        <p className="underline decoration-8 underline-offset-4 decoration-skyblue">
                            We track this chaos with anthropological precision. Structural clarity for terminal brainrot.
                        </p>

                        <div className="pt-8">
                            <button className="brutal-btn px-10 py-6 bg-yellow-400 text-2xl rotate-2 hover:rotate-0">
                                CONTRIBUTE AN ENTRY
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

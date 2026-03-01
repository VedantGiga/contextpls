"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { submitMeme } from "@/lib/actions";
import { Loader2, Send } from "lucide-react";

export default function SubmitPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [category, setCategory] = useState("Character");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const result = await submitMeme(formData);

        if (result.success) {
            setMessage({ type: 'success', text: "SUBMISSION RECEIVED. PENDING ADMIN APPROVAL." });
            (e.target as HTMLFormElement).reset();
        } else {
            setMessage({ type: 'error', text: result.error || "FAILED TO SUBMIT." });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 bg-coral border-b-8 border-black">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-12 border-8 border-black bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl lg:text-8xl font-black text-black uppercase leading-none tracking-tighter"
                    >
                        SUBMIT <br className="hidden md:block" /> LORE
                    </motion.h1>
                    <p className="mt-6 text-xl md:text-2xl font-bold bg-yellow-300 border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] uppercase text-black inline-block">
                        Add to the index. Admins will review before it goes live.
                    </p>
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="bg-white border-8 border-black p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6"
                >
                    {message && (
                        <div className={`p-4 border-4 border-black font-black uppercase text-xl ${message.type === 'success' ? 'bg-sage text-black' : 'bg-coral text-white'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-2xl font-black uppercase text-black">Title / Name *</label>
                        <input required type="text" id="title" name="title" placeholder="e.g. Skibidi Toilet" className="bg-white text-black border-4 border-black p-4 text-xl font-bold placeholder-black/50 focus:outline-none focus:bg-yellow-100 transition-colors" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="shortDefinition" className="text-2xl font-black uppercase text-black">Short Definition *</label>
                        <textarea required id="shortDefinition" name="shortDefinition" rows={3} placeholder="Explain it like I'm 5..." className="bg-white text-black border-4 border-black p-4 text-xl font-bold placeholder-black/50 focus:outline-none focus:bg-yellow-100 transition-colors resize-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="category" className="text-2xl font-black uppercase text-black">Category *</label>
                            <select
                                id="category"
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-white text-black border-4 border-black p-4 text-xl font-bold focus:outline-none focus:bg-yellow-100 transition-colors uppercase cursor-pointer"
                            >
                                <option value="Character">Character</option>
                                <option value="Slang">Slang</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="origin" className="text-2xl font-black uppercase text-black">Origin Story *</label>
                            <input required type="text" id="origin" name="origin" placeholder="Where did it start?" className="bg-white text-black border-4 border-black p-4 text-xl font-bold placeholder-black/50 focus:outline-none focus:bg-yellow-100 transition-colors" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="platform" className="text-2xl font-black uppercase text-black">Main Platform</label>
                            <input type="text" id="platform" name="platform" placeholder="TikTok, Twitter, etc." className="bg-white text-black border-4 border-black p-4 text-xl font-bold placeholder-black/50 focus:outline-none focus:bg-yellow-100 transition-colors" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="firstSeen" className="text-2xl font-black uppercase text-black">First Seen</label>
                            <input type="text" id="firstSeen" name="firstSeen" placeholder="e.g. Early 2023" className="bg-white text-black border-4 border-black p-4 text-xl font-bold placeholder-black/50 focus:outline-none focus:bg-yellow-100 transition-colors" />
                        </div>

                        {category !== 'Slang' && (
                            <div className="flex flex-col gap-2">
                                <label htmlFor="imageFile" className="text-2xl font-black uppercase text-black">Image Upload (Optional)</label>
                                <input type="file" accept="image/*" id="imageFile" name="imageFile" className="bg-white text-black border-4 border-black p-3 text-xl font-bold focus:outline-none focus:bg-yellow-100 transition-colors file:mr-4 file:py-2 file:px-4 file:border-4 file:border-black file:text-lg file:font-black file:uppercase file:bg-coral file:text-black hover:file:bg-sage hover:file:translate-y-1 hover:file:translate-x-1 hover:file:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] file:transition-all cursor-pointer" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="tags" className="text-2xl font-black uppercase text-black">Tags (Comma Separated)</label>
                        <input type="text" id="tags" name="tags" placeholder="e.g. Brainrot, GenAlpha, Gaming" className="bg-white text-black border-4 border-black p-4 text-xl font-bold placeholder-black/50 focus:outline-none focus:bg-yellow-100 transition-colors" />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 brutal-btn bg-black text-white border-4 border-black p-6 text-2xl font-black uppercase shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-4 hover:bg-zinc-800 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto self-end"
                    >
                        {loading ? <Loader2 className="w-8 h-8 animate-spin" strokeWidth={4} /> : <Send className="w-8 h-8" strokeWidth={4} />}
                        {loading ? "SUBMITTING..." : "SUBMIT ENTRY"}
                    </button>
                </motion.form>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { translateBrainrot } from "@/lib/actions";
import { Loader2, ArrowRightLeft, Languages } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TranslatorPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<'to_brainrot' | 'to_boomer'>('to_brainrot');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleMode = () => {
        setMode(prev => prev === 'to_brainrot' ? 'to_boomer' : 'to_brainrot');
        setInput(output);
        setOutput("");
    };

    const handleTranslate = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const res = await translateBrainrot(input, mode);
            if (res.success && res.text) {
                setOutput(res.text);
            } else {
                setError(res.error || "Failed to translate.");
            }
        } catch (e) {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-24 px-4 bg-sage border-b-8 border-black font-mono">
            <div className="container mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="mb-12 border-8 border-black bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rotate-1 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-black uppercase leading-none" style={{ textShadow: "4px 4px 0px #39FF14" }}>
                            THE TRANSLATOR
                        </h1>
                        <p className="mt-6 text-lg md:text-xl font-bold bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black inline-block">
                            Convert standard English into Gen Alpha slang, and vice versa.
                        </p>
                    </div>
                    <Languages className="w-24 h-24 md:w-32 md:h-32 text-black opacity-20 hidden md:block" />
                </div>

                {/* Translation Interface */}
                <div className="bg-white border-8 border-black p-6 md:p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] -rotate-1">

                    {/* Mode Toggle Bar */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 bg-gray-100 border-4 border-black p-4">
                        <span className={cn("text-xl md:text-3xl font-black uppercase transition-colors tracking-tighter", mode === 'to_brainrot' ? 'text-black' : 'text-gray-400')}>
                            STANDARD ENGLISH
                        </span>

                        <button
                            onClick={toggleMode}
                            className="bg-yellow-400 border-4 border-black p-2 hover:bg-coral hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all"
                            title="Swap Languages"
                        >
                            <ArrowRightLeft className="w-8 h-8 text-black" strokeWidth={3} />
                        </button>

                        <span className={cn("text-xl md:text-3xl font-black uppercase transition-colors tracking-tighter", mode === 'to_boomer' ? 'text-black' : 'text-gray-400')}>
                            GEN ALPHA SLANG
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Input Area */}
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl font-black uppercase underline decoration-4 underline-offset-4 decoration-skyblue">
                                INPUT
                            </h2>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={mode === 'to_brainrot' ? "Type normal English here... (e.g. 'I am very excited for the party tonight.')" : "Type brainrot here... (e.g. 'skibidi toilet rizz party boutta go crazy on god')"}
                                className="w-full h-64 resize-none outline-none text-xl p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 transition-all text-black font-bold placeholder:font-normal placeholder:opacity-50"
                            />
                            <button
                                onClick={handleTranslate}
                                disabled={loading || !input.trim()}
                                className="brutal-btn py-4 bg-black text-white hover:bg-coral hover:text-black w-full text-2xl"
                            >
                                {loading ? "TRANSLATING..." : "TRANSLATE"}
                            </button>
                        </div>

                        {/* Output Area */}
                        <div className="flex flex-col gap-4">
                            <h2 className="text-2xl font-black uppercase underline decoration-4 underline-offset-4 decoration-coral items-center flex justify-between">
                                <span>OUTPUT</span>
                                {loading && <Loader2 className="w-6 h-6 animate-spin text-black" />}
                            </h2>
                            <div className="w-full h-64 overflow-y-auto p-4 bg-gray-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inset-shadow">
                                {error ? (
                                    <p className="text-xl font-bold text-red-600">{error}</p>
                                ) : output ? (
                                    <p className="text-2xl font-bold text-black leading-relaxed">
                                        {output}
                                    </p>
                                ) : (
                                    <p className="text-xl font-bold text-gray-400 uppercase text-center mt-24">
                                        Waiting for input...
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

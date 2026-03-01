"use client";

import { useState } from "react";
import { decodeBrainrot, decodeVideoUrl } from "@/lib/actions";
import { Loader2, ArrowRight, XCircle, FileText, Video } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function DecoderPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'text' | 'video'>('text');
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        translation: string;
        identifiedTerms: string[];
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTabSwitch = (tab: 'text' | 'video') => {
        if (loading) return;
        setActiveTab(tab);
        setInput("");
        setResult(null);
        setError(null);
    };

    const handleDecode = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = activeTab === 'text'
                ? await decodeBrainrot(input)
                : await decodeVideoUrl(input);

            if (res.success) {
                if (activeTab === 'video' && 'id' in res && res.id) {
                    router.push(`/analysis/${res.id}`);
                    return; // Stop loading spinner transition
                } else if ('data' in res && res.data) {
                    setResult(res.data);
                }
            } else {
                setError(res.error || "Failed to decode.");
            }
        } catch (e) {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (loading && activeTab === 'video') {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-coral p-4 font-mono">
                {/* Solid Background */}

                <div className="bg-white border-8 border-black p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center max-w-sm w-full -rotate-2 relative z-10">
                    <div className="relative w-24 h-24 mb-6">
                        <div className="absolute inset-0 border-8 border-black border-t-yellow-400 rounded-full animate-spin"></div>
                        <div className="absolute inset-2 border-8 border-black border-b-sky-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    </div>

                    <h2 className="text-2xl font-black text-black uppercase mb-4">
                        Brain Scanning...
                    </h2>
                    <p className="text-gray-600 font-bold uppercase text-sm">
                        Accessing global memetic database, analyzing layers of irony, diagnosing terminal brainrot...
                    </p>
                    <div className="w-full bg-gray-200 border-4 border-black h-8 mt-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-sage w-1/2 border-r-4 border-black animate-slide-right" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen pt-32 pb-24 px-4 bg-coral border-b-8 border-black font-mono">
            <div className="container mx-auto max-w-5xl">
                {/* Header Section */}
                <div className="mb-12 border-8 border-black bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-black uppercase leading-none" style={{ textShadow: "6px 6px 0px #87CEEB" }}>
                        THE DECODER
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl font-bold bg-sage border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black inline-block">
                        Paste confusing texts or drop a TikTok/Instagram URL. Let the AI translate the brainrot into plain English.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => handleTabSwitch('text')}
                        className={cn(
                            "flex-1 md:flex-none border-4 border-black px-6 py-4 font-black text-lg md:text-2xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3",
                            activeTab === 'text' ? "bg-black text-white translate-y-1 shadow-none" : "bg-white text-black hover:bg-gray-100"
                        )}
                    >
                        <FileText className="w-6 h-6" /> Text
                    </button>
                    <button
                        onClick={() => handleTabSwitch('video')}
                        className={cn(
                            "flex-1 md:flex-none border-4 border-black px-6 py-4 font-black text-lg md:text-2xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3",
                            activeTab === 'video' ? "bg-black text-white translate-y-1 shadow-none" : "bg-white text-black hover:bg-gray-100"
                        )}
                    >
                        <Video className="w-6 h-6" /> Video URL
                    </button>
                </div>

                {/* Main Content Grid: Full centered layout for Video, Two-column for Text */}
                <div className={cn("mt-12 md:max-h-[70vh]", activeTab === 'text' ? "grid lg:grid-cols-2 gap-8 lg:gap-12" : "flex justify-center")}>

                    {/* Input Area */}
                    <div className={cn("flex flex-col gap-6", activeTab === 'video' && "w-full max-w-2xl")}>
                        <div className="relative border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4">
                            <label className="block text-2xl font-black text-black uppercase mb-4 underline decoration-4 underline-offset-4 decoration-coral">
                                {activeTab === 'text' ? 'SOURCE TEXT' : 'VIDEO URL'}
                            </label>

                            {activeTab === 'text' ? (
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Paste comment here (e.g. 'bro has negative aura, literal npc behavior💀')"
                                    className="w-full h-64 md:h-80 resize-none outline-none text-xl p-4 bg-gray-100 border-2 border-black focus:bg-white transition-colors text-black font-bold placeholder:font-normal placeholder:opacity-50"
                                />
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <input
                                        type="url"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="https://www.tiktok.com/... or https://www.instagram.com/reel/..."
                                        className="w-full outline-none text-xl p-4 bg-gray-100 border-2 border-black focus:bg-white transition-colors text-black font-bold placeholder:font-normal placeholder:opacity-50"
                                    />
                                    <p className="text-gray-500 font-bold px-2">
                                        Note: We leverage free APIs to fetch the video buffer. It may occasionally fail or timeout based on TikTok/Instagram's anti-bot protections.
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleDecode}
                            disabled={loading || !input.trim()}
                            className={cn(
                                "brutal-btn py-6 flex items-center justify-center gap-4 text-2xl uppercase",
                                "disabled:opacity-50 disabled:cursor-not-allowed bg-skyblue"
                            )}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                    <span>{activeTab === 'video' ? 'DOWNLOADING & ANALYZING...' : 'ANALYZING...'}</span>
                                </>
                            ) : (
                                <>
                                    <span>{activeTab === 'video' ? 'DECODE REEL' : 'DECODE TEXT'}</span>
                                    <ArrowRight className="w-8 h-8" strokeWidth={4} />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Output Area - Only show for Text */}
                    {activeTab === 'text' && (
                        <div className="flex flex-col h-full mt-8 lg:mt-0">
                            <div className="min-h-[500px] border-8 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 rotate-1 flex flex-col">
                                <h2 className="text-3xl font-black text-black uppercase mb-6 bg-yellow-400 self-start px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    PLAIN ENGLISH TRANSLATION
                                </h2>

                                <div className="flex-grow flex flex-col justify-center">
                                    {loading && (
                                        <div className="flex flex-col items-center justify-center text-center opacity-50 animate-pulse">
                                            <div className="text-4xl mb-4 font-bold">...</div>
                                            <p className="text-xl font-bold uppercase">Consulting Lore Archives...</p>
                                        </div>
                                    )}

                                    {error && (
                                        <div className="bg-red-200 border-4 border-black p-6 flex items-center gap-4">
                                            <XCircle className="w-12 h-12 flex-shrink-0 text-red-600" />
                                            <p className="text-xl font-bold text-red-900">{error}</p>
                                        </div>
                                    )}

                                    {!loading && !error && !result && (
                                        <div className="text-center opacity-50 border-4 border-dashed border-black p-12">
                                            <p className="text-2xl font-bold uppercase">WAITING FOR INPUT...</p>
                                        </div>
                                    )}

                                    {!loading && !error && result && (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div className="text-2xl md:text-3xl font-bold leading-relaxed text-black">
                                                "{result.translation}"
                                            </div>

                                            {result.identifiedTerms && result.identifiedTerms.length > 0 && (
                                                <div className="mt-8 pt-8 border-t-4 border-black border-dashed">
                                                    <h3 className="text-lg font-black uppercase mb-4 text-gray-500">
                                                        Identified Brainrot Terms:
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {result.identifiedTerms.map((term, i) => (
                                                            <Link
                                                                key={i}
                                                                href={`/search?q=${encodeURIComponent(term)}`}
                                                                className="px-3 py-1 bg-black text-white text-sm font-bold uppercase hover:bg-coral hover:-translate-y-1 transition-transform border-b-4 border-transparent hover:border-black"
                                                            >
                                                                {term}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

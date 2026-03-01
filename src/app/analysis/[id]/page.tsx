import { getVideoAnalysis } from "@/lib/actions";
import { Activity, Quote, Users, BookOpen, Hash, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import ShareClientButton from "./ShareClientButton";
import ShareableStoryCard from "./ShareableStoryCard";

export default async function VideoAnalysisPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const result = await getVideoAnalysis(id);

    if (!result) {
        notFound();
    }

    return (
        <main className="min-h-screen pt-32 pb-24 px-4 bg-coral border-b-8 border-black font-mono relative overflow-hidden">
            {/* Solid Background */}

            <div className="container mx-auto max-w-6xl relative z-10">
                <Link
                    href="/decode"
                    className="inline-flex items-center gap-2 mb-8 text-black font-bold uppercase hover:bg-black hover:text-white px-4 py-2 border-4 border-transparent hover:border-black transition-all bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Scanner
                </Link>

                <div className="mb-12 border-8 border-black bg-white p-6 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] md:-rotate-1">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-black uppercase leading-[1.1]" style={{ textShadow: "3px 3px 0px #87CEEB" }}>
                        Lab Results
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl font-bold text-gray-600 mt-4 uppercase max-w-2xl">
                        AI-Generated brainrot diagnostics for your requested video.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-start">

                    <div className="border-8 border-black bg-black overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative aspect-[9/16] md:rotate-1 mx-auto w-full max-w-sm lg:max-w-md self-start" style={{ maxHeight: '70vh' }}>
                        <video
                            src={result.videoUrl}
                            controls
                            autoPlay
                            loop
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                    </div>

                    {/* Right: Analytics Dashboard */}
                    <div id="shareable-card" className="flex flex-col gap-6 md:-rotate-1 pb-4">

                        {/* Score Card */}
                        <div className="flex-shrink-0 bg-white border-8 border-black p-6 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 relative z-10 text-black gap-4 sm:gap-0">
                                <span className="text-xl md:text-2xl font-black uppercase flex items-center gap-3">
                                    <Activity className="w-8 h-8" /> Brainrot Level
                                </span>
                                <span className="text-5xl sm:text-6xl font-black shrink-0">{result.brainrotScore}<span className="text-2xl sm:text-3xl text-gray-400">/100</span></span>
                            </div>

                            {/* Progress Bar Container */}
                            <div className="h-10 w-full bg-gray-100 border-4 border-black overflow-hidden relative z-10">
                                <div
                                    className={cn(
                                        "h-full ease-out border-r-4 border-black animate-scale-x-left cursor-default",
                                        result.brainrotScore > 75 ? "bg-red-500" : result.brainrotScore > 40 ? "bg-yellow-400" : "bg-green-400"
                                    )}
                                    style={{ width: `${result.brainrotScore}%`, animationDuration: '1.5s' }}
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-4 text-9xl font-black text-black/5 group-hover:scale-110 group-hover:text-black/10 transition-all duration-700 pointer-events-none">
                                {result.brainrotScore}
                            </div>
                        </div>

                        {/* Featured Characters Banner */}
                        {(result.characters?.length || 0) > 0 && (
                            <div className="bg-coral border-8 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                <h3 className="text-xl md:text-2xl font-black text-black uppercase mb-4 flex items-center gap-3 border-b-4 border-black pb-4">
                                    <Users className="w-6 h-6 sm:w-8 sm:h-8" /> Featuring
                                </h3>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {result.characters?.map((c: string, i: number) => (
                                        <span key={i} className="max-w-full break-words px-4 sm:px-5 py-2 bg-white text-black border-4 border-black text-base sm:text-lg font-bold uppercase hover:bg-black hover:text-white cursor-default transition-colors">{c}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Analysis Explanation */}
                        {result.explanation && (
                            <div className="bg-yellow-400 border-8 border-black p-6 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                <div className="flex flex-col sm:flex-row items-start gap-4 text-black">
                                    <BookOpen className="w-8 h-8 flex-shrink-0 mt-1 hidden sm:block" />
                                    <div>
                                        <h3 className="text-xl font-black uppercase mb-3 flex items-center gap-2">
                                            <BookOpen className="w-6 h-6 sm:hidden" /> Lore Breakdown
                                        </h3>
                                        <p className="text-base sm:text-lg md:text-xl font-bold leading-relaxed">
                                            {result.explanation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {(result.themes?.length || 0) > 0 && (
                                <div className="bg-sage border-8 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 flex-1">
                                    <h3 className="text-sm font-black text-black uppercase mb-4 flex items-center gap-2 border-b-4 border-black pb-3">
                                        <BookOpen className="w-5 h-5" /> Lore / Themes
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.themes?.map((t: string, i: number) => (
                                            <span key={i} className="px-3 py-1 bg-white border-4 text-black border-black text-sm font-bold uppercase hover:bg-black hover:text-white cursor-default transition-colors">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {result.identifiedTerms && result.identifiedTerms.length > 0 && (
                            <div className="bg-white border-8 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                <h3 className="text-sm font-black uppercase mb-4 flex items-center gap-2 text-black">
                                    <Hash className="w-5 h-5" /> Slang Used
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {result.identifiedTerms.map((term: string, i: number) => (
                                        <Link
                                            key={i}
                                            href={`/search?q=${encodeURIComponent(term)}`}
                                            className="px-4 py-2 bg-black text-white text-sm font-bold uppercase hover:bg-coral border-b-4 border-transparent hover:border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                        >
                                            #{term}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <ShareClientButton />
                    </div>
                </div>
            </div>

            {/* Hidden High-Quality Print Canvas */}
            <ShareableStoryCard result={result} />
        </main>
    );
}

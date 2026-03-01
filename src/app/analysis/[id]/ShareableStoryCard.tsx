import { Activity, Users, BookOpen, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareableStoryCardProps {
    result: any;
}

export default function ShareableStoryCard({ result }: ShareableStoryCardProps) {
    return (
        <div
            id="shareable-story-card"
            className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none w-[1080px] h-[1920px] bg-[#FF5429] flex flex-col p-16 font-mono border-[32px] border-black text-black"
        >
            <div className="bg-white border-[16px] border-black w-full h-full flex flex-col p-12 shadow-[32px_32px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden text-black">

                {/* Header elements */}
                <div className="flex justify-between items-start mb-16">
                    <div className="bg-yellow-400 border-[12px] border-black px-8 py-4 -rotate-2">
                        <span className="text-4xl font-black text-black uppercase tracking-tight" style={{ color: "black" }}>BRAINROT LABS</span>
                    </div>
                    <div className="bg-black text-white px-8 py-4 border-[12px] border-black shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] rotate-2">
                        <span className="text-3xl font-bold uppercase" style={{ color: "white" }}>CONFIDENTIAL</span>
                    </div>
                </div>

                {/* Score Section */}
                <div className="bg-[#39FF14] border-[16px] border-black p-12 mb-16 flex flex-col items-center justify-center -rotate-1 relative shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] z-10">
                    <h2 className="text-5xl font-black uppercase text-black mb-8 border-b-8 border-black pb-4 flex items-center gap-4" style={{ color: "black" }}>
                        <Activity className="w-16 h-16" strokeWidth={4} style={{ color: "black" }} /> OFFICIAL DIAGNOSIS
                    </h2>
                    <div className="text-[200px] font-black tracking-tighter leading-none text-black drop-shadow-[16px_16px_0px_rgba(255,255,255,1)]" style={{ color: "black" }}>
                        {result.brainrotScore}
                    </div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 gap-12 flex-grow">

                    {/* Characters */}
                    {(result.characters?.length || 0) > 0 && (
                        <div className="bg-white border-[12px] border-black p-10 rotate-1 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-4xl font-black text-black uppercase mb-6 flex items-center gap-4 border-b-[8px] border-black pb-4" style={{ color: "black" }}>
                                <Users className="w-12 h-12 text-black" strokeWidth={4} style={{ color: "black" }} /> PATIENTS INVOLVED
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {result.characters?.map((c: string, i: number) => (
                                    <span key={i} className="px-6 py-3 bg-black text-white border-[6px] border-transparent text-3xl font-bold uppercase">{c}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Explainer / Lore */}
                    {result.explanation && (
                        <div className="bg-[#ebecf0] border-[12px] border-black p-10 -rotate-1 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] h-full">
                            <h3 className="text-4xl font-black text-black uppercase mb-6 flex items-center gap-4 border-b-[8px] border-black pb-4" style={{ color: "black" }}>
                                <BookOpen className="w-12 h-12 text-black" strokeWidth={4} style={{ color: "black" }} /> CLINICAL NOTES
                            </h3>
                            <p className="text-4xl font-bold text-black leading-relaxed line-clamp-6" style={{ color: "black" }}>
                                "{result.explanation}"
                            </p>
                        </div>
                    )}

                    {/* Slang Used */}
                    {result.identifiedTerms && result.identifiedTerms.length > 0 && (
                        <div className="bg-white border-[12px] border-black p-10 rotate-1 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] mt-auto text-black">
                            <h3 className="text-3xl font-black text-black uppercase mb-6 border-b-[6px] border-black pb-4" style={{ color: "black" }}>
                                DETECTED VOCABULARY
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {result.identifiedTerms.map((term: string, i: number) => (
                                    <span key={i} className="text-3xl font-bold text-black uppercase bg-yellow-400 border-[6px] border-black px-4 py-2" style={{ color: "black" }}>
                                        #{term}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Watermark */}
                <div className="absolute bottom-12 right-12 text-5xl font-black text-gray-300 -rotate-6 tracking-widest opacity-50 z-0">
                    BRAINROT INDEX
                </div>
            </div>
        </div>
    );
}

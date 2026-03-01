import { ScanSearch, BookOpen, Share2, TrendingUp, ThumbsUp, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Video Scanner",
        description: "Drop in any Instagram Reel or TikTok link to instantly extract and diagnose the Brainrot level of the video.",
        icon: ScanSearch,
        color: "bg-coral",
    },
    {
        title: "Slang Dictionary",
        description: "Browse the world's most comprehensive index of modern Gen-Z and Alpha slang with full etymology breakdowns.",
        icon: BookOpen,
        color: "bg-[#39FF14]",
    },
    {
        title: "Shareable Cards",
        description: "Export high-resolution brutalist diagnosis cards optimized for 9:16 Instagram Story formats to share with friends.",
        icon: Share2,
        color: "bg-yellow-400",
    },
    {
        title: "Community Voting",
        description: "Upvote or downvote the hardest hitting slang to push it up the trending charts and curate the dictionary.",
        icon: ThumbsUp,
        color: "bg-skyblue",
    },
    {
        title: "Viral Trends",
        description: "Track which characters, memes, and phrases are spiking in real-time across the major social platforms.",
        icon: TrendingUp,
        color: "bg-white",
    },
    {
        title: "Lore Breakdowns",
        description: "Detailed historical context explaining the origins and deep lore behind cryptic internet phenomena.",
        icon: ShieldAlert,
        color: "bg-sage",
    }
];

export default function FeaturesSection() {
    return (
        <section className="py-24 px-4 bg-black border-y-8 border-white font-mono relative overflow-hidden">
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="mb-16 md:mb-24 flex justify-between items-end border-b-8 border-white pb-6">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mix-blend-difference" style={{ textShadow: "4px 4px 0px #FF5429" }}>
                            Features
                        </h2>
                        <p className="text-xl md:text-2xl font-bold text-gray-400 mt-4 max-w-2xl">
                            Everything you need to survive the modern internet ecosystem.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "border-8 border-white p-8 group transition-all duration-300 hover:-translate-y-2 hover:-translate-x-2 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)]",
                                feature.color
                            )}
                        >
                            <feature.icon className="w-16 h-16 text-black mb-6" strokeWidth={3} />
                            <h3 className="text-3xl font-black text-black uppercase mb-4 border-b-4 border-black pb-2">
                                {feature.title}
                            </h3>
                            <p className="text-lg font-bold text-black leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Texture Element */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "40px 40px" }} />
        </section>
    );
}

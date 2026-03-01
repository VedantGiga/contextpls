"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, Info, Activity, Globe, Share2, Tag, Image as ImageIcon, ThumbsUp, ThumbsDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { voteMeme } from "@/lib/actions";

export default function DetailPageClient({ meme }: { meme: any }) {
    const [votes, setVotes] = useState({ up: meme.upvotes || 0, down: meme.downvotes || 0 });
    const [hasVoted, setHasVoted] = useState<'upvote' | 'downvote' | null>(null);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const handleVote = async (type: 'upvote' | 'downvote') => {
        if (hasVoted) return;

        // Optimistic UI update
        setHasVoted(type);
        setVotes(prev => ({
            ...prev,
            [type === 'upvote' ? 'up' : 'down']: prev[type === 'upvote' ? 'up' : 'down'] + 1
        }));

        // Fire Server Action
        await voteMeme(meme.id, type);
    };

    const getPhaseColor = (phase: string) => {
        switch (phase) {
            case "Explosion": return "bg-coral text-black";
            case "Saturation": return "bg-skyblue text-black";
            case "Irony": return "bg-sage text-black";
            case "Archive": return "bg-white text-black";
            default: return "bg-white text-black";
        }
    };

    const getScoreColorBg = (score: number) => {
        if (score > 90) return "bg-coral";
        if (score > 75) return "bg-skyblue";
        return "bg-sage";
    };

    return (
        <article className="min-h-screen bg-white pt-24 pb-32">
            {/* Scroll Progress Indicator */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-4 bg-black z-[100] origin-left"
                style={{ scaleX }}
            />
            <motion.div
                className={`fixed top-0 left-0 right-0 h-2 z-[101] origin-left ${getScoreColorBg(meme.brainrotScore)}`}
                style={{ scaleX }}
            />

            <div className="container mx-auto px-4 max-w-6xl relative">
                <Link
                    href="/"
                    className="inline-flex items-center gap-3 brutal-btn px-6 py-3 bg-white mb-12"
                >
                    <ArrowLeft className="w-5 h-5" strokeWidth={3} />
                    BACK TO ENCYCLOPEDIA
                </Link>

                {/* Header Section */}
                <header className="mb-16">
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className={cn("px-4 py-2 border-4 border-black text-sm font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]", getPhaseColor(meme.lifecyclePhase))}>
                            {meme.lifecyclePhase}
                        </span>
                        <span className="bg-white border-4 border-black px-4 py-2 text-sm font-black text-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                            <Globe className="w-4 h-4" strokeWidth={3} />
                            {meme.platform}
                        </span>
                        <span className="bg-white border-4 border-black px-4 py-2 text-sm font-black text-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
                            <Clock className="w-4 h-4" strokeWidth={3} />
                            {meme.firstSeen}
                        </span>
                    </div>

                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-display font-black text-black uppercase mb-8 tracking-tighter leading-none break-words"
                        style={{ textShadow: '4px 4px 0px #FF007F' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {meme.title}
                    </motion.h1>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <p className="text-3xl md:text-4xl font-bold text-black border-8 border-black bg-sage p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-4xl rotate-1 flex-1">
                            {meme.shortDefinition}
                        </p>

                        {/* Voting Widget */}
                        <div className="flex flex-row md:flex-col gap-4 bg-white border-8 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:-rotate-2 shrink-0 self-stretch justify-center items-center font-mono">
                            <button
                                onClick={() => handleVote('upvote')}
                                disabled={hasVoted !== null}
                                className={cn(
                                    "flex flex-col items-center gap-2 p-3 border-4 border-transparent hover:border-black transition-all",
                                    hasVoted === 'upvote' ? "bg-green-400 text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "text-gray-500 hover:text-black",
                                    hasVoted && hasVoted !== 'upvote' && "opacity-30"
                                )}
                            >
                                <ThumbsUp className={cn("w-8 h-8", hasVoted === 'upvote' && "fill-black")} strokeWidth={3} />
                                <span className="text-2xl font-black">{votes.up}</span>
                            </button>

                            <div className="w-1 md:w-full h-full md:h-1 bg-gray-200"></div>

                            <button
                                onClick={() => handleVote('downvote')}
                                disabled={hasVoted !== null}
                                className={cn(
                                    "flex flex-col items-center gap-2 p-3 border-4 border-transparent hover:border-black transition-all",
                                    hasVoted === 'downvote' ? "bg-red-400 text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "text-gray-500 hover:text-black",
                                    hasVoted && hasVoted !== 'downvote' && "opacity-30"
                                )}
                            >
                                <span className="text-2xl font-black">{votes.down}</span>
                                <ThumbsDown className={cn("w-8 h-8", hasVoted === 'downvote' && "fill-black")} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 items-start">
                    <div className="lg:col-span-2 space-y-16">

                        <section className="relative">
                            <div className="absolute -top-6 -left-6 bg-skyblue border-4 border-black px-4 py-2 font-black text-2xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2 z-10">
                                <Info className="inline-block mr-2 w-6 h-6" strokeWidth={3} /> THE ORIGIN
                            </div>
                            <div className="bg-white border-8 border-black p-10 pt-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-2xl font-bold text-black leading-relaxed">
                                    {meme.origin}
                                </p>
                            </div>
                        </section>

                        <section className="relative">
                            <div className="absolute -top-6 -right-6 bg-coral border-4 border-black px-4 py-2 font-black text-2xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-2 z-10">
                                <Activity className="inline-block mr-2 w-6 h-6" strokeWidth={3} /> GROWTH PATTERN
                            </div>
                            <div className="bg-white border-8 border-black p-10 pt-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-2xl font-bold text-black leading-relaxed">
                                    {meme.growthPattern}
                                </p>
                            </div>
                        </section>

                        <section className="relative">
                            <div className="absolute -top-6 -left-6 bg-yellow-400 border-4 border-black px-4 py-2 font-black text-2xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 z-10">
                                <Share2 className="inline-block mr-2 w-6 h-6" strokeWidth={3} /> CULTURAL MEANING
                            </div>
                            <div className="bg-white border-8 border-black p-10 pt-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-2xl font-bold text-black leading-relaxed">
                                    {meme.culturalMeaning}
                                </p>
                            </div>
                        </section>

                        {meme.imageUrl && (
                            <section className="relative">
                                <div className="absolute -top-6 -right-6 bg-lime-400 border-4 border-black px-4 py-2 font-black text-2xl uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-2 z-10">
                                    <ImageIcon className="inline-block mr-2 w-6 h-6" strokeWidth={3} /> VISUAL EVIDENCE
                                </div>
                                <div className="bg-white border-8 border-black p-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                                    <img src={meme.imageUrl} alt={meme.title} className="w-full h-auto object-contain border-4 border-black" />
                                </div>
                            </section>
                        )}

                    </div>

                    <aside className="space-y-12">
                        {/* Brainrot Score Card */}
                        <div className="bg-white border-8 border-black p-8 relative overflow-visible flex flex-col items-center text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-1">
                            <h3 className="text-2xl font-black text-black bg-skyblue border-4 border-black px-4 py-2 absolute -top-8 uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                BRAINROT SCORE
                            </h3>

                            <div className="w-full flex flex-col items-center mt-12 mb-8">
                                <span className={`text-9xl font-display font-black text-black mb-4 drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]`}>
                                    {meme.brainrotScore}
                                </span>

                                <div className="w-full h-8 border-4 border-black bg-white flex shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                                    <motion.div
                                        className={`h-full border-r-4 border-black ${getScoreColorBg(meme.brainrotScore)}`}
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${meme.brainrotScore}%` }}
                                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                    />
                                </div>
                            </div>

                            <p className="text-lg text-black font-bold leading-snug border-t-4 border-black pt-6">
                                Rating based on lexical absurdity, audio distortion, and cross-generational incomprehensibility.
                            </p>
                        </div>

                        {/* Tags & Related */}
                        <div className="bg-white border-8 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                            <h3 className="text-2xl font-black text-black uppercase mb-6 flex items-center gap-3 underline decoration-4">
                                <Tag className="w-6 h-6" strokeWidth={3} /> TAXONOMY
                            </h3>
                            <div className="flex flex-wrap gap-3 mb-10">
                                {meme.tags?.map((tag: any) => (
                                    <span key={tag.id || tag} className="max-w-full break-words px-4 py-2 font-black text-black uppercase bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-sage hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
                                        #{tag.name || tag}
                                    </span>
                                ))}
                            </div>

                            {meme.relatedMemes && meme.relatedMemes.length > 0 && (
                                <>
                                    <h3 className="text-2xl font-black text-black uppercase mb-6 border-t-8 border-black pt-8">
                                        RELATED ANOMALIES
                                    </h3>
                                    <ul className="space-y-4">
                                        {meme.relatedMemes.split(",").filter(Boolean).map((related: string) => (
                                            <li key={related}>
                                                <Link href={`/meme/${related.trim().toLowerCase().replace(/\s+/g, '-')}`} className="group flex items-center justify-between p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-skyblue hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all">
                                                    <span className="font-black text-black uppercase text-xl">{related.trim()}</span>
                                                    <ArrowLeft className="w-6 h-6 text-black rotate-180 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}

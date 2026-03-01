"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPendingMemes, approveMeme, isAdmin, loginAdmin, generateMemeAnalysis } from "@/lib/actions";
import { Loader2, Check, Clock, ShieldAlert, Sparkles, AlertTriangle } from "lucide-react";

export default function AdminPage() {
    const [pending, setPending] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [analyzingId, setAnalyzingId] = useState<string | null>(null);

    useEffect(() => {
        checkAuthAndLoad();
    }, []);

    const checkAuthAndLoad = async () => {
        setLoading(true);
        const authStatus = await isAdmin();
        setAuthenticated(authStatus);

        if (authStatus) {
            const result = await getPendingMemes();
            if (result.success) {
                setPending(result.memes || []);
            }
        }
        setLoading(false);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setAuthError("");

        const res = await loginAdmin(password);
        if (res.success) {
            setAuthenticated(true);
            const result = await getPendingMemes();
            if (result.success) {
                setPending(result.memes || []);
            }
        } else {
            setAuthError(res.error || "Access Denied");
        }
        setLoading(false);
    };

    const handleApprove = async (id: string) => {
        const result = await approveMeme(id);
        if (result.success) {
            setPending(prev => prev.filter(m => m.id !== id));
        } else {
            alert("Failed to approve meme.");
        }
    };

    const handleAnalyze = async (id: string) => {
        setAnalyzingId(id);
        const result = await generateMemeAnalysis(id);
        if (result.success) {
            // Update the pending array with the new analysis
            setPending(prev => prev.map(m => m.id === id ? result.meme : m));
        } else {
            alert(result.error || "Failed to generate AI analysis.");
        }
        setAnalyzingId(null);
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 bg-sage border-b-8 border-black">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-12 border-8 border-black bg-white p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rotate-1 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-7xl font-black text-black uppercase leading-none"
                        >
                            ADMIN <br className="hidden md:block" /> DASHBOARD
                        </motion.h1>
                        <p className="mt-4 text-xl font-bold bg-black text-white p-2 inline-block uppercase">
                            Moderate User Submissions
                        </p>
                    </div>
                    <div className="bg-coral border-4 border-black p-6 flex flex-col items-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-6xl font-black text-black">{pending.length}</span>
                        <span className="text-xl font-black uppercase text-black">Pending</span>
                    </div>
                </div>

                {!authenticated && !loading ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white border-8 border-black p-8 max-w-xl mx-auto mt-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] text-center"
                    >
                        <ShieldAlert className="w-24 h-24 mx-auto mb-6 text-coral" strokeWidth={3} />
                        <h2 className="text-4xl font-black uppercase text-black mb-2">Restricted Area</h2>
                        <p className="text-xl font-bold text-gray-600 uppercase mb-8">Enter the master password to access the moderation queue.</p>

                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
                            {authError && (
                                <div className="bg-coral text-white p-4 border-4 border-black font-black uppercase text-xl">
                                    {authError}
                                </div>
                            )}
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="PASSWORD"
                                className="bg-gray-100 text-black border-4 border-black p-4 text-2xl font-black text-center focus:outline-none focus:bg-yellow-200 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="brutal-btn bg-black text-white p-4 border-4 border-black font-black text-2xl uppercase mt-4 flex justify-center items-center hover:bg-zinc-800 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : "AUTHENTICATE"}
                            </button>
                        </form>
                    </motion.div>
                ) : loading ? (
                    <div className="flex justify-center py-24">
                        <Loader2 className="w-16 h-16 animate-spin text-black" strokeWidth={4} />
                    </div>
                ) : pending.length === 0 ? (
                    <div className="bg-white border-8 border-black p-16 text-center shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-4xl font-black uppercase text-black">Queue is Empty</h2>
                        <p className="text-2xl mt-4 font-bold text-gray-600">No pending submissions to review.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {pending.map((meme) => (
                            <motion.div
                                key={meme.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white border-8 border-black flex flex-col md:flex-row shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <div className="p-8 flex-1 flex flex-col gap-4 border-b-8 md:border-b-0 md:border-r-8 border-black">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-4xl font-black uppercase text-black">{meme.title}</h3>
                                            <p className="text-lg font-bold text-gray-500 uppercase mt-1">
                                                Submitted: {new Date(meme.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className="bg-yellow-300 border-4 border-black px-4 py-2 font-black uppercase flex items-center gap-2 text-black">
                                            <Clock className="w-5 h-5" /> Pending
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="bg-skyblue/30 border-4 border-black p-4">
                                            <span className="block text-sm font-black text-black uppercase mb-1">Origin</span>
                                            <span className="text-lg font-bold text-black">{meme.origin}</span>
                                        </div>
                                        <div className="bg-coral/30 border-4 border-black p-4">
                                            <span className="block text-sm font-black text-black uppercase mb-1">Platform</span>
                                            <span className="text-lg font-bold text-black">{meme.platform}</span>
                                        </div>
                                    </div>

                                    <div className="bg-black text-white p-6 mt-2 border-4 border-black border-dashed">
                                        <span className="block text-sm font-black text-yellow-300 uppercase mb-2">Definition</span>
                                        <p className="text-xl font-bold">{meme.shortDefinition}</p>
                                    </div>

                                    {meme.imageUrl && (
                                        <div className="mt-4 border-4 border-black p-2 bg-gray-100">
                                            <span className="block text-sm font-black text-black uppercase mb-2">Image URL</span>
                                            <a href={meme.imageUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-bold break-all hover:underline">
                                                {meme.imageUrl}
                                            </a>
                                        </div>
                                    )}

                                    {/* Show AI Fields if Generated */}
                                    {meme.culturalMeaning && meme.culturalMeaning !== "Pending Analysis" && (
                                        <div className="mt-4 p-4 border-4 border-black bg-yellow-100">
                                            <div className="flex items-center gap-2 mb-4">
                                                <Sparkles className="w-5 h-5 text-black" strokeWidth={3} />
                                                <span className="font-black uppercase text-black">AI Analysis Generated</span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <span className="block text-sm font-black text-black uppercase">Cultural Meaning</span>
                                                    <p className="font-bold text-sm bg-white text-black p-3 border-4 border-black mt-1 leading-relaxed">{meme.culturalMeaning}</p>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <span className="block text-sm font-black text-black uppercase">Growth Pattern</span>
                                                        <span className="font-bold text-sm bg-white text-black p-2 border-4 border-black inline-block mt-1">{meme.growthPattern}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-sm font-black text-black uppercase">Brainrot Score</span>
                                                        <span className="font-black text-2xl text-coral bg-white px-3 py-2 border-4 border-black inline-block mt-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">{meme.brainrotScore}/100</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 bg-gray-100 flex flex-col items-center justify-center gap-4 min-w-[200px]">
                                    <button
                                        onClick={() => handleAnalyze(meme.id)}
                                        disabled={analyzingId === meme.id}
                                        className="brutal-btn bg-yellow-300 border-4 border-black p-4 w-full flex flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-200 active:translate-y-1 active:translate-x-1 active:shadow-none disabled:opacity-50 transition-all"
                                    >
                                        {analyzingId === meme.id ? <Loader2 className="w-6 h-6 animate-spin text-black" /> : <Sparkles className="w-6 h-6 text-black" strokeWidth={3} />}
                                        <span className="font-black text-lg text-black uppercase">Analyze</span>
                                    </button>

                                    <button
                                        onClick={() => handleApprove(meme.id)}
                                        className="brutal-btn bg-lime-400 border-4 border-black p-4 w-full flex flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-lime-300 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
                                    >
                                        <Check className="w-6 h-6 text-black" strokeWidth={4} />
                                        <span className="font-black text-lg text-black uppercase">Approve</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

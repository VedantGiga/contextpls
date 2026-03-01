import Link from "next/link";
import { Gavel, ArrowLeft } from "lucide-react";

export const metadata = {
    title: 'Terms of Service | Brainrot Index',
    description: 'The rules of the lab.',
};

export default function TermsPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-4 bg-yellow-400 border-b-8 border-black font-mono">
            <div className="container mx-auto max-w-4xl">

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-8 text-black font-bold uppercase hover:bg-black hover:text-white px-4 py-2 border-4 border-transparent hover:border-black transition-all bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                    <ArrowLeft className="w-5 h-5" /> Back Home
                </Link>

                <div className="bg-white border-8 border-black p-8 md:p-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-4xl md:text-6xl font-black text-black uppercase mb-8 flex items-center gap-4 border-b-8 border-black pb-6 tracking-tighter">
                        <Gavel className="w-12 h-12 md:w-16 md:h-16 text-black" strokeWidth={3} /> Terms of Service
                    </h1>

                    <div className="space-y-8 text-lg font-bold text-gray-800 leading-relaxed">
                        <p className="text-2xl text-black">
                            Last Updated: March 2026
                        </p>

                        <section>
                            <h2 className="text-2xl font-black text-black uppercase mb-4 py-2 bg-coral inline-block px-4 border-4 border-black border-l-[12px]">Acceptance of Terms</h2>
                            <p>By using the Brainrot Index, you agree to not sue us if you lose your mind watching TikToks all day.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-black uppercase mb-4 py-2 bg-skyblue inline-block px-4 border-4 border-black border-l-[12px]">User Conduct</h2>
                            <p>Do not upload illegal material. Do not submit API-spam requests to scan videos. Have some common sense.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-black uppercase mb-4 py-2 bg-sage inline-block px-4 border-4 border-black border-l-[12px]">Account Termination</h2>
                            <p>If you abuse the upvote and downvote systems with bots, we will find out and permanently ban your IP address from accessing the Index.</p>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}

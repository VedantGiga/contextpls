import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
    title: 'Privacy Policy | Brainrot Index',
    description: 'How we handle your data.',
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-4 bg-coral border-b-8 border-black font-mono">
            <div className="container mx-auto max-w-4xl">

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-8 text-black font-bold uppercase hover:bg-black hover:text-white px-4 py-2 border-4 border-transparent hover:border-black transition-all bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                    <ArrowLeft className="w-5 h-5" /> Back Home
                </Link>

                <div className="bg-white border-8 border-black p-8 md:p-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-4xl md:text-6xl font-black text-black uppercase mb-8 flex items-center gap-4 border-b-8 border-black pb-6 tracking-tighter">
                        <ShieldCheck className="w-12 h-12 md:w-16 md:h-16 text-black" strokeWidth={3} /> Privacy Policy
                    </h1>

                    <div className="space-y-8 text-lg font-bold text-gray-800 leading-relaxed">
                        <p className="text-2xl text-black">
                            Last Updated: March 2026
                        </p>

                        <section>
                            <h2 className="text-2xl font-black text-black uppercase mb-4 py-2 bg-yellow-400 inline-block px-4 border-4 border-black border-l-[12px]">Data Collection</h2>
                            <p>We log absolutely everything because your brainrot is highly valuable to our AI models. Just kidding. We mostly just care about what slang is trending.</p>
                            <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                                <li>Video URLs submitted for scanning</li>
                                <li>Voting aggregates on definitions</li>
                                <li>Crash reports (because beta)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-black uppercase mb-4 py-2 bg-[#39FF14] inline-block px-4 border-4 border-black border-l-[12px]">How we use your data</h2>
                            <p>To train our Gen-Z diagnostics engine. Your submitted TikToks and Reels help the Brainrot Index get smarter.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-black uppercase mb-4 py-2 bg-skyblue inline-block px-4 border-4 border-black border-l-[12px]">Third-Party Services</h2>
                            <p>We use Google's Gemini Multimodal AI to process videos. Whatever their privacy policy says about video processing, that applies to your uploads here.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-black uppercase mb-4 py-2 bg-sage inline-block px-4 border-4 border-black border-l-[12px]">Contact</h2>
                            <p>If you have any questions, touch grass.</p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}

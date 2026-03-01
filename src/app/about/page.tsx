import Link from "next/link";
import { Info, ArrowLeft, HeartPulse } from "lucide-react";

export const metadata = {
    title: 'About | Brainrot Index',
    description: 'Why did we build this?',
};

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-4 bg-sage border-b-8 border-black font-mono">
            <div className="container mx-auto max-w-4xl">

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-8 text-black font-bold uppercase hover:bg-black hover:text-white px-4 py-2 border-4 border-transparent hover:border-black transition-all bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                    <ArrowLeft className="w-5 h-5" /> Back Home
                </Link>

                <div className="bg-white border-8 border-black p-8 md:p-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-4xl md:text-6xl font-black text-black uppercase mb-8 flex items-center gap-4 border-b-8 border-black pb-6 tracking-tighter">
                        <Info className="w-12 h-12 md:w-16 md:h-16 text-black" strokeWidth={3} /> About Us
                    </h1>

                    <div className="space-y-8 text-lg font-bold text-gray-800 leading-relaxed">

                        <section>
                            <h2 className="text-2xl font-black text-black uppercase mb-4 py-2 bg-yellow-400 inline-block px-4 border-4 border-black border-l-[12px]">The Mission</h2>
                            <p className="text-2xl leading-normal text-black font-medium">As the internet fractures into increasingly bizarre and hyper-specific niches, the slang and culture generated moves faster than any traditional dictionary can track.</p>
                            <br />
                            <p className="text-2xl leading-normal text-black font-medium">The Brainrot Index was built as a unified repository to catalog, diagnose, and permanently archive modern digital culture.</p>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-2xl font-black text-black uppercase mb-4 py-2 bg-coral inline-block px-4 border-4 border-black border-l-[12px]">How It Works</h2>
                            <p>We leverage a customized, fine-tuned integration with Google's Gemini Multimodal AI. When you paste an Instagram Reel or TikTok into the Scanner, our systems actively watch the video frame-by-frame and transcribe the audio before calculating a proprietary "Brainrot Score" based on current trending algorithms.</p>
                        </section>

                        <section className="bg-black text-white p-8 mt-12 border-4 border-black">
                            <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-3">
                                <HeartPulse className="text-coral" /> Made with Brainrot
                            </h2>
                            <p className="text-gray-300">Dedicated to the iPad kids who built the new internet.</p>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}

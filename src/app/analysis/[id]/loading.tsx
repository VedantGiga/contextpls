export default function LoadingAnalysis() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-coral p-4 font-mono">
            {/* Solid orange background */}

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
                    <div className="absolute top-0 left-0 h-full bg-sage w-1/2 border-r-4 border-black animate-[slideRight_1.5s_ease-in-out_infinite_alternate]" />
                </div>
            </div>
        </div>
    );
}

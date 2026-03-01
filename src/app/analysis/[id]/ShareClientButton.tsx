"use client";

import { Download } from "lucide-react";
import { toPng } from "html-to-image";
import { useState } from "react";

export default function ShareClientButton() {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const element = document.getElementById("shareable-story-card");
            if (!element) return;

            // Give the browser one split second to paint the new CSS state changes
            await new Promise((resolve) => setTimeout(resolve, 150));

            const dataUrl = await toPng(element, {
                cacheBust: true,
                pixelRatio: 2,
                backgroundColor: 'transparent',
                style: {
                    opacity: '1',     // Override the invisible CSS for the screenshot
                    zIndex: '1',      // Pull it to the front
                    transform: 'none' // Prevent bounding box glitches
                }
            });

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `brainrot-diagnosis-${Date.now()}.png`;
            link.click();
        } catch (error) {
            console.error("Failed to generate image:", error);
            alert("Failed to generate image.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full mt-8 brutal-btn bg-skyblue text-black py-4 px-6 text-xl md:text-2xl uppercase flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Download className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
            {isDownloading ? "Capturing..." : "Download Findings"}
        </button>
    );
}

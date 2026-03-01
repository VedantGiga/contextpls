"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import os from "os";
import crypto from "crypto";
import { instagramGetUrl } from "instagram-url-direct";
import { GoogleGenAI } from "@google/genai";
import { revalidatePath } from "next/cache";

export interface ActionResponse<T = any> {
    success: boolean;
    error?: string;
    [key: string]: any;
}

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

export async function getMemesByCategory(category: string) {
    try {
        const memes = await prisma.meme.findMany({
            where: { isApproved: true, category },
            orderBy: { brainrotScore: 'desc' },
            include: { tags: true }
        });
        return { success: true, memes };
    } catch (error) {
        console.error("Failed to fetch memes:", error);
        return { success: false, error: "Failed to fetch memes" };
    }
}

export async function getCategoryCounts() {
    try {
        const counts = await prisma.meme.groupBy({
            by: ['category'],
            where: { isApproved: true },
            _count: {
                category: true,
            },
        });

        // Convert array to a record { "Slang": 142, "TikTok": 89 }
        const countMap = counts.reduce((acc, curr) => {
            acc[curr.category] = curr._count.category;
            return acc;
        }, {} as Record<string, number>);

        return { success: true, counts: countMap };
    } catch (error) {
        console.error("Failed to fetch category counts:", error);
        return { success: false, counts: {} };
    }
}

export async function getMemes() {
    try {
        const memes = await prisma.meme.findMany({
            where: { isApproved: true },
            orderBy: { brainrotScore: 'desc' },
            include: { tags: true }
        });
        return { success: true, memes };
    } catch (error) {
        console.error("Failed to fetch memes:", error);
        return { success: false, error: "Failed to fetch memes" };
    }
}

export async function getRandomMeme() {
    try {
        const count = await prisma.meme.count({ where: { isApproved: true } });
        if (count === 0) return { success: false, error: "No memes available" };
        const skip = Math.floor(Math.random() * count);
        const randomMeme = await prisma.meme.findFirst({
            where: { isApproved: true },
            skip,
            select: { slug: true }
        });
        if (!randomMeme) return { success: false, error: "Could not fetch random meme" };
        return { success: true, slug: randomMeme.slug };
    } catch (error) {
        console.error("Failed to fetch random meme:", error);
        return { success: false, error: "Failed to fetch random meme" };
    }
}

export async function searchMemes(query: string) {
    try {
        if (!query) return { success: true, memes: [] };
        const memes = await prisma.meme.findMany({
            where: {
                isApproved: true,
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { shortDefinition: { contains: query, mode: 'insensitive' } },
                    { tags: { some: { name: { contains: query, mode: 'insensitive' } } } }
                ]
            },
            include: { tags: true },
            orderBy: { brainrotScore: 'desc' }
        });
        return { success: true, memes };
    } catch (error) {
        console.error("Failed to search memes:", error);
        return { success: false, error: "Failed to search memes" };
    }
}

export async function getMemeBySlug(slug: string) {
    try {
        const meme = await prisma.meme.findUnique({
            where: { slug },
            include: { tags: true }
        });
        if (!meme) return { success: false, error: "Meme not found" };

        return { success: true, meme };
    } catch (error) {
        console.error(`Failed to fetch meme ${slug}:`, error);
        return { success: false, error: "Failed to fetch meme" };
    }
}

export async function getRelatedMemes(slugList: string) {
    if (!slugList) return { success: true, memes: [] };

    try {
        const slugs = slugList.split(",").map(s => s.trim());
        const memes = await prisma.meme.findMany({
            where: { slug: { in: slugs } }
        });
        return { success: true, memes };
    } catch (error) {
        console.error("Failed to fetch related memes:", error);
        return { success: false, error: "Failed to fetch related memes" };
    }
}

export async function searchGifs(query: string = "trending", limit: number = 20) {
    try {
        const apiKey = process.env.GIPHY_API_KEY;
        if (!apiKey) throw new Error("GIPHY_API_KEY is not defined");

        const endpoint = query === "trending" || !query
            ? `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`
            : `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=${limit}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.meta.status === 200) {
            return { success: true, gifs: data.data };
        } else {
            return { success: false, error: data.meta.msg };
        }
    } catch (error) {
        console.error("Giphy API error:", error);
        return { success: false, error: "Failed to fetch GIFs" };
    }
}

export async function submitMeme(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const shortDefinition = formData.get("shortDefinition") as string;
        const origin = formData.get("origin") as string;
        const platform = formData.get("platform") as string;
        const firstSeen = formData.get("firstSeen") as string;
        const category = (formData.get("category") as string) || "Meme";
        const imageFile = formData.get("imageFile") as File | null;

        let finalImageUrl: string | null = null;

        if (imageFile && imageFile.size > 0) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const safeFileName = imageFile.name.replace(/[^a-zA-Z0-9.]/g, '');
            const filename = `${uniqueSuffix}-${safeFileName}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            try {
                await fs.writeFile(path.join(uploadDir, filename), buffer);
                finalImageUrl = `/uploads/${filename}`;
            } catch (fsError) {
                console.error("Failed to save image locally", fsError);
            }
        }

        // Tags handling
        const tagsString = formData.get("tags") as string;
        const tagsList = tagsString ? tagsString.split(',').map(t => t.trim()).filter(Boolean) : [];

        // Auto-generate slug from title
        let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        if (!title || !shortDefinition || !origin) {
            return { success: false, error: "Missing required fields." };
        }

        // Ensure slug is unique
        let slugExists = true;
        while (slugExists) {
            const existingMeme = await prisma.meme.findUnique({ where: { slug } });
            if (existingMeme) {
                slug = `${slug}-${Math.round(Math.random() * 10000)}`;
            } else {
                slugExists = false;
            }
        }

        const newMeme = await prisma.meme.create({
            data: {
                title,
                slug,
                shortDefinition,
                origin,
                platform: platform || "Unknown",
                firstSeen: firstSeen || "Unknown",
                imageUrl: finalImageUrl,
                category,
                growthPattern: "Pending Analysis",
                culturalMeaning: "Pending Analysis",
                brainrotScore: 50, // Default mid score
                lifecyclePhase: "Emerging",
                isApproved: false, // Must be approved by admin
                tags: {
                    connectOrCreate: tagsList.map(t => ({
                        where: { name: t },
                        create: { name: t }
                    }))
                }
            }
        });

        return { success: true, meme: newMeme };
    } catch (error) {
        console.error("Submission failed:", error);
        return { success: false, error: "Failed to submit entry. Slug might already exist." };
    }
}

export async function getPendingMemes() {
    try {
        const memes = await prisma.meme.findMany({
            where: { isApproved: false },
            orderBy: { createdAt: 'desc' },
            include: { tags: true }
        });
        return { success: true, memes };
    } catch (error) {
        console.error("Failed to fetch pending memes:", error);
        return { success: false, error: "Failed to fetch pending memes" };
    }
}

export async function approveMeme(id: string) {
    try {
        if (!await isAdmin()) {
            return { success: false, error: "Unauthorized" };
        }

        const meme = await prisma.meme.update({
            where: { id },
            data: { isApproved: true }
        });
        return { success: true, meme };
    } catch (error) {
        console.error(`Failed to approve meme ${id}:`, error);
        return { success: false, error: "Failed to approve meme" };
    }
}

export async function generateMemeAnalysis(id: string) {
    try {
        if (!await isAdmin()) return { success: false, error: "Unauthorized" };

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return { success: false, error: "GEMINI_API_KEY is not set in environment variables." };

        const meme = await prisma.meme.findUnique({ where: { id } });
        if (!meme) return { success: false, error: "Meme not found" };

        const ai = new GoogleGenAI({ apiKey });

        const prompt = `
        You are an expert internet historian and memetic analyst. Analyze this viral trend/meme:
        Title: ${meme.title}
        Definition: ${meme.shortDefinition}
        Origin: ${meme.origin}
        
        Provide your analysis in EXACT JSON format with these exact keys:
        "culturalMeaning": A highly academic, deep-dive explanation (2-3 sentences max) of why this trend resonates with digital culture.
        "growthPattern": A 2-word description of how it spread (e.g. "Viral Explosion", "Slow Burn", "Irony Cycle").
        "brainrotScore": An integer from 1 to 100 rating its absurdity/toxicity.
        
        ONLY output valid JSON. Nothing else.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });

        if (!response.text) throw new Error("No response from Gemini");

        const analysis = JSON.parse(response.text);

        const updatedMeme = await prisma.meme.update({
            where: { id },
            data: {
                culturalMeaning: analysis.culturalMeaning,
                growthPattern: analysis.growthPattern,
                brainrotScore: analysis.brainrotScore || 50
            }
        });

        return { success: true, meme: updatedMeme };
    } catch (error: any) {
        console.error(`AI Analysis failed for meme ${id}:`, error);
        return { success: false, error: error.message || "Failed to generate AI analysis." };
    }
}

export async function loginAdmin(password: string) {
    const correctPassword = process.env.ADMIN_PASSWORD;
    if (!correctPassword || password !== correctPassword) {
        return { success: false, error: "Incorrect password" };
    }

    // Set a secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 // 24 hours
    });

    return { success: true };
}

export async function isAdmin() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("admin_auth");
    return authCookie?.value === "authenticated";
}

export async function decodeBrainrot(text: string) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return { success: false, error: "GEMINI_API_KEY is not set in environment variables." };

        const ai = new GoogleGenAI({ apiKey });

        const prompt = `
        You are an expert internet slang translator. A user has provided the following text, which contains confusing internet slang, Gen Z/Alpha terms, or "brainrot":
        
        TEXT: "${text}"
        
        Provide your analysis in EXACT JSON format with these exact two keys:
        "translation": A direct, plain English translation of what the text is actually saying, written in a clear, highly accessible way so a normal person or older adult could understand it.
        "identifiedTerms": An array of strings containing the specific slang words or phrases you identified in the text. (e.g., ["skibidi", "rizz"]). If none, return an empty array.
        
        ONLY output valid JSON. Nothing else.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });

        if (!response.text) throw new Error("No response from Gemini");
        const analysis = JSON.parse(response.text);

        return { success: true, data: analysis };

    } catch (error: any) {
        console.error("Decoder failed:", error);
        return { success: false, error: "Failed to decode text. The AI might be taking a nap." };
    }
}

export async function decodeVideoUrl(url: string) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return { success: false, error: "GEMINI_API_KEY is not set in environment variables." };

        // 1. Determine platform and resolve raw MP4
        let videoDownloadUrl = "";

        if (url.includes("tiktok.com")) {
            const tikwmRes = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
            const tikwmData = await tikwmRes.json();

            if (tikwmData.code !== 0 || !tikwmData.data?.play) {
                return { success: false, error: "Failed to extract video from the provided TikTok URL. Make sure it is public." };
            }
            videoDownloadUrl = tikwmData.data.play;
        } else if (url.includes("instagram.com/reel/") || url.includes("instagram.com/p/")) {
            // Using local instagram-url-direct package
            const igData = await instagramGetUrl(url);

            if (!igData || !igData.url_list || igData.url_list.length === 0) {
                return { success: false, error: "Failed to extract Instagram Reel. The reel might be private or the scraper was blocked." };
            }
            videoDownloadUrl = igData.url_list[0];
        } else {
            return { success: false, error: "Unsupported URL. Please provide a valid TikTok or Instagram Reel link." };
        }

        // 2. Download the MP4 buffer to local temp storage
        const videoRes = await fetch(videoDownloadUrl);
        if (!videoRes.ok) throw new Error("Failed to download video stream");

        const buffer = await videoRes.arrayBuffer();
        const tempFilePath = path.join(os.tmpdir(), `brainrot-${crypto.randomUUID()}.mp4`);
        await fs.writeFile(tempFilePath, Buffer.from(buffer));

        try {
            // 3. Upload to Gemini File API
            const ai = new GoogleGenAI({ apiKey });
            let uploadResult = await ai.files.upload({
                file: tempFilePath,
                config: {
                    mimeType: "video/mp4",
                    displayName: "tiktok-reel-analysis",
                }
            });

            // Poll for Gemini to finish processing the video
            let fileState = uploadResult.state;
            while (fileState === "PROCESSING") {
                await new Promise(resolve => setTimeout(resolve, 2000));
                uploadResult = await ai.files.get({ name: uploadResult.name || "" });
                fileState = uploadResult.state;
            }

            if (fileState === "FAILED") {
                throw new Error("Gemini failed to process the video uploaded.");
            }

            // 4. Prompt Gemini for multimodal analysis
            const prompt = `
            You are an expert internet slang translator, memetic analyst, and subculture historian. 
            Watch this short video. Listen to the audio, observe the text on screen, and analyze the actions of the people.
            
            Provide your analysis in EXACT JSON format with these exact keys:
            "translation": A direct, plain English translation of what this video is actually about or what the slang used in it means.
            "explanation": A more detailed, 2-3 sentence breakdown explaining the deeper joke, the context of the meme, or why it's considered "brainrot".
            "brainrotScore": An integer from 1 to 100 representing how deep into internet brainrot culture this video is.
            "characters": An array of strings containing the specific internet personalities, meme formats featured, archetypes, or figures involved (e.g., ["Kai Cenat", "Duke Dennis", "E-boy", "NPC"]). If none, empty array.
            "themes": An array of strings describing the subcultures or concepts present (e.g., ["Looksmaxxing", "Gamer Rage", "Corecore"]). If none, empty array.
            "identifiedTerms": An array of strings containing the specific slang words or internet phenomena you identified in the text or audio. (e.g., ["skibidi", "rizz"]). If none, empty array.
            
            ONLY output valid JSON. Nothing else. Do not use markdown blocks around the JSON.
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                fileData: {
                                    fileUri: uploadResult.uri,
                                    mimeType: uploadResult.mimeType
                                }
                            },
                            { text: prompt }
                        ]
                    }
                ],
                config: {
                    responseMimeType: 'application/json'
                }
            });

            if (!response.text) throw new Error("No JSON response from Gemini Multimodal");
            const analysis = JSON.parse(response.text);

            const savedAnalysis = await prisma.videoAnalysis.create({
                data: {
                    videoUrl: videoDownloadUrl,
                    translation: analysis.translation,
                    explanation: analysis.explanation || null,
                    brainrotScore: analysis.brainrotScore || 0,
                    characters: analysis.characters || [],
                    themes: analysis.themes || [],
                    identifiedTerms: analysis.identifiedTerms || []
                }
            });

            return { success: true, id: savedAnalysis.id };

        } finally {
            // Always clean up the temp file
            try {
                await fs.unlink(tempFilePath);
            } catch (cleanupError) {
                // Ignore if the file doesn't exist
            }
        }
    } catch (error: any) {
        console.error("Video Decoder failed:", error);
        return { success: false, error: error.message || "Failed to analyze video URL." };
    }
}

export async function getVideoAnalysis(id: string) {
    try {
        const analysis = await prisma.videoAnalysis.findUnique({
            where: { id }
        });
        return analysis;
    } catch (e) {
        console.error("Failed to fetch video analysis:", e);
        return null;
    }
}

export async function translateBrainrot(text: string, mode: 'to_boomer' | 'to_brainrot') {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return { success: false, error: "GEMINI_API_KEY is not set in environment variables." };

        const ai = new GoogleGenAI({ apiKey });

        const systemInstructions = mode === 'to_brainrot'
            ? `You are an expert at Gen Alpha / extreme internet brainrot slang. 
               The user will provide normal, perhaps formal, English text. 
               You must translate it into the most absurd, slang-filled 'brainrot' possible, using terms like skibidi, rizz, gyatt, mewing, sigma, fanum tax, aura, etc. 
               Make it sound like a chronically online 14-year-old on TikTok. 
               Return ONLY the translated string.`
            : `You are a professional corporate translator and internet historian. 
               The user will provide text heavily laden with Gen Alpha internet slang ('brainrot'). 
               You must translate it into highly formal, almost overly professional or 'Boomer' English. 
               Remove all slang and replace it with hilariously stiff, verbose corporate equivalents. 
               Return ONLY the translated string.`;

        const prompt = `
        Translate the following text strictly adhering to out persona instructions. DO NOT return JSON. Return ONLY the finalized translated text string.
        
        TEXT:
        "${text}"
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstructions
            }
        });

        if (!response.text) throw new Error("No response from Gemini");

        return { success: true, text: response.text };
    } catch (error) {
        console.error("Translator failed:", error);
        return { success: false, error: "Failed to translate text." };
    }
}

export async function voteMeme(id: string, type: 'upvote' | 'downvote'): Promise<ActionResponse> {
    try {
        const updateData = type === 'upvote'
            ? { upvotes: { increment: 1 } }
            : { downvotes: { increment: 1 } };

        await prisma.meme.update({
            where: { id },
            data: updateData
        });

        revalidatePath('/meme/[slug]', 'page');
        revalidatePath('/'); // For the dictionary list

        return { success: true };
    } catch (error) {
        console.error("Failed to vote:", error);
        return { success: false, error: "Failed to submit vote." };
    }
}

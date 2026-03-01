export type LifecyclePhase = "Incubation" | "Explosion" | "Saturation" | "Irony" | "Archive";

export interface MemeEntry {
    slug: string;
    title: string;
    shortDefinition: string;
    origin: string;
    platform: string;
    firstSeen: string;
    growthPattern: string;
    culturalMeaning: string;
    brainrotScore: number; // 1-100
    lifecyclePhase: LifecyclePhase;
    tags: string[];
    relatedMemes: string[];
}

export const sampleMemes: MemeEntry[] = [
    {
        slug: "skibidi-toilet",
        title: "Skibidi Toilet",
        shortDefinition: "A machinima web series featuring a head emerging from a toilet, singing a mashup of 'Give It To Me' and 'Dom Dom Yes Yes'.",
        origin: "Created by DaFuq!?Boom! using Source Filmmaker.",
        platform: "YouTube Shorts",
        firstSeen: "February 2023",
        growthPattern: "Explosive viral growth among Gen Alpha, spanning dozens of episodes and complex lore.",
        culturalMeaning: "Represents the vanguard of Gen Alpha absurdist humor, entirely disconnected from millennial irony.",
        brainrotScore: 95,
        lifecyclePhase: "Saturation",
        tags: ["Machinima", "Gen Alpha", "Absurdist", "Lore"],
        relatedMemes: ["Camera Man", "Titan TV Man"],
    },
    {
        slug: "fanum-tax",
        title: "Fanum Tax",
        shortDefinition: "The act of taking a portion of a friend's food, named after streamer Fanum who frequently 'taxes' Kai Cenat's food.",
        origin: "AMP house streams, specifically Fanum stealing Kai Cenat's food.",
        platform: "Twitch / TikTok",
        firstSeen: "Late 2022",
        growthPattern: "Slow build in streaming community, sudden mainstream explosion via TikTok audio mashups.",
        culturalMeaning: "A playful representation of dominance and resource sharing in modern male friendships and roommate culture.",
        brainrotScore: 82,
        lifecyclePhase: "Explosion",
        tags: ["Streamer Culture", "AMP", "Slang"],
        relatedMemes: ["W Rizz", "Gyatt"],
    },
    {
        slug: "gyatt",
        title: "Gyatt",
        shortDefinition: "An exclamation of surprise or appreciation, usually directed at someone with an attractive physique.",
        origin: "An exaggerated pronunciation of 'Goddamn', popularized by streamers like YourRage and Kai Cenat.",
        platform: "Twitch",
        firstSeen: "2021",
        growthPattern: "Steady use in Black cyberculture, aggressively co-opted and stripped of context by Gen Alpha.",
        culturalMeaning: "Shows the pipeline of AAVE to Twitch slang to playground brainrot.",
        brainrotScore: 88,
        lifecyclePhase: "Irony",
        tags: ["AAVE", "Exclamation", "Streamer Slang"],
        relatedMemes: ["Rizz", "Ohio"],
    },
    {
        slug: "npc-streaming",
        title: "NPC Streaming",
        shortDefinition: "A livestreaming trend where creators react to micro-donations with specific, robotic audio-visual cues.",
        origin: "Pioneered by creators like Pinkydoll responding to TikTok Live gifts.",
        platform: "TikTok Live",
        firstSeen: "July 2023",
        growthPattern: "Massive spike due to sheer weirdness and profitability, followed by rapid decline as novelty wore off.",
        culturalMeaning: "The hyper-commodification of human reaction and the gamification of the parasocial relationship.",
        brainrotScore: 92,
        lifecyclePhase: "Archive",
        tags: ["TikTok Live", "Dystopian", "Performative"],
        relatedMemes: ["Ice Cream So Good"],
    },
    {
        slug: "ohio-meme",
        title: "Only in Ohio",
        shortDefinition: "A catchphrase used to describe bizarre, chaotic, or supernatural events, implying the state of Ohio is a wasteland of anomalies.",
        origin: "A viral Tumblr post/image macro from 2016, later revived heavily on TikTok in 2022.",
        platform: "TikTok",
        firstSeen: "2016 (Revived 2022)",
        growthPattern: "Slow burn meme that evolved into an overarching surrealist tag for anything slightly weird.",
        culturalMeaning: "A modern iteration of the 'Florida Man' trope, utilizing absurd hyperbole directed at an otherwise unremarkable Midwestern state.",
        brainrotScore: 75,
        lifecyclePhase: "Archive",
        tags: ["Surreal", "Absurdist", "Location-based"],
        relatedMemes: ["Blight", "Backrooms"],
    }
];

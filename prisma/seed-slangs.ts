import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const slangs = [
    { title: "Skibidi", definition: "A nonsense word originating from the Skibidi Toilet web series." },
    { title: "Gyatt", definition: "An exclamation of surprise or appreciation, usually directed at someone's physique." },
    { title: "Rizz", definition: "Short for charisma; the ability to attract romantic or sexual partners." },
    { title: "Sigma", definition: "A successful, highly independent man who doesn't conform to societal norms." },
    { title: "Mewing", definition: "A facial posture technique purportedly used to redefine the jawline." },
    { title: "Fanum Tax", definition: "The act of taking a bite of someone else's food (named after streamer Fanum)." },
    { title: "Ohio", definition: "Used to describe something bizarre, chaotic, or terrible ('Only in Ohio')." },
    { title: "Mogging", definition: "Being physically superior in appearance to someone else." },
    { title: "Looksmaxxing", definition: "The practice of maximizing one's physical appearance." },
    { title: "Sus", definition: "Suspicious; popularized by the game Among Us." },
    { title: "Cap", definition: "A lie or falsehood." },
    { title: "No Cap", definition: "Telling the absolute truth; no lie." },
    { title: "Bet", definition: "An expression of agreement, confirmation, or approval." },
    { title: "Bussin'", definition: "Extremely good, often used to describe food." },
    { title: "Ratio", definition: "When a reply gets more likes than the original post, signifying disagreement." },
    { title: "L", definition: "A loss; taking an L." },
    { title: "W", definition: "A win; taking a W." },
    { title: "Based", definition: "Being yourself and not caring what others think; holding a controversial but respected opinion." },
    { title: "Cringe", definition: "Secondhand embarrassment; something painfully awkward." },
    { title: "NPC", definition: "Non-playable character; someone who lacks independent thought or repeats conventional views." },
    { title: "Delulu", definition: "Delusional, often in a romantic or overly optimistic context." },
    { title: "Solulu", definition: "Solution (often paired as 'Delulu is the only solulu')." },
    { title: "Girl Math", definition: "Humorous justifications for spending money (e.g., 'cash is free money')." },
    { title: "Boy Math", definition: "Humorous callouts of male double standards or weird logic." },
    { title: "Canon Event", definition: "An unavoidable, character-building tragic event; popularized by Spider-Verse." },
    { title: "Pookie", definition: "An affectionate nickname for a friend or partner." },
    { title: "It's Giving", definition: "A phrase used to describe the vibe or aesthetic of something." },
    { title: "Let Him Cook", definition: "Give someone the space to do their thing or make an argument, even if it seems crazy." },
    { title: "Touch Grass", definition: "Go outside and reconnect with reality; you've been on the internet too long." },
    { title: "Aura", definition: "A person's vibe or coolness level. Examples include 'positive aura' or 'minus 1000 aura'." },
    { title: "Edging", definition: "Delaying gratification; widely applied to mundane tasks in brainrot context." },
    { title: "Gooning", definition: "A state of complete focus or trance, often used ironically." },
    { title: "Bop", definition: "A really good song, or sometimes derogatory term for a promiscuous person." },
    { title: "Slay", definition: "To do something exceptionally well." },
    { title: "Serving", definition: "Presenting a great look or vibe (e.g., 'serving looks')." },
    { title: "Ate", definition: "Did something perfectly ('they ate that up')." },
    { title: "Periodt", definition: "End of discussion; emphasizing a statement." },
    { title: "Rent Free", definition: "When someone or something is constantly on your mind without effort." },
    { title: "Main Character Energy", definition: "Exuding confidence as if you are the star of the movie of life." },
    { title: "Glow Up", definition: "A major positive transformation in appearance or life." },
    { title: "Lowkey", definition: "Secretly, mildly, or quietly." },
    { title: "Highkey", definition: "Obviously, strongly, or openly." },
    { title: "Salty", definition: "Upset, bitter, or resentful over something minor." },
    { title: "Ghosting", definition: "Suddenly cutting off all communication with someone without explanation." },
    { title: "Simp", definition: "Someone who does way too much for a person they like." },
    { title: "Yeet", definition: "To throw something forcefully; an exclamation of excitement." },
    { title: "Finesse", definition: "To skillfully maneuver a situation to your advantage." },
    { title: "Drip", definition: "Style, swagger, or cool clothing." },
    { title: "Stan", definition: "An overzealous or obsessive fan." },
    { title: "Vibe Check", definition: "Assessing someone's mood or attitude." }
];

async function main() {
    console.log('Clearing old slangs if needed...');
    let i = 0;
    for (const s of slangs) {
        const slug = s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        // Create new
        await prisma.meme.upsert({
            where: { slug },
            update: {},
            create: {
                title: s.title,
                slug: slug,
                shortDefinition: s.definition,
                origin: "Internet Culture",
                platform: "TikTok/Twitter",
                firstSeen: "2020s",
                category: "Slang",
                growthPattern: "Viral Trend",
                culturalMeaning: "Core vocabulary of Gen Z / Alpha internet culture.",
                brainrotScore: Math.floor(Math.random() * 40) + 40,
                lifecyclePhase: "Mainstream",
                isApproved: true,
                tags: {
                    connectOrCreate: [{ where: { name: 'Slang' }, create: { name: 'Slang' } }]
                }
            }
        });
        i++;
        console.log(`Added ${i}/50: ${s.title}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log('Seed complete!');
    });

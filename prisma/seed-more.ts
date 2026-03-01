import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const slangs = [
    { title: "GigaChad", definition: "An impossibly muscular, perfectly chiseled man used to represent the ultimate masculine ideal." },
    { title: "Ratioed", definition: "When a reply on social media gets vastly more engagement than the original post, signifying severe disagreement or owning." },
    { title: "Zaza", definition: "A slang term for high-quality marijuana." },
    { title: "Mid", definition: "Average, mediocre, or not very good. Often used derogatorily." },
    { title: "Glazing", definition: "Over-complementing or obsessing over someone to a sycophantic degree." },
    { title: "NPC Energy", definition: "Behaving predictably, lacking independent thought, or conforming completely to societal norms." },
    { title: "W Rizz", definition: "Having exceptional charisma and success in romantic or social interactions." },
    { title: "L Rizz", definition: "Having terrible charisma and failing entirely in romantic or social interactions." },
    { title: "Copium", definition: "A fictional drug inhaled to cope with severe loss or failure." },
    { title: "Hopium", definition: "A fictional drug inhaled when holding onto irrational hope for a positive outcome." },
    { title: "Touch Grass", definition: "An imperative to disconnect from the internet and experience the real world." },
    { title: "Oof", definition: "An exclamation of sympathy, dismay, or reaction to something painful/awkward (originating from Roblox)." },
    { title: "F in the Chat", definition: "Press 'F' to pay respects. Used to show sympathy or acknowledge a failure." },
    { title: "Sussy Baka", definition: "A bizarre combination of 'suspicious' and the Japanese word for 'idiot/fool'. Often ironic." },
    { title: "Valid", definition: "Acceptable, understandable, or correct. Often used to validate someone's feelings or opinions." },
    { title: "IYKYK", definition: "If you know, you know. Used for inside jokes or niche references." },
    { title: "Slaps", definition: "Exceptionally good or awesome, usually referring to music or food." },
    { title: "Smh", definition: "Shaking my head. Used to express disappointment or disbelief." },
    { title: "Tbh", definition: "To be honest." },
    { title: "Ngl", definition: "Not gonna lie." },
    { title: "Fr fr", definition: "For real, for real. Emphasizing truth or agreement." },
    { title: "Ong", definition: "On God. Meaning 'I swear' or 'truthfully'." },
    { title: "Ikr", definition: "I know, right? Agreement." },
    { title: "Rn", definition: "Right now." },
    { title: "BFFR", definition: "Be fucking for real. An expression of exasperation or disbelief." },
    { title: "TFW", definition: "That feeling when." },
    { title: "MFW", definition: "My face when." },
    { title: "GOAT", definition: "Greatest of all time." },
    { title: "Stan", definition: "An obsessive fan (from the Eminem song 'Stan')." },
    { title: "Vibe", definition: "The emotional atmosphere or mood of a place, person, or thing." },
    { title: "Vibing", definition: "Relaxing or enjoying the atmosphere." },
    { title: "Noob", definition: "A beginner or novice, often used derogatorily in gaming." },
    { title: "Pwnd", definition: "Owned or defeated utterly (gaming slang)." },
    { title: "GG", definition: "Good Game." },
    { title: "IRL", definition: "In real life." },
    { title: "AFK", definition: "Away from keyboard." },
    { title: "BRB", definition: "Be right back." },
    { title: "IMO / IMHO", definition: "In my opinion / In my humble opinion." },
    { title: "YOLO", definition: "You only live once." },
    { title: "FOMO", definition: "Fear of missing out." },
    { title: "JOMO", definition: "Joy of missing out." },
    { title: "TL;DR", definition: "Too long; didn't read. A summary." },
    { title: "Aesthetic", definition: "Visually pleasing, or referring to a specific visual style." },
    { title: "Boujee", definition: "Luxurious in lifestyle, yet humble in character (often stylized as 'bougie')." },
    { title: "Cheesh", definition: "An exclamation of surprise or impressing, often accompanied by a specific hand gesture." },
    { title: "Clout", definition: "Influence or power, especially in social media and politics." },
    { title: "Finna", definition: "Going to / intending to." },
    { title: "Fit", definition: "Outfit." },
    { title: "Extra", definition: "Over the top, excessive, dramatic behavior." },
    { title: "Snatched", definition: "Looking exceptionally good, usually referring to clothing or physical appearance." }
];

const characters = [
    { title: "Pepe the Frog", definition: "An anthropomorphic frog originally from Matt Furie's 'Boy's Club' comic, co-opted widely across the internet." },
    { title: "Doge", definition: "A Shiba Inu dog known for its internal monologue in Comic Sans." },
    { title: "Cheems", definition: "A Shiba Inu dog known for speech impediments (adding 'M's) and often contrasted with 'Swole Doge'." },
    { title: "Wojak", definition: "A bald, MS Paint-drawn man representing various emotional states." },
    { title: "Hide the Pain Harold", definition: "A stock photo model whose strained smile appears to mask deep inner torment." },
    { title: "Trollface", definition: "A mischievous face used to indicate trolling or malicious humor." },
    { title: "Gigachad", definition: "A hyper-muscular Russian model (Ernest Khalimov) used as the apex archetype of masculinity." },
    { title: "Hasbulla", definition: "A Russian social media star with a genetic disorder giving him childlike features, known for his feisty demeanor." },
    { title: "Cat a.k.a. Maxwell", definition: "A highly spinable, somewhat loaf-like cat from Garry's Mod/Source engine meme culture." },
    { title: "Nyan Cat", definition: "A pop-tart cat flying through space leaving a rainbow trail, set to a catchy tune." }
];

async function main() {
    console.log('Seeding 50 more slangs...');
    let i = 0;
    for (const s of slangs) {
        const slug = s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        await prisma.meme.upsert({
            where: { slug: slug },
            update: {},
            create: {
                title: s.title,
                slug: slug,
                shortDefinition: s.definition,
                origin: "Internet Culture",
                platform: "Various",
                firstSeen: "2010s-2020s",
                category: "Slang",
                growthPattern: "Viral Spread",
                culturalMeaning: "Part of the expanding lexicon of internet-native communication.",
                brainrotScore: Math.floor(Math.random() * 50) + 30,
                lifecyclePhase: "Mainstream",
                isApproved: true,
                tags: {
                    connectOrCreate: [{ where: { name: 'Slang' }, create: { name: 'Slang' } }]
                }
            }
        });
        i++;
    }
    console.log(`Added ${i}/50 Slangs.`);

    console.log('Seeding 10 characters...');
    let j = 0;
    for (const c of characters) {
        const slug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        await prisma.meme.upsert({
            where: { slug: slug },
            update: {},
            create: {
                title: c.title,
                slug: slug,
                shortDefinition: c.definition,
                origin: "Various Memes",
                platform: "4chan/Reddit/Twitter",
                firstSeen: "2000s-2020s",
                category: "Character",
                growthPattern: "Iconic Ascension",
                culturalMeaning: "Avatars of specific human emotions or archetypes on the internet.",
                brainrotScore: Math.floor(Math.random() * 40) + 50,
                lifecyclePhase: "Immortalized",
                isApproved: true,
                tags: {
                    connectOrCreate: [{ where: { name: 'Character' }, create: { name: 'Character' } }]
                }
            }
        });
        j++;
    }
    console.log(`Added ${j}/10 Characters.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log('Seeding of additional 50 slangs and 10 characters complete!');
    });

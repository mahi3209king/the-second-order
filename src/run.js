import "dotenv/config";

import { STREAMS } from "./ingest/streams.js";
import { readNewsByStream } from "./ingest/newsApiReader.js";
import { isHighSignal } from "./filter/qualityFilter.js";
import { generateOpinion } from "./llm/generate.js";
import { isSeen, markSeen } from "./db/seenStore.js";
import { fetchArticleText } from "./ingest/articleParser.js";

async function run() {
    const streams = [STREAMS.GLOBAL, STREAMS.TECH];

    for (const stream of streams) {
        const newsList = await readNewsByStream(stream);
        const filtered = newsList.filter(isHighSignal);

        console.log(filtered)
        console.log("\n-----------------------------\n");

        if (!filtered.length) continue;

        // pick first unseen article
        let news = null;
        for (const item of filtered) {
            if (!(await isSeen(item.url))) {
                news = item;
                break;
            }
        }

        if (!news) {
            console.log("No new unseen articles.");
            return;
        }
        const articleText = await fetchArticleText(news.url);

        news.fullText = articleText;

        // REAL AI generation (Gemini)
        const finalPost = await generateOpinion(news);

        console.log(`— The Second Order (${news.stream}) —\n`);
        console.log(finalPost);
        console.log("\nSource:", news.url);
        console.log("\n-----------------------------\n");

        // mark as posted
        await markSeen(news);

        break; // only ONE post per run
    }
}

run();

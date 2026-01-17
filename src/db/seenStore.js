import { getDB } from "./mongo.js";

export async function isSeen(url) {
    const db = await getDB();
    const found = await db.collection("posts").findOne({ url });
    return !!found;
}

export async function markSeen(news) {
    const db = await getDB();
    await db.collection("posts").insertOne({
        url: news.url,
        title: news.title,
        stream: news.stream,
        source: news.source,
        postedAt: new Date()
    });
}

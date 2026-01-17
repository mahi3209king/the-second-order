import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export async function fetchArticleText(url) {
    try {
        const res = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        const html = await res.text();

        const dom = new JSDOM(html, { url });
        const reader = new Readability(dom.window.document);
        const article = reader.parse();

        if (!article || !article.textContent) {
            return null;
        }

        // Limit size to avoid token explosion
        return article.textContent.slice(0, 4000);
    } catch (err) {
        console.error("Article parse failed:", err.message);
        return null;
    }
}

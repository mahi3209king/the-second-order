import { GoogleGenAI } from "@google/genai";

// API key is automatically read from process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({});

export async function generateOpinion(news) {
    const prompt = `
You write short, clear posts for X under the page "The Second Order".

STYLE RULES (VERY IMPORTANT):
- Write like a smart human, not an analyst.
- Use simple sentences.
- Prefer concrete actions over abstract language.
- No academic words.
- No think-tank tone.
- No buzzwords like "signaling", "framework", "alignment", "containment".
- One idea per line.
- 3–5 lines total.

GROUNDING RULES (CRITICAL):
- Base your reasoning ONLY on the article text provided below.
- Do NOT invent facts, motives, or numbers.
- If numbers appear in the article, you may reference them generally.
- Do NOT quote the article.
- If the article text is missing, rely only on the headline and description.

WHAT TO DO:
- Start from the real-world action.
- Then explain what it changes.
- Then explain who this complicates or benefits.
- End with a calm, human observation.

CONTEXT:
Stream: ${news.stream}
Headline: ${news.title}
Description: ${news.description || "N/A"}

ARTICLE TEXT:
${news.fullText || "Article text not available"}

Write the post.
`;



    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
    });

    const text = response?.text;

    if (!text) {
        return `
This story matters less for the headline itself
and more for the incentives it quietly changes.

The real impact will surface later,
when reactions turn into structural shifts.
`.trim();
    }

    return text.trim();
}

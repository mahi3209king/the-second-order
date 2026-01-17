import fetch from "node-fetch";

const BASE_URL = "https://newsapi.org/v2/everything";

export async function readNewsByStream(stream) {
  const url =
    `${BASE_URL}?` +
    `q=${encodeURIComponent(stream.query)}` +
    `&sources=${stream.sources}` +
    `&language=en` +
    `&sortBy=publishedAt` +
    `&pageSize=10` +
    `&apiKey=${process.env.NEWS_API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.articles) return [];

  return data.articles.map(article => ({
    title: article.title,
    description: article.description,
    url: article.url,
    source: article.source?.name,
    published: article.publishedAt,
    stream: stream.name
  }));
}

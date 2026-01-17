import Parser from "rss-parser";

const parser = new Parser();

export async function readRSS() {
  const feed = await parser.parseURL(
    "https://www.theverge.com/rss/index.xml"
  );

  return feed.items.slice(0, 3).map(item => ({
    title: item.title,
    link: item.link,
    content: item.contentSnippet,
    published: item.pubDate
  }));
}

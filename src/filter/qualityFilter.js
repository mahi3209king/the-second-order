const BLOCK_KEYWORDS = [
  "review",
  "hands-on",
  "first look",
  "unboxing",
  "sale",
  "match",
  "vs",
  "injury",
  "wins",
  "loses"
];

export function isHighSignal(news) {
  const text = `${news.title} ${news.description}`.toLowerCase();
  return !BLOCK_KEYWORDS.some(word => text.includes(word));
}

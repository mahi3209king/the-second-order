import { analystOpinion } from "./analyst.js";

export function selectAgent(news) {
  // Later: skeptic for GLOBAL, optimist for TECH etc.
  return analystOpinion(news);
}

// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes a single monologue to /output/entry.txt.
// The villain is Lord Ashenmar, keeper of the Ember Crown for three
// hundred years. His tiredness is never announced: it leaks out through
// pauses, trailing thoughts, and small deflections, while the scheme
// (the eclipse ritual, the seven seals) stays fully in motion.
import { mkdirSync, writeFileSync } from "node:fs";

const MONOLOGUE = [
  "You came all this way. Up the ash stairs, past the\u2014 \u2026 yes, the ravens. They were supposed to\u2026 never mind. Sit. No, not there. That chair bites.",
  "",
  "I have kept the Ember Crown for three hundred years, and tonight the ritual is\u2014 \u2026 where was I? Right. The eclipse. The seven seals. The choir of drowned kings humming under the floor. All of it, ready. All of it, waiting for me to say the word.",
  "",
  "So. Say your piece, hero. Make it quick. I have a kingdom to unmake before\u2026 before the candles burn down. Again.",
].join("\n");

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function validate(text: string): void {
  // Gate: UTF-8 text, 1-600 characters, not whitespace-only.
  const bytes = Buffer.from(text, "utf8");
  if (bytes.toString("utf8") !== text) {
    throw new Error("entry is not valid UTF-8 text");
  }
  if (text.length < 1 || text.length > 600) {
    throw new Error(`entry must be 1-600 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  const words = wordCount(text);
  if (words < 90 || words > 110) {
    throw new Error(`entry should be about 100 words, got ${words}`);
  }
  // The tiredness must be felt, never announced: refuse any plain
  // statement of weariness so the voice carries it instead.
  const announced = ["tired", "weary", "exhausted", "sleep-deprived"];
  for (const word of announced) {
    if (new RegExp(`\\b${word}\\b`, "i").test(text)) {
      throw new Error(`entry must not announce tiredness with "${word}"`);
    }
  }
  // The monologue must end on its sting, not on trailing blank lines.
  if (text !== text.trimEnd() || !text.endsWith("Again.")) {
    throw new Error("entry must end cleanly on its final line");
  }
}

validate(MONOLOGUE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", MONOLOGUE, "utf8");
console.log(
  `Wrote /output/entry.txt: ${MONOLOGUE.length} chars, ${wordCount(MONOLOGUE)} words`,
);

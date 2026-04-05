export const PUZZLES = [
  "retains",
  "stonger",
  "planted",
  "creamed",
  "broking",
  "plastic",
  "framing",
  "darkest",
  "granted",
  "claimed",
  "trained",
  "sparkling",
  "thousand",
  "climbing",
  "floating",
  "grinding",
  "sleeping",
  "printing",
  "standing",
  "crashing",
];

export function getRandomPuzzle(): string {
  return PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
}

export function shuffleLetters(word: string): string {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}
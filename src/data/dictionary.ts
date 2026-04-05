import wordList from "an-array-of-english-words";

export const DICTIONARY: Set<string> = new Set(wordList);

export function isValidWord(word: string): boolean {
  return DICTIONARY.has(word.toLowerCase());
}

export function canMakeWord(word: string, letters: string): boolean {
  const pool = letters.toLowerCase().split("");
  for (const ch of word.toLowerCase()) {
    const idx = pool.indexOf(ch);
    if (idx === -1) return false;
    pool.splice(idx, 1);
  }
  return true;
}

export function getValidWordsForPuzzle(letters: string): string[] {
  return wordList.filter(
    (word) =>
      word.length >= 3 &&
      word.length <= letters.length &&
      canMakeWord(word, letters)
  );
}
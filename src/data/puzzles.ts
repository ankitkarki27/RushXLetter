export const PUZZLES = [
    "construe",
    "estragon",
    "retinols",
    "detainrs",
    "recants",
    "trounces",
    "residual",
    "coherent",
    "slantier",
    "entrails",
    "reliants",
    "latencies",
    "sternail",
    "antlions",
    "relations",
    "coraline",
    "reactions",
    "sectional",
    "sanctioned",
    "transcend",
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
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
    "sternail",
    "antlions",
    "coraline",
    "planet",
    "garden",
    "triangle",
    "painting",
    "diamonds",
    "computer",
    "language",
    "hardware",
    "keyboard",
    "building",
    "strategy",

    "rescue",
    "secure",
    "careful",
    "failure",
    "creative",
    "reactive",
    "tension",
    "mention",
    "motion",
    "emotion",
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
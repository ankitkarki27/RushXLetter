export type GameStatus = "idle" | "playing" | "finished";

export interface Puzzle {
  letters: string;
  validWords: string[];
}

export interface GameState {
  status: GameStatus;
  puzzle: Puzzle;
  foundWords: string[];
  score: number;
  timeLeft: number;
  totalTime: number;
}

export interface GameSettings {
  duration: number;
}
import { useState, useEffect, useCallback, useRef } from "react";
import { GameStatus, GameState, GameSettings } from "@/types/game";
import { getRandomPuzzle, shuffleLetters } from "@/data/puzzles";
import { isValidWord, canMakeWord, getValidWordsForPuzzle } from "@/data/dictionary";

const DEFAULT_SETTINGS: GameSettings = {
  duration: 300, // 5 minutes
};

function buildPuzzle(baseWord: string) {
  return {
    letters: shuffleLetters(baseWord),
    validWords: getValidWordsForPuzzle(baseWord),
  };
}

export function useGame(settings: GameSettings = DEFAULT_SETTINGS) {
  const [state, setState] = useState<GameState>({
    status: "idle",
    puzzle: buildPuzzle(getRandomPuzzle()),
    foundWords: [],
    score: 0,
    timeLeft: settings.duration,
    totalTime: settings.duration,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 1) {
          clearTimer();
          return { ...prev, timeLeft: 0, status: "finished" };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  }, []);

  const startGame = useCallback(() => {
    const baseWord = getRandomPuzzle();
    const puzzle = buildPuzzle(baseWord);
    setState({
      status: "playing",
      puzzle,
      foundWords: [],
      score: 0,
      timeLeft: settings.duration,
      totalTime: settings.duration,
    });
    startTimer();
  }, [settings.duration, startTimer]);

  const nextRound = useCallback(() => {
    const baseWord = getRandomPuzzle();
    const puzzle = buildPuzzle(baseWord);
    setState({
      status: "playing",
      puzzle,
      foundWords: [],
      score: 0,
      timeLeft: settings.duration,
      totalTime: settings.duration,
    });
    startTimer();
  }, [settings.duration, startTimer]);

  const submitWord = useCallback(
    (word: string): { success: boolean; message: string } => {
      const w = word.trim().toLowerCase();

      if (w.length < 3) {
        return { success: false, message: "Too short! Minimum 3 letters." };
      }

      if (!canMakeWord(w, state.puzzle.letters)) {
        return { success: false, message: "Can't make that from these letters!" };
      }

      if (!isValidWord(w)) {
        return { success: false, message: "Not a valid English word." };
      }

      if (state.foundWords.includes(w)) {
        return { success: false, message: "Already found that one!" };
      }

      const points = w.length;

      setState((prev) => ({
        ...prev,
        foundWords: [w, ...prev.foundWords],
        score: prev.score + points,
      }));

      return { success: true, message: `+${points} points!` };
    },
    [state.puzzle.letters, state.foundWords]
  );

  const shuffleTiles = useCallback(() => {
    setState((prev) => ({
      ...prev,
      puzzle: {
        ...prev.puzzle,
        letters: shuffleLetters(prev.puzzle.letters),
      },
    }));
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return {
    state,
    startGame,
    nextRound,
    submitWord,
    shuffleTiles,
  };
}
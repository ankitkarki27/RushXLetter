import { useState, useCallback, useRef } from "react";
import { GameState, GameSettings } from "@/types/game";
import { getRandomPuzzle, shuffleLetters } from "@/data/puzzles";
import { isValidWord, canMakeWord, getValidWordsForPuzzle } from "@/data/dictionary";

const DEFAULT_SETTINGS: GameSettings = {
  duration: 180,
};

function buildPuzzle(baseWord: string) {
  return {
    letters: shuffleLetters(baseWord),
    validWords: getValidWordsForPuzzle(baseWord),
  };
}

function calcPoints(wordLength: number): number {
  return wordLength * 100;
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

  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("letterrush-highscore") || "0");
    }
    return 0;
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isUnlimited = settings.duration === 0;

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const updateHighScore = useCallback((finalScore: number) => {
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem("letterrush-highscore", String(finalScore));
    }
  }, [highScore]);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setState((prev) => {
        // unlimited mode — count up, never finish automatically
        if (prev.totalTime === 0) {
          return { ...prev, timeLeft: prev.timeLeft + 1 };
        }
        // normal countdown
        if (prev.timeLeft <= 1) {
          clearTimer();
          updateHighScore(prev.score);
          return { ...prev, timeLeft: 0, status: "finished" };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  }, [updateHighScore]);

  const startGame = useCallback(() => {
    const puzzle = buildPuzzle(getRandomPuzzle());
    setState({
      status: "playing",
      puzzle,
      foundWords: [],
      score: 0,
      timeLeft: isUnlimited ? 0 : settings.duration,
      totalTime: settings.duration,
    });
    startTimer();
  }, [settings.duration, isUnlimited, startTimer]);

  const nextRound = useCallback(() => {
    const puzzle = buildPuzzle(getRandomPuzzle());
    setState({
      status: "playing",
      puzzle,
      foundWords: [],
      score: 0,
      timeLeft: isUnlimited ? 0 : settings.duration,
      totalTime: settings.duration,
    });
    startTimer();
  }, [settings.duration, isUnlimited, startTimer]);

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

      const points = calcPoints(w.length);

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

  const giveUp = useCallback(() => {
    clearTimer();
    setState((prev) => {
      updateHighScore(prev.score);
      return { ...prev, status: "finished" };
    });
  }, [updateHighScore]);

  return {
    state,
    highScore,
    isUnlimited,
    startGame,
    nextRound,
    submitWord,
    shuffleTiles,
    giveUp,
  };
}
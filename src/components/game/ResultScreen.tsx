"use client";

import React from "react";
import { Button } from "../ui/button";

interface ResultScreenProps {
  score: number;
  foundWords: string[];
  missedWords: string[];
  onNextRound: () => void;
}

const ResultScreen = ({
  score,
  foundWords,
  missedWords,
  onNextRound,
}: ResultScreenProps) => {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto text-center">

      {/* Score */}
      <div>
        <p className="text-white/40 text-sm mb-1">your score</p>
        <p className="text-6xl font-semibold text-white">{score}</p>
      </div>

      {/* Stats */}
      <div className="flex gap-6">
        <div>
          <p className="text-white/40 text-xs mb-1">found</p>
          <p className="text-2xl font-semibold text-green-400">{foundWords.length}</p>
        </div>
        <div>
          <p className="text-white/40 text-xs mb-1">missed</p>
          <p className="text-2xl font-semibold text-red-400">{missedWords.length}</p>
        </div>
      </div>

      {/* Found words */}
      {foundWords.length > 0 && (
        <div className="w-full">
          <p className="text-white/40 text-xs mb-2">words you found</p>
          <div className="flex flex-wrap justify-center gap-2">
            {foundWords.map((w, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-green-400/10 border border-green-400/20 text-green-400 text-sm">
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missed words */}
      {missedWords.length > 0 && (
        <div className="w-full">
          <p className="text-white/40 text-xs mb-2">words you missed</p>
          <div className="flex flex-wrap justify-center gap-2">
            {missedWords.slice(0, 20).map((w, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/30 text-sm">
                {w}
              </span>
            ))}
            {missedWords.length > 20 && (
              <span className="text-white/20 text-sm">+{missedWords.length - 20} more</span>
            )}
          </div>
        </div>
      )}

      {/* Next round button */}
      <Button
        onClick={onNextRound}
        size="lg"
        // className="px-8 py-2 bg-white text-black rounded-xl font-semibold text-lg hover:bg-white/90 transition"
      >
        Next Round
      </Button>
    </div>
  );
};

export default ResultScreen;
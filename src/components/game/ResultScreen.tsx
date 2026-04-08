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
  const previewMissed = missedWords.slice(0, 10);
  const remainingMissed = missedWords.length - previewMissed.length;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">

      {/* Next Game CTA */}
      <div className="w-full flex justify-center">
        <Button onClick={onNextRound} size="lg" className="px-8 py-3">
          Next Game ?
        </Button>
      </div>

      {/* Score */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
        <p className="text-white/40 text-sm mb-2">your score</p>
        <p className="text-5xl font-bold text-white">{score}</p>
      </div>

      {/* Found Words */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="text-white/40 text-xs mb-3">
          words you found ({foundWords.length})
        </p>

        <div className="flex flex-wrap gap-2">
          {foundWords.map((w, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-lg bg-green-400/10 border border-green-400/20 text-green-400 text-sm"
            >
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Missed Words (compact preview) */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="text-white/40 text-xs mb-3">
          words you missed ({missedWords.length})
        </p>

        <div className="flex flex-wrap gap-2 items-center">
          {previewMissed.map((w, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/40 text-sm"
            >
              {w}
            </span>
          ))}

          {remainingMissed > 0 && (
            <span className="text-white/30 text-sm">
              +{remainingMissed} more
            </span>
          )}
        </div>
      </div>

    </div>
  );
};

export default ResultScreen;
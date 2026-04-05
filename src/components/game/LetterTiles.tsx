"use client";

import React from "react";
import { FaShuffle } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";

interface LetterTilesProps {
  letters: string;
  onShuffle: () => void;
  onGiveUp: () => void;
}

const LetterTiles = ({ letters, onShuffle, onGiveUp }: LetterTilesProps) => {
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Letter tiles */}
      <div className="flex flex-wrap justify-center gap-3">
        {letters.split("").map((letter, i) => (
          <div
            key={i}
            className="w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white text-2xl sm:text-3xl font-semibold uppercase"
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-6">
        <button
          onClick={onShuffle}
          className="flex items-center gap-2 text-white/40 hover:text-white/80 transition text-sm cursor-pointer"
        >
          <FaShuffle className="text-base" />
          <span>shuffle</span>
        </button>

        <div className="w-px h-4 bg-white/10" />

        <button
          onClick={onGiveUp}
          className="flex items-center gap-2 text-white/40 hover:text-red-400 transition text-sm cursor-pointer"
        >
          <FaFlag className="text-base" />
          <span>give up</span>
        </button>
      </div>
    </div>
  );
};

export default LetterTiles;
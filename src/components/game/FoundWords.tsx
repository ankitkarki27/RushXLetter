"use client";

import React from "react";

interface FoundWordsProps {
  words: string[];
}

const FoundWords = ({ words }: FoundWordsProps) => {
  if (words.length === 0) {
    return (
      <p className="text-white/80 text-sm text-center">
       Start forming words 
      </p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {words.map((word, i) => (
        <span
          key={i}
          className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm"
        >
          {word}
          {/* <span className="text-white/30 ml-1 text-xs">+{word.length}</span> */}
        </span>
      ))}
    </div>
  );
};

export default FoundWords;
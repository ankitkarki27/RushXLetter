"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LetterTilesProps {
  letters: string;
  onWordChange?: (word: string) => void;
  resetSignal?: number;
}

const LetterTiles = ({
  letters,
  onWordChange,
  resetSignal,
}: LetterTilesProps) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    setSelectedIndices([]);
  }, [resetSignal]);

  const handleTileClick = (index: number) => {
    let newSelected: number[];

    if (selectedIndices.includes(index)) {
      newSelected = selectedIndices.filter((i) => i !== index);
    } else {
      newSelected = [...selectedIndices, index];
    }

    setSelectedIndices(newSelected);

    const word = newSelected.map((i) => letters[i]).join("");
    onWordChange?.(word);
  };

  return (
    <div
      className="flex flex-wrap justify-center gap-3"
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {letters.split("").map((letter, i) => {
        const isSelected = selectedIndices.includes(i);

        return (
          <motion.div
            key={i}
            onMouseDown={() => {
              setIsMouseDown(true);
              handleTileClick(i);
            }}
            onMouseEnter={() => {
              if (isMouseDown) handleTileClick(i);
            }}
            onMouseUp={() => setIsMouseDown(false)}
            onTouchStart={() => handleTileClick(i)}
            
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
            animate={{
              scale: isSelected ? 1.1 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}

            className={`
              w-12 h-14 sm:w-12 sm:h-16
              flex items-center justify-center
              rounded-xl border
              text-2xl sm:text-3xl font-semibold uppercase
              cursor-pointer select-none
              transition-all duration-150

              ${
                isSelected
                  ? "bg-gray-500/30 border-gray-400 text-white "
                  : " border-white/10 text-white/80 hover:bg-white/10"
              }
            `}
          >
            {letter}
          </motion.div>
        );
      })}
    </div>
  );
};

export default LetterTiles;
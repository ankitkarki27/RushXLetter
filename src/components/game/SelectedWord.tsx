"use client";

import React from "react";
import { motion } from "framer-motion";

interface SelectedWordProps {
  word: string;
  maxSlots?: number;
}

const SelectedWord = ({ word, maxSlots = 10 }: SelectedWordProps) => {
  const letters = word.split("");

  return (
    <div className="w-full flex justify-center mt-2">
      <div className="flex gap-2">

        {Array.from({ length: maxSlots }).map((_, i) => {
          const char = letters[i] || "";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.25,
                delay: i * 0.05,
                type: "spring",
                stiffness: 300,
              }}
              className="
                w-8 h-8 sm:w-10 sm:h-12
                flex items-center justify-center
                border-2 border-white/10
                rounded-lg
                text-white text-xl font-semibold uppercase
                bg-white/5
              "
            >
              {char}
            </motion.div>
          );
        })}

      </div>
    </div>
  );
};

export default SelectedWord;
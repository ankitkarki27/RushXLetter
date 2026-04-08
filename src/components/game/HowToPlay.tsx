"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HowToPlayProps {
  onClose: () => void;
}

const HowToPlay = ({ onClose }: HowToPlayProps) => {
  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-base">How to Play</h2>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white/60 transition text-sm"
            >
              close
            </button>
          </div>

          {/* Steps */}
          <ul className="space-y-3 text-sm text-white/50 leading-relaxed">
            <li className="flex gap-3">
              <span className="text-white/20 font-semibold">1.</span>
              <span>A set of scrambled letters is shown on screen.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/20 font-semibold">2.</span>
              <span>Type any real English word using only those letters.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/20 font-semibold">3.</span>
              <span>
                Minimum 3 letters per word. Each letter can only be used as
                many times as it appears.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/20 font-semibold">4.</span>
              <span>
                Longer words earn more points. 3 letters = 300pts, 4 letters =
                400pts and so on.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-white/20 font-semibold">5.</span>
              <span>
                Find as many words as possible before the timer runs out.
              </span>
            </li>
          </ul>

          {/* Tip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/30"
          >
            Tip: Hit shuffle to rearrange the letters if you're stuck. Use give
            up to end the round early and see missed words.
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HowToPlay;
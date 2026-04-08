"use client";

import React, { useState } from "react";
import { GameSettings } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsProps {
  settings: GameSettings;
  onChange: (settings: GameSettings) => void;
  onClose: () => void;
  isPlaying?: boolean;
  onRestartGame?: () => void;
}

const PRESETS = [
  { label: "1 min", value: 60 },
  { label: "3 min", value: 180 },
  { label: "5 min", value: 300 },
  { label: "unlimited", value: 0 },
];

const Settings = ({
  settings,
  onChange,
  onClose,
  isPlaying,
  onRestartGame,
}: SettingsProps) => {
  const [tempSettings, setTempSettings] = useState(settings);
  const [customMin, setCustomMin] = useState("");
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const applyDuration = (duration: number) => {
    const newSettings = { ...tempSettings, duration };

    if (isPlaying) {
      setTempSettings(newSettings);
      setShowConfirm(true);
    } else {
      onChange(newSettings);
      onClose();
    }
  };

  const applyCustom = () => {
    const val = parseInt(customMin);
    if (!customMin || isNaN(val) || val < 1) {
      setError("Enter valid minutes");
      return;
    }
    if (val > 60) {
      setError("Max 60 min");
      return;
    }

    applyDuration(val * 60);
    setCustomMin("");
    setError("");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-semibold text-base">Settings</h2>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white/70 transition text-sm"
            >
              close
            </button>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-2 mb-6">
            {PRESETS.map((d) => (
              <motion.button
                key={d.value}
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => applyDuration(d.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                  tempSettings.duration === d.value
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
                }`}
              >
                {d.label}
              </motion.button>
            ))}
          </div>

          {/* Custom */}
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              max={60}
              value={customMin}
              onChange={(e) => {
                setCustomMin(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && applyCustom()}
              placeholder="custom (min)"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/30 transition"
            />

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={applyCustom}
              className="px-4 py-2 bg-white text-black rounded-xl text-sm font-medium hover:bg-white/90 transition"
            >
              Set
            </motion.button>
          </div>

          {error && (
            <p className="text-red-400 text-xs mt-2">{error}</p>
          )}

          {/* Current */}
          <p className="text-white/20 text-xs mt-4 text-center">
            {tempSettings.duration === 0
              ? "Unlimited"
              : `${Math.floor(tempSettings.duration / 60)} min selected`}
          </p>
        </motion.div>

        {/* Confirm Modal */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/60"
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
                className="bg-[#111] border border-white/10 rounded-xl p-6 w-[280px] text-center shadow-xl"
              >
                <p className="text-white mb-4 text-sm">
                  Restart game with new settings?
                </p>

                <div className="flex justify-center gap-6">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="text-white/40 hover:text-white text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      onChange(tempSettings);
                      onRestartGame?.(); // 🔥 THIS FIXES YOUR ISSUE
                      setShowConfirm(false);
                      onClose();
                    }}
                    className="text-white font-semibold text-sm"
                  >
                    Restart
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default Settings;
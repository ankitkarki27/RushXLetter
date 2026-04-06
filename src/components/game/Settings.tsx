"use client";

import React, { useState } from "react";
import { GameSettings } from "@/types/game";

interface SettingsProps {
  settings: GameSettings;
  onChange: (settings: GameSettings) => void;
  onClose: () => void;
}

const PRESETS = [
  { label: "1 min", value: 60 },
  { label: "3 min", value: 180 },
  { label: "5 min", value: 300 },
  { label: "unlimited", value: 0 },
];

const Settings = ({ settings, onChange, onClose }: SettingsProps) => {
  const [customMin, setCustomMin] = useState("");
  const [error, setError] = useState("");

  const handleCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomMin(e.target.value);
    setError("");
  };

  const applyCustom = () => {
    const val = parseInt(customMin);
    if (!customMin || isNaN(val) || val < 1) {
      setError("Enter a valid number of minutes.");
      return;
    }
    if (val > 60) {
      setError("Max allowed is 60 minutes.");
      return;
    }
    onChange({ ...settings, duration: val * 60 });
    setCustomMin("");
    setError("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-sm">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-base">Settings</h2>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/60 transition text-sm cursor-pointer"
          >
            close
          </button>
        </div>

        {/* Presets */}
        <p className="text-white/30 text-xs mb-3">quick select</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {PRESETS.map((d) => (
            <button
              key={d.value}
              onClick={() => onChange({ ...settings, duration: d.value })}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition cursor-pointer ${
                settings.duration === d.value
                  ? "bg-white text-black border-white"
                  : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Custom input */}
        <p className="text-white/30 text-xs mb-3">custom duration</p>
        <div className="flex gap-2">
          <input
            type="number"
            min={1}
            max={60}
            value={customMin}
            onChange={handleCustom}
            onKeyDown={(e) => e.key === "Enter" && applyCustom()}
            placeholder="e.g. 7"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/30 transition"
          />
          <span className="text-white/30 text-sm self-center">min</span>
          <button
            onClick={applyCustom}
            className="px-4 py-2 bg-white text-black rounded-xl text-sm font-medium hover:bg-white/90 transition cursor-pointer"
          >
            Set
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-xs mt-2">{error}</p>
        )}

        {/* Current duration display */}
        <p className="text-white/20 text-xs mt-4 text-center">
          Current:{" "}
          <span className="text-white/40">
            {settings.duration === 0
              ? "Unlimited"
              : `${Math.floor(settings.duration / 60)} min${settings.duration > 60 ? "s" : ""}`}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Settings;
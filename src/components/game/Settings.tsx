"use client";

import React from "react";
import { GameSettings } from "@/types/game";

interface SettingsProps {
  settings: GameSettings;
  onChange: (settings: GameSettings) => void;
  onClose: () => void;
}

const DURATIONS = [
  { label: "1 min", value: 60 },
  { label: "2 min", value: 120 },
  { label: "3 min", value: 180 },
  { label: "5 min", value: 300 },
  { label: "10 min", value: 600 },
];

const Settings = ({ settings, onChange, onClose }: SettingsProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-sm">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">Settings</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition text-sm cursor-pointer"
          >
            close
          </button>
        </div>

        {/* Timer duration */}
        <div>
          <p className="text-white/40 text-xs mb-3">round duration</p>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((d) => (
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
        </div>

      </div>
    </div>
  );
};

export default Settings;
"use client";

import React from "react";

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

const Timer = ({ timeLeft, totalTime }: TimerProps) => {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  const progress = (timeLeft / totalTime) * 100;
  const isLow = timeLeft <= 30;

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <span
        className={`text-4xl font-semibold tabular-nums transition-colors ${
          isLow ? "text-red-400" : "text-white"
        }`}
      >
        {m}:{s < 10 ? "0" : ""}{s}
      </span>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isLow ? "bg-red-400" : "bg-white"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
"use client";

import React from "react";

interface StatsBarProps {
    score: number;
    found: number;
    highScore: number;
    timeLeft: number;
    isUnlimited: boolean;
}

const StatsBar = ({ score, found, highScore, timeLeft, isUnlimited }: StatsBarProps) => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    const isLow = !isUnlimited && timeLeft <= 30;

    return (
        <div className="flex items-center justify-between w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3">

            {/* Left — words, score, highscore */}
            <div className="flex items-center gap-4 text-sm">
                <span>
                    <span className="text-white/30">Words: </span>
                    <span className="text-white font-semibold">{found}</span>
                </span>
                <span className="text-white/10">|</span>
                <span>
                    <span className="text-white/30">Score: </span>
                    <span className="text-white font-semibold">{score}</span>
                </span>
                <span className="text-white/10">|</span>
                <span>
                    <span className="text-white/30">Best: </span>
                    <span className="text-yellow-400 font-semibold">{highScore}</span>
                </span>
            </div>

            {/* timer */}
            <span className={`text-sm font-semibold tabular-nums ${isLow ? "text-red-400" : "text-white"}`}>
                {isUnlimited ? "∞" : `${m}:${s < 10 ? "0" : ""}${s}`}
            </span>

        </div>
    );
};

export default StatsBar;
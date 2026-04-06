"use client";

import React, { useState } from "react";
import { useGame } from "@/hooks/useGame";

import LetterTiles from "@/components/game/LetterTiles";
import WordInput from "@/components/game/WordInput";
import FoundWords from "@/components/game/FoundWords";
import ResultScreen from "@/components/game/ResultScreen";
import Settings from "@/components/game/Settings";
import StatsBar from "@/components/game/StatsBar";
import GiveUpModal from "@/components/game/GiveUpModal";
import { GameSettings } from "@/types/game";
import Navbar from "@/components/game/Navbar";
import { Button } from "@/components/ui/button";
import Footer from "@/components/game/Footer";
import HowToPlay from "@/components/game/HowToPlay";



export default function Home() {
  const [settings, setSettings] = useState<GameSettings>({ duration: 180 });
  const [showSettings, setShowSettings] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);
  const [showGiveUp, setShowGiveUp] = useState(false);

  const { state, highScore, isUnlimited, startGame, nextRound, submitWord, shuffleTiles, giveUp } =
    useGame(settings);

  const missedWords = state.puzzle.validWords.filter(
    (w) => !state.foundWords.includes(w)
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center px-4 py-6 max-w-xl mx-auto">

      {/* Header */}
      <Navbar
        onHowTo={() => setShowHowTo(!showHowTo)}
        onSettings={() => setShowSettings(true)}
      />

      {showHowTo && (
        <HowToPlay onClose={() => setShowHowTo(false)} />
      )}

      {/* Idle screen */}
      {state.status === "idle" && (
        <div className="flex flex-col items-center gap-10 w-full mt-10">
          <div className="text-center">
            <p className="text-white/50 text-base leading-relaxed max-w-md">
              Find as many words as possible using only the given letters.
              Minimum 3 letters.
              Longer words = more points.
            </p>
          </div>
          {/* <LetterTiles
            letters={state.puzzle.letters}
            onShuffle={shuffleTiles}
            onGiveUp={() => { }}
          /> */}
          <Button
            onClick={startGame}
            size="lg"
          // variant="default"
          >
            Start Game
          </Button>
        </div>
      )}

      {/* Playing screen */}
      {state.status === "playing" && (
        <div className="flex flex-col gap-6 w-full">

          {/* Stats + Timer */}
          <StatsBar
            score={state.score}
            found={state.foundWords.length}
            highScore={highScore}
            timeLeft={state.timeLeft}
            isUnlimited={isUnlimited}
          />

          {/* Found words */}
          <FoundWords words={state.foundWords} />

          {/* Letter tiles */}
          <LetterTiles
            letters={state.puzzle.letters}
            onShuffle={shuffleTiles}
            onGiveUp={() => setShowGiveUp(true)}
          />

          {/* Word input */}
          <WordInput onSubmit={submitWord} disabled={false} />

        </div>
      )}

      {/* Result screen */}
      {state.status === "finished" && (
        <ResultScreen
          score={state.score}
          foundWords={state.foundWords}
          missedWords={missedWords}
          onNextRound={nextRound}
        />
      )}

      {/* Give up modal */}
      {showGiveUp && (
        <GiveUpModal
          onConfirm={() => {
            setShowGiveUp(false);
            giveUp();
          }}
          onCancel={() => setShowGiveUp(false)}
        />
      )}

      {/* Settings modal */}
      {showSettings && (
        <Settings
          settings={settings}
          onChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <Footer />
    </main>
  );
}
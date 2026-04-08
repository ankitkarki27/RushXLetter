"use client";

import React, { useState, useEffect } from "react";
import { useGame } from "@/hooks/useGame";
import { Button } from "@/components/ui/button";

import LetterTiles from "@/components/game/LetterTiles";
import ActionButton from "@/components/game/ActionButton";
import FoundWords from "@/components/game/FoundWords";
import ResultScreen from "@/components/game/ResultScreen";
import Settings from "@/components/game/Settings";
import StatsBar from "@/components/game/StatsBar";
import GiveUpModal from "@/components/game/GiveUpModal";
import { GameSettings } from "@/types/game";
import Navbar from "@/components/game/common/Navbar";
import Footer from "@/components/game/common/Footer";
import HowToPlay from "@/components/game/HowToPlay";
import SelectedWord from "@/components/game/SelectedWord";

export default function Home() {
  const [settings, setSettings] = useState<GameSettings>({ duration: 180 });
  const [showSettings, setShowSettings] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);
  const [showGiveUp, setShowGiveUp] = useState(false);

  const [currentWord, setCurrentWord] = useState("");
  const [resetSignal, setResetSignal] = useState(0);

  const {
    state,
    highScore,
    isUnlimited,
    startGame,
    nextRound,
    submitWord,
    shuffleTiles,
    giveUp,
  } = useGame(settings);

  const handleRestartGame = () => {
    startGame();
    setCurrentWord("");
    setResetSignal((prev) => prev + 1);
  };

  const missedWords = state.puzzle.validWords.filter(
    (w) => !state.foundWords.includes(w)
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.status !== "playing") return;

      const letters = state.puzzle.letters.split("");

      if (e.key === "Enter") {
        if (currentWord.length >= 3) {
          const result = submitWord(currentWord);
          if (result.success) {
            setCurrentWord("");
            setResetSignal((prev) => prev + 1);
          }
        }
        return;
      }

      if (e.key === "Backspace") {
        setCurrentWord((prev) => prev.slice(0, -1));
        return;
      }

      if (/^[a-zA-Z]$/.test(e.key)) {
        const key = e.key.toLowerCase();
        if (letters.includes(key)) {
          setCurrentWord((prev) => prev + key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentWord, state]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center px-4 py-6 max-w-xl mx-auto">

      <Navbar
        onHowTo={() => setShowHowTo(!showHowTo)}
        onSettings={() => setShowSettings(true)}
      />

      {showHowTo && <HowToPlay onClose={() => setShowHowTo(false)} />}

      {state.status === "idle" && (
        <div className="flex flex-col items-center justify-center flex-1 w-full mt-16 text-center">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">

          </h1>

          <p className="text-white/50 text-sm max-w-md mb-10 leading-relaxed">
            Find hidden words from scrambled letters.
            <br />
            Train your brain, beat your score, and improve your speed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button
              onClick={startGame}
              size="lg"
              className="w-full text-base font-semibold"
            >
              Start Game
            </Button>
          </div>
        </div>
      )}

      {/* Playing screen */}
      {state.status === "playing" && (
        <div className="flex flex-col gap-6 w-full">
          <StatsBar
            score={state.score}
            found={state.foundWords.length}
            highScore={highScore}
            timeLeft={state.timeLeft}
            isUnlimited={isUnlimited}
          />

          <FoundWords words={state.foundWords} />

          <SelectedWord word={currentWord} />

          <LetterTiles
            letters={state.puzzle.letters}
            onWordChange={setCurrentWord}
            resetSignal={resetSignal}
          />

          <ActionButton
            value={currentWord}
            onSubmit={(word) => {
              const result = submitWord(word);
              if (result.success) {
                setCurrentWord("");
                setResetSignal((prev) => prev + 1);
              }
              return result;
            }}
            onShuffle={shuffleTiles}
            onGiveUp={() => setShowGiveUp(true)}
            onClear={() => setCurrentWord("")}
          />
        </div>
      )}

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
          isPlaying={state.status === "playing"}
          onRestartGame={handleRestartGame}
        />
      )}

      <Footer />
    </main>
  );
}
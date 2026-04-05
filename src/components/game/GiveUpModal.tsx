"use client";

import React from "react";

interface GiveUpModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const GiveUpModal = ({ onConfirm, onCancel }: GiveUpModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-xs text-center">
        <p className="text-white font-semibold text-lg mb-2">Give up?</p>
        <p className="text-white/40 text-sm mb-6">
          You will see your score and all the words you missed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition text-sm font-medium"
          >
            Keep playing
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition text-sm font-medium"
          >
            Give up
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiveUpModal;
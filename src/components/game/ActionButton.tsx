"use client";

import React from "react";
import { FaShuffle } from "react-icons/fa6";
import { FaFlag } from "react-icons/fa";

interface ActionButtonProps {
  value: string;
  onSubmit: (word: string) => void;
  onShuffle: () => void;
  onGiveUp: () => void;
  onClear: () => void;
  disabled?: boolean;
}

const ActionButton = ({
  value,
  onSubmit,
  onShuffle,
  onGiveUp,
  onClear,
  disabled,
}: ActionButtonProps) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="flex items-center gap-3 px-4 py-2 ">

        {/* Shuffle */}
        <button
          onClick={() => {
            onShuffle();
            onClear();
          }}
          className="flex items-center gap-2 text-white/40 hover:text-white/80 transition text-sm cursor-pointer"
        >
          <FaShuffle className="text-base" />
          shuffle
        </button>

        <button
          onClick={() => onSubmit(value)}
          disabled={disabled}
          className="px-4 py-1.5 rounded-md bg-white/10 border border-white/10 text-white/80 hover:bg-white/15 hover:text-white transition text-sm font-medium disabled:opacity-40 cursor-pointer"
        >
          submit
        </button>

      
        <button
          onClick={() => {
            onGiveUp();
            onClear();
          }}
          className="flex items-center gap-2 text-white/40 hover:text-red-400 transition text-sm cursor-pointer"
        >
          <FaFlag className="text-base" />
          give up
        </button>

      </div>
    </div>
  );
};

export default ActionButton;
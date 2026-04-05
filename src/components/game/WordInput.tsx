"use client";

import React, { useRef, useEffect, useState } from "react";

interface WordInputProps {
  onSubmit: (word: string) => { success: boolean; message: string };
  disabled: boolean;
}

const WordInput = ({ onSubmit, disabled }: WordInputProps) => {
  const [value, setValue] = useState("");
  const [hint, setHint] = useState("");
  const [hintType, setHintType] = useState<"success" | "error" | "">("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    const result = onSubmit(value);
    setHint(result.message);
    setHintType(result.success ? "success" : "error");
    if (result.success) setValue("");
    setTimeout(() => {
      setHint("");
      setHintType("");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="flex gap-2 w-full max-w-sm">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value.toLowerCase())}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={disabled}
          placeholder="type a word..."
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/20 outline-none focus:border-white/30 transition disabled:opacity-40"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className="px-5 py-3 bg-white text-black rounded-xl font-semibold text-sm hover:bg-white/90 transition disabled:opacity-40 cursor-pointer"
        >
          Enter
        </button>
      </div>
      <p
        className={`text-sm h-5 transition-all ${
          hintType === "success"
            ? "text-green-400"
            : hintType === "error"
            ? "text-red-400"
            : "text-white/30"
        }`}
      >
        {hint}
      </p>
    </div>
  );
};

export default WordInput;
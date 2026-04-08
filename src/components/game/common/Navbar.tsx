"use client";

import Link from "next/link";
import React from "react";

interface NavbarProps {
  onHowTo: () => void;
  onSettings: () => void;
}

const Navbar = ({ onHowTo, onSettings }: NavbarProps) => {
  return (
    <div className="flex items-center justify-between w-full mb-8">
        <h1 className="text-white font-semibold text-xl tracking-tight ">
          wordzo
        </h1>


      <div className="flex items-center gap-4">
        <button
          onClick={onHowTo}
          className="text-white/30 hover:text-white/60 transition text-sm cursor-pointer"
        >
          how to play
        </button>
        <button
          onClick={onSettings}
          className="text-white/30 hover:text-white/60 transition text-sm cursor-pointer"
        >
          settings
        </button>
      </div>
    </div >
  );
};

export default Navbar;
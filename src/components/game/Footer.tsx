"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="mt-24 py-8 text-center w-full">

      {/* App Name */}
      <p className="text-lg font-semibold text-white mb-4">
        RushLetter
      </p>

      {/* Creator */}
      <p className="text-sm text-white/40 mb-2">
        Made by{" "}
        <a
          href="https://www.karkiankit.com.np/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white underline-offset-4 hover:underline transition"
        >
          Ankit Karki
        </a>
      </p>

      {/* Links */}
      <p className="text-sm text-white/30 mb-3 space-x-4">
        <a
          href="mailto:ankitkarki8088@email.com"
          className="hover:text-white underline-offset-4 hover:underline transition"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/ankitkarki27"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white underline-offset-4 hover:underline transition"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/ankitkarki27"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white underline-offset-4 hover:underline transition"
        >
          GitHub
        </a>
      </p>

      {/* Copyright */}
      <p className="text-xs text-white/20">
        © {new Date().getFullYear()} RushLetter
      </p>
    </footer>
  );
};

export default Footer;
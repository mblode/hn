import React from "react";

export const Footer = () => {
  return (
    <footer className="py-4 text-center">
      <span className="text-sm text-slate-500 dark:text-slate-400 decoration-none">
        Created by{" "}
        <a
          href="https://matthewblode.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 transition-colors dark:text-slate-400 hover:underline hover:text-slate-700 dark:hover:text-slate-200 active:underline active:text-slate-700 dark:active:text-slate-200"
        >
          Matthew Blode
        </a>
      </span>
    </footer>
  );
};
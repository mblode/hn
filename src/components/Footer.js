import React from "react";

export const Footer = () => {
  return (
    <footer className="py-4 text-center">
      <span className="text-sm text-gray-500 dark:text-gray-400 decoration-none">
        Created by{" "}
        <a
          href="https://matthewblode.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors dark:text-gray-400 hover:underline hover:text-gray-700 dark:hover:text-gray-200 active:underline active:text-gray-700 dark:active:text-gray-200"
        >
          Matthew Blode
        </a>
      </span>
    </footer>
  );
};
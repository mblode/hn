import React from "react";

export const Footer = () => {
  return (
    <footer className="py-4 text-center">
      <span className="text-sm text-gray-500 decoration-none">
        Created by{" "}
        <a
          href="https://matthewblode.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:underline hover:text-gray-700 active:underline active:text-gray-700"
        >
          Matthew Blode
        </a>
      </span>
    </footer>
  );
};
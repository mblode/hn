import React from "react";
import { Link, NavLink } from "react-router-dom";
import Search from "./Icons/Search";
import cn from "classnames"

export const Header = () => {
  return (
    <nav className="relative z-10 overflow-hidden bg-white shadow-md dark:bg-slate-800">
      <div className="mx-auto max-w-[700px] h-full flex overflow-x-auto justify-between">
        <div className="flex px-1 flex-nowrap sm:px-0">
          <h1 itemScope="" itemType="http://schema.org/Organization" className="m-0 font-base">
            <Link to="/" className="font-bold text-orange-500 text-2xl sm:pr-4 leading-[60px] block px-3 sm:pl-0 hover:text-orange-600">HN</Link>
          </h1>

          <NavLink to="/" className={({ isActive }) => cn("nav-link", { "active": isActive })}>
            Top
          </NavLink>

          <NavLink to="/newest" className={({ isActive }) => cn("nav-link", { "active": isActive })}>
            New
          </NavLink>

          <NavLink to="/show" className={({ isActive }) => cn("nav-link", { "active": isActive })}>
            Show
          </NavLink>

          <NavLink to="/ask" className={({ isActive }) => cn("nav-link", { "active": isActive })}>
            Ask
          </NavLink>

          <NavLink to="/jobs" className={({ isActive }) => cn("nav-link", { "active": isActive })}>
            Jobs
          </NavLink>
        </div>

        <a
          href="https://hn.algolia.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center pl-1 pr-4 no-underline transition-colors sm:px-0"
        >
          <Search className="w-6 h-6 text-right text-gray-500 transition-colors dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 active:text-gray-800 dark:active:text-gray-100" />
        </a>
      </div>
    </nav>
  );
}
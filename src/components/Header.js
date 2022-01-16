import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Search } from "./Icons/Search";

export const Header = () => {
  return (
    <nav className="bg-white shadow-sm overflow-hidden z-10 relative">
      <div className="mx-auto max-w-[700px] h-full flex overflow-x-auto justify-between">
        <div className="flex flex-nowrap px-1 sm:px-0">
          <h1 itemscope="" itemtype="http://schema.org/Organization" className="font-base m-0">
            <Link to="/" className="font-bold text-orange-500 text-2xl sm:pr-4 leading-[60px] block px-3 sm:pl-0 hover:text-orange-600">HN</Link>
          </h1>

          <NavLink activeClassName="active" to="/" exact className="nav-link">
            Top
          </NavLink>

          <NavLink activeClassName="active" to="/newest" className="nav-link">
            New
          </NavLink>

          <NavLink activeClassName="active" to="/show" className="nav-link">
            Show
          </NavLink>

          <NavLink activeClassName="active" to="/ask" className="nav-link">
            Ask
          </NavLink>

          <NavLink activeClassName="active" to="/jobs" className="nav-link">
            Jobs
          </NavLink>
        </div>

        <a
          href="https://hn.algolia.com"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline leading-[58px] block transition-colors pl-1 pr-4 sm:px-0"
        >
          <Search className="w-6 h-6 text-right text-gray-500 transition-colors hover:text-gray-700 active:text-gray-800" />
        </a>
      </div>
    </nav>
  );
}
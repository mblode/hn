import cn from "classnames";
import { Link, NavLink } from "react-router-dom";
import Search from "./icons/search";

export const Header = () => {
  return (
    <nav className="relative z-10 overflow-hidden border-border border-b sm:border-0">
      <div className="mx-auto flex h-full max-w-[620px] justify-between overflow-x-auto">
        <div className="flex flex-nowrap items-center px-1 sm:px-0">
          <h1
            className="m-0 font-base"
            itemScope={true}
            itemType="http://schema.org/Organization"
          >
            <Link
              className="block px-3 font-bold text-2xl text-orange-500 leading-[60px] transition-colors hover:text-orange-600 sm:pr-4 sm:pl-0"
              to="/"
            >
              HN
            </Link>
          </h1>

          <NavLink
            className={({ isActive }) => cn("nav-link", { active: isActive })}
            to="/"
          >
            Top
          </NavLink>

          <NavLink
            className={({ isActive }) => cn("nav-link", { active: isActive })}
            to="/newest"
          >
            New
          </NavLink>

          <NavLink
            className={({ isActive }) => cn("nav-link", { active: isActive })}
            to="/show"
          >
            Show
          </NavLink>

          <NavLink
            className={({ isActive }) => cn("nav-link", { active: isActive })}
            to="/ask"
          >
            Ask
          </NavLink>

          <NavLink
            className={({ isActive }) => cn("nav-link", { active: isActive })}
            to="/jobs"
          >
            Jobs
          </NavLink>
        </div>

        <a
          className="flex items-center pr-4 pl-1 no-underline transition-colors sm:px-0"
          href="https://hn.algolia.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Search className="h-6 w-6 text-right text-muted-foreground transition-colors hover:text-foreground active:text-foreground" />
        </a>
      </div>
    </nav>
  );
};

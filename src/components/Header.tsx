import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <nav className="Header">
            <Link to="/">
                HN
            </Link>
            <NavLink
                activeClassName="active"
                className="Header__navlink"
                to="/top"
            >
                Top
            </NavLink>
            <NavLink
                activeClassName="active"
                className="Header__navlink"
                to="/newest"
            >
                New
            </NavLink>
            <NavLink
                activeClassName="active"
                className="Header__navlink"
                to="/show"
            >
                Show
            </NavLink>
            <NavLink
                activeClassName="active"
                className="Header__navlink"
                to="/ask"
            >
                Ask
            </NavLink>
            <NavLink
                activeClassName="active"
                className="Header__navlink"
                to="/jobs"
            >
                Jobs
            </NavLink>
        </nav>
    );
}

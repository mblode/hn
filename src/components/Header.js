import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export function makeIsActive(path) {
    return function isActive(match, location) {
        return location.pathname.indexOf(path) !== -1;
    };
}

function Header() {
    return (
        <nav className="Header">
            <Link to="/">
                HN
            </Link>
            <NavLink
                activeClassName="Header__navlink--active"
                className="Header__navlink"
                to="/1"
                isActive={makeIsActive('/news')}
            >
                Top
            </NavLink>
            <NavLink
                activeClassName="Header__navlink--active"
                className="Header__navlink"
                to="/newest/1"
                isActive={makeIsActive('/newest')}
            >
                New
            </NavLink>
            <NavLink
                activeClassName="Header__navlink--active"
                className="Header__navlink"
                to="/show/1"
                isActive={makeIsActive('/show')}
            >
                Show
            </NavLink>
            <NavLink
                activeClassName="Header__navlink--active"
                className="Header__navlink"
                to="/ask/1"
                isActive={makeIsActive('/ask')}
            >
                Ask
            </NavLink>
            <NavLink
                activeClassName="Header__navlink--active"
                className="Header__navlink"
                to="/jobs/1"
                isActive={makeIsActive('/jobs')}
            >
                Jobs
            </NavLink>
        </nav>
    );
}

export default Header;

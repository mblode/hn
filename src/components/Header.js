import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components'

const Nav = styled.nav`
    background: #f68a30;
    color: white;
`

const Container = styled.div`
    max-width: 700px;
    margin: 0 auto;
    display: flex;
`

const StyledLink = styled(Link)`
    color: white;
    font-weight: bold;
    font-size: 24px;
    padding-right: 20px;
    line-height: 60px;

    :hover {
        text-decoration: none;
        color: white;
    }
`;

const StyledNavLink = styled(NavLink)`
    color: white;
    position: relative;
    margin: 0 0 0 6px;
    padding: 0 20px;
    font-weight: 500;
    font-size: 16px;
    text-decoration: none;
    line-height: 60px;
    border-bottom: 6px solid transparent;

    :hover {
        text-decoration: none;
        color: white;
        border-color: white;
    }
`;

export function makeIsActive(path) {
    return function isActive(match, location) {
        return location.pathname.indexOf(path) !== -1;
    };
}

function Header() {
    return (
        <Nav>
            <Container>
                <StyledLink to="/">
                    HN
                </StyledLink>

                <StyledNavLink
                    activeClassName="active"
                    to="/top/1"
                    isActive={makeIsActive('/news')}
                >
                    Top
                </StyledNavLink>
                <StyledNavLink
                    activeClassName="active"
                    to="/newest/1"
                    isActive={makeIsActive('/newest')}
                >
                    New
                </StyledNavLink>
                <StyledNavLink
                    activeClassName="active"
                    to="/show/1"
                    isActive={makeIsActive('/show')}
                >
                    Show
                </StyledNavLink>
                <StyledNavLink
                    activeClassName="active"
                    to="/ask/1"
                    isActive={makeIsActive('/ask')}
                >
                    Ask
                </StyledNavLink>
                <StyledNavLink
                    activeClassName="active"
                    to="/jobs/1"
                    isActive={makeIsActive('/jobs')}
                >
                    Jobs
                </StyledNavLink>
            </Container>
        </Nav>
    );
}

export default Header;

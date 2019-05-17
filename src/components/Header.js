import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components'

const Nav = styled.nav`
    background: #f68a30;
    color: white;
    overflow: hidden;
`

const Container = styled.div`
    max-width: 700px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    overflow-x: auto;
`

const NavInner = styled.div`
    display: flex;
    flex-wrap: nowrap;

    @media (max-width: 768px) {
        padding-left: 4px;
        padding-right: 4px;
    }
`
const StyledBrand = styled(Link)`
    color: white;
    font-weight: bold;
    font-size: 24px;
    padding-right: 16px;
    line-height: 60px;
    display: block;

    @media (max-width: 768px) {
        margin-left: 12px;
        line-height: 60px;
        padding-right: 12px;
    }

    :hover {
        text-decoration: none;
        color: white;
    }
`;

const StyledNavLink = styled(NavLink)`
    color: rgba(255, 255, 255, 0.7);
    position: relative;
    padding: 0 16px;
    font-weight: 500;
    font-size: 16px;
    text-decoration: none;
    line-height: 60px;
    display: block;
    transition: color 0.15s ease-in-out;

    &.active {
        text-decoration: none;
        color: white;
        font-weight: bold;
    }

    :hover {
        text-decoration: none;
        color: white;
    }

    @media (max-width: 768px) {
        padding: 0 12px;
        line-height: 60px;
    }
`;

function Header() {
    return (
        <Nav>
            <Container>
                <NavInner>
                    <StyledBrand to="/">
                        HN
                    </StyledBrand>

                    <StyledNavLink
                        activeClassName="active"
                        to="/"
                        exact
                    >
                        Top
                    </StyledNavLink>

                    <StyledNavLink
                        activeClassName="active"
                        to="/newest"
                    >
                        New
                    </StyledNavLink>

                    <StyledNavLink
                        activeClassName="active"
                        to="/show"
                    >
                        Show
                    </StyledNavLink>

                    <StyledNavLink
                        activeClassName="active"
                        to="/ask"
                    >
                        Ask
                    </StyledNavLink>

                    <StyledNavLink
                        activeClassName="active"
                        to="/jobs"
                    >
                        Jobs
                    </StyledNavLink>
                </NavInner>
            </Container>
        </Nav>
    );
}

export default Header;

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

    @media (max-width: 768px) {
        margin-left: 24px;
    }

    :hover {
        text-decoration: none;
        color: white;
    }
`;

const StyledNavLink = styled(NavLink)`
    color: white;
    position: relative;
    padding: 0 20px;
    font-weight: 500;
    font-size: 16px;
    text-decoration: none;
    line-height: 60px;
    border-bottom: 4px solid transparent;

    &.active {
        text-decoration: none;
        color: white;
        border-color: white;
    }

    :hover {
        text-decoration: none;
        color: white;
        border-color: white;
    }
`;

function Header() {
    return (
        <Nav>
            <Container>
                <StyledLink to="/">
                    HN
                </StyledLink>

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
            </Container>
        </Nav>
    );
}

export default Header;

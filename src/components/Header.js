import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components'
import { Search } from 'react-feather'
import { get } from 'pikcha-frame'

const Nav = styled.nav`
    background: white;
    overflow: hidden;
    box-shadow: ${get('shadows.md')};
`

const Container = styled.div`
    max-width: 700px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    overflow-x: auto;
    justify-content: space-between;
`

const NavInner = styled.div`
    display: flex;
    flex-wrap: nowrap;

    @media (max-width: 768px) {
        padding-left: 4px;
        padding-right: 4px;
    }
`

const BrandH1 = styled.h1`
    font-size: 1rem;
    margin: 0;
`

const StyledBrand = styled(Link)`
    font-weight: bold;
    color: #f68a30;
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
        color: #f68a30;
    }
`;

const StyledNavLink = styled(NavLink)`
    color: ${get('colors.gray.5')};
    position: relative;
    padding: 0 16px;
    font-size: 16px;
    text-decoration: none;
    line-height: 60px;
    display: block;
    transition: color 0.15s ease-in-out;

    &.active {
        text-decoration: none;
        color: ${get('colors.gray.8')};
        font-weight: 500;
    }

    :hover {
        text-decoration: none;
        color: ${get('colors.gray.7')};
    }

    @media (max-width: 768px) {
        padding: 0 12px;
        line-height: 60px;
    }
`;

const SearchWrap = styled.a`
    text-decoration: none;
    line-height: 58px;
    display: block;
    transition: color 0.15s ease-in-out;

    @media (max-width: 768px) {
        padding-left: 4px;
        padding-right: 16px;
    }
`

const SearchIcon = styled(Search)`
    width: 24px;
    height: 24px;
    text-align: right;
    color: ${get('colors.gray.5')};
`

function Header() {
    return (
        <Nav>
            <Container>
                <NavInner>
                    <BrandH1 itemscope="" itemtype="http://schema.org/Organization">
                        <StyledBrand to="/">HN</StyledBrand>
                    </BrandH1>

                    <StyledNavLink
                        activeClassName="active"
                        to="/"
                        exact
                    >
                        Top
                    </StyledNavLink>

                    <StyledNavLink
                        activeClassName="active"
                        to="/newest/1"
                    >
                        New
                    </StyledNavLink>

                    <StyledNavLink
                        activeClassName="active"
                        to="/show/1"
                    >
                        Show
                    </StyledNavLink>

                    <StyledNavLink
                        activeClassName="active"
                        to="/ask/1"
                    >
                        Ask
                    </StyledNavLink>

                    <StyledNavLink
                        activeClassName="active"
                        to="/jobs/1"
                    >
                        Jobs
                    </StyledNavLink>

                </NavInner>
                <SearchWrap href="https://hn.algolia.com" target="_blank" rel="noopener noreferrer">
                    <SearchIcon />
                </SearchWrap>
            </Container>
        </Nav>
    );
}

export default Header;

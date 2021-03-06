import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Search } from 'styled-icons/boxicons-regular';
import { get } from 'roni';

const Nav = styled.nav`
    background-color: ${get('colors.white')};
    overflow: hidden;
    box-shadow: ${get('shadows.sm')};
    z-index: 10;
    position: relative;
`;

const Container = styled.div`
    max-width: 700px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    overflow-x: auto;
    justify-content: space-between;
`;

const NavInner = styled.div`
    display: flex;
    flex-wrap: nowrap;

    @media (max-width: 768px) {
        padding-left: 4px;
        padding-right: 4px;
    }
`;

const BrandH1 = styled.h1`
    font-size: 1rem;
    margin: 0;
`;

const StyledBrand = styled(Link)`
    font-weight: bold;
    color: #f68a30;
    font-size: 24px;
    padding-right: 16px;
    line-height: 60px;
    display: block;

    @media (max-width: 768px) {
        padding-left: 12px;
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
`;

const SearchIcon = styled(Search)`
    width: 24px;
    height: 24px;
    text-align: right;
    color: ${get('colors.gray.5')};
    transition: color 0.15s ease-in-out;

    :hover {
        color: ${get('colors.gray.7')};
    }

    :active {
        color: ${get('colors.gray.8')};
    }
`;

function Header() {
    return (
        <Nav>
            <Container>
                <NavInner>
                    <BrandH1 itemscope='' itemtype='http://schema.org/Organization'>
                        <StyledBrand to='/'>HN</StyledBrand>
                    </BrandH1>

                    <StyledNavLink activeClassName='active' to='/' exact>
                        Top
                    </StyledNavLink>

                    <StyledNavLink activeClassName='active' to='/newest'>
                        New
                    </StyledNavLink>

                    <StyledNavLink activeClassName='active' to='/show'>
                        Show
                    </StyledNavLink>

                    <StyledNavLink activeClassName='active' to='/ask'>
                        Ask
                    </StyledNavLink>

                    <StyledNavLink activeClassName='active' to='/jobs'>
                        Jobs
                    </StyledNavLink>
                </NavInner>
                <SearchWrap href='https://hn.algolia.com' target='_blank' rel='noopener noreferrer'>
                    <SearchIcon />
                </SearchWrap>
            </Container>
        </Nav>
    );
}

export default Header;

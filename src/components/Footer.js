import React from 'react'
import styled from 'styled-components'
import { get } from 'pikcha-frame'

const FooterWrap = styled.footer`
    padding-top: 16px;
    text-align: center;
`;

const Copy = styled.span`
    font-size: 14px;
    color: ${get('colors.gray.5')};
    text-decoration: none;
`;

const Creator = styled.span`
    color: ${get('colors.gray.5')};
    text-decoration: none;
    transition: color 0.15s ease-in-out;

    :hover {
        color: ${get('colors.gray.6')};
        text-decoration: underline;
    }

    :active {
        color: ${get('colors.gray.7')};
        text-decoration: underline;
    }
`;

const Footer = () => {
    return (
        <FooterWrap>
            <Copy>Created by <Creator href="https://matthewblode.com/" target="_blank" rel="noopener noreferrer">Matthew Blode</Creator></Copy>
        </FooterWrap>
    )
}

export default Footer

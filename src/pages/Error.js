import React, { Component } from 'react'
import styled from 'styled-components';

export const ErrorWrap = styled.h3`
    text-align: center;
    background-color: #fff;
    border-radius: 4px;
    padding: 30px 24px;

    @media (max-width: 768px) {
        padding: 24px 16px;
    }
`

export default class Error extends Component {
    render() {
        return (
            <ErrorWrap>404 Page Not Found</ErrorWrap>
        )
    }
}

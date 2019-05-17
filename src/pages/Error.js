import React, { Component } from 'react'
import styled from 'styled-components';

export const ErrorWrap = styled.h3`
    text-align: center;
    background-color: #fff;
    border-radius: 6px;
    padding: 30px 24px;
    border: 1px solid rgb(235, 236, 237);

    @media (max-width: 768px) {
        padding: 24px 16px;
        border-left: none;
        border-right: none;
        border-radius: 0;
    }
`

export default class Error extends Component {
    render() {
        return (
            <ErrorWrap>404 Page Not Found</ErrorWrap>
        )
    }
}

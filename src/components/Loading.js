import React, { Component } from 'react'
import styled from 'styled-components';

export const LoadingWrap = styled.p`
    font-style: italic;
    text-align: center;
    background-color: #fff;
    border-radius: 4px;
    padding: 30px 24px;

    @media (max-width: 768px) {
        padding: 24px 16px;
    }
`

export default class Loading extends Component {
    render() {
        return (
            <LoadingWrap>Loading...</LoadingWrap>
        )
    }
}

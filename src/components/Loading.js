import React, { Component } from 'react'
import styled from 'styled-components';

export const LoadingWrap = styled.p`
    font-style: italic;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 30px 24px;
`

export default class Loading extends Component {
    render() {
        return (
            <LoadingWrap>Loading...</LoadingWrap>
        )
    }
}

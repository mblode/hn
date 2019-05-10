import React, { Component } from 'react'
import styled from 'styled-components';

export const ErrorWrap = styled.h3`
    text-align: center;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 30px 24px;
`

export default class Error extends Component {
    render() {
        return (
            <ErrorWrap>404 Page Not Found</ErrorWrap>
        )
    }
}

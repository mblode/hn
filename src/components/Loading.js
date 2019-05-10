import React, { Component } from 'react'
import styled from 'styled-components';

export const LoadingWrap = styled.p`
    font-style: italic;
    text-align: center;
`

export default class Loading extends Component {
    render() {
        return (
            <LoadingWrap>Loading...</LoadingWrap>
        )
    }
}

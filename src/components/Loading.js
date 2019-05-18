import React, { Component } from 'react'
import styled from 'styled-components'
import { Spinner } from 'pikcha-frame'

export const LoadingWrap = styled.div`
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

export const LoadingText = styled.p`
    text-align: center;
    padding-top: 1rem;
    margin-bottom: 0;
`

export default class Loading extends Component {
    render() {
        return (
            <LoadingWrap>
                <Spinner stroke="#f68a30" />

                <LoadingText>Loading...</LoadingText>
            </LoadingWrap>
        )
    }
}

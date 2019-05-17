import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`

const dash = keyframes`
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
    }

    100% {
        stroke-dashoffset: -125px;
    }
`

export const SvgWrap = styled.svg`
    transform-origin: center;
    animation: ${rotate} 2s linear infinite;
    width: 50px;
    height: 50px;
`

export const CircleWrap = styled.circle`
    fill: none;
    stroke: #f68a30;
    stroke-width: 3;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
`

export const LoadingWrap = styled.div`
    text-align: center;
    background-color: #fff;
    border-radius: 4px;
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
                <SvgWrap viewBox="25 25 50 50">
                    <CircleWrap cx="50" cy="50" r="20"></CircleWrap>
                </SvgWrap>

                <LoadingText>Loading...</LoadingText>
            </LoadingWrap>
        )
    }
}

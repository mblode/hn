import React, { Component } from 'react'
import styled from 'styled-components'
import { ArrowUp } from 'react-feather'

const ScrollButton = styled.button`
    background-color: white;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 16px;
    right: 16px;
    border-radius: 4px;
    border: none;
    z-index: 1000;

`

const Arrow = styled.span`
    color: #212529;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default class ScrollTop extends Component {
    constructor() {
        super();

        this.state = {
            intervalId: 0
        };
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }

    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId: intervalId });
    }

    render() {
        return (
            <ScrollButton title='Back to top' onClick={() => { this.scrollToTop(); }}>
                <Arrow>
                    <ArrowUp />
                </Arrow>
            </ScrollButton>
        );
    }
}

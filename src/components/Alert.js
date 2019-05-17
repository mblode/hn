import React, { Component } from 'react'
import styled from 'styled-components'
import { AlertTriangle } from 'react-feather'

const StyledAlert = styled.div`
    text-align: left;
    font-weight: bold;
    background-color: #fff;
    border-radius: 4px;
    padding: 16px 24px;
    border: 1px solid rgb(235, 236, 237);
    display: flex;
    border-left: 4px solid #f56565;
    color: #9B2C2C;

    @media (max-width: 768px) {
        padding: 24px 16px;
    }
`
const IconWrap = styled.div`
    padding-right: 1rem;
    position: relative;
    top: -2px;
`

const Icon = styled(AlertTriangle)`
    stroke: #C53030;
`

export default class Alert extends Component {
    render() {
        const { type, children } = this.props;

        let content = children;

        return (
            <StyledAlert type={type}>
                <IconWrap>
                    <Icon />
                </IconWrap>

                {content}
            </StyledAlert>
        );
    }
}

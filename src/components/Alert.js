import React, { Component } from 'react';
import styled from 'styled-components'

const StyledAlert = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: #828b98;
`

export default class Alert extends Component {
    render() {
        const { type, children } = this.props;

        let content = children;

        return (
            <StyledAlert type={type}>
                {content}
            </StyledAlert>
        );
    }
}

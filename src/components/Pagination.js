import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components'

const PaginationWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 24px;
    overflow: hidden;
    position: relative;
    justify-content: center;
`

const Button = styled(Link)`
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-left: 4px;
    margin-right: 4px;

    ${
    props => props.disabled && css`
    opacity: 0.65;
    pointer-events: none;
    `}

    &:hover {
        color: #212529;
        text-decoration: none;
    }

    &:focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
`

class Pagination extends Component {
     render() {
        console.log(this.props.type, this.props.page)

        return (
            <PaginationWrap>
                <Button to={`/${this.props.type}/${parseInt(this.props.page) - 1}`} disabled={parseInt(this.props.page) <= 1}>Prev</Button>
                <Button to={`/${this.props.type}/${parseInt(this.props.page) + 1}`} disabled={this.props.type === "jobs"}>Next</Button>
            </PaginationWrap>
        )
    }
}

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(Pagination);

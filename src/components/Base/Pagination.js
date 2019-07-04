import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { Button } from 'pikcha-frame';

const PaginationWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 24px;
    overflow: hidden;
    position: relative;
    justify-content: center;

    @media (max-width: 768px) {
        padding: 16px 16px;
    }
`

const PrevNext = styled(Button)`
    margin-left: 4px;
    margin-right: 4px;
`

class Pagination extends Component {
     render() {
        return (
            <PaginationWrap>
                <Link to={`/${this.props.type}/${parseInt(this.props.page) - 1}`}>
                    <PrevNext disabled={parseInt(this.props.page) <= 1}>Prev</PrevNext>
                </Link>

                <Link to={`/${this.props.type}/${parseInt(this.props.page) + 1}`}>
                    <PrevNext disabled={this.props.type === "jobs"}>Next</PrevNext>
                </Link>
            </PaginationWrap>
        )
    }
}

const mapStateToProps = state => ({
	...state
});

export default connect(mapStateToProps)(Pagination);

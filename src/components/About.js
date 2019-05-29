import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { get } from 'pikcha-frame'
import { Helmet } from 'react-helmet'
import { Wrap } from './Base'

const PageTitle = styled.div`
    display: block;
    padding-bottom: 12px;
    margin-bottom: 16px;
    border-bottom: 1px solid #e8e8e8;
`

const UserName = styled.div`
    font-size: 22px;
    line-height: 1.3;
    display: block;
    width: 100%;
    color: ${get('colors.gray.6')};
    text-decoration: none;
    margin-bottom: 8px;
`

class About extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Hacker News &middot; About</title>
                </Helmet>

                <Wrap>
                    <PageTitle>
                        <UserName>About</UserName>
                    </PageTitle>
                </Wrap>
            </Fragment>
        )
    }
}

export default withRouter(About);

import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Heading } from 'pikcha-frame'
import { Wrap } from './Base'

export default class Error extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Hacker News &middot; Page Not Found</title>
                </Helmet>
                <Wrap align="center">
                    <Heading as="h1" fontSize={4}>Page Not Found</Heading>
                </Wrap>
            </Fragment>
        )
    }
}

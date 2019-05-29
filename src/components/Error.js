import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { Heading, Button } from 'pikcha-frame'
import { Wrap } from './Base'

export default class Error extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Hacker News &middot; Page Not Found</title>
                </Helmet>
                <Wrap align="center">
                    <Heading as="h1" fontSize={8} mb={2}>Oops.</Heading>
                    <Heading as="h1" fontSize={4} mb={4}>Can't find that page...</Heading>
                    <Link to="/">
                        <Button kind="secondary">Go back home</Button>
                    </Link>
                </Wrap>
            </Fragment>
        )
    }
}

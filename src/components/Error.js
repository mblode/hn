import React, { Component, Fragment } from 'react'
import Wrap from '../components/Wrap'
import { Heading } from 'pikcha-frame'
import { Helmet } from 'react-helmet'

export default class Error extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Hacker News &middot; Page Not Found</title>
                </Helmet>
                <Wrap>
                    <Heading as="h1" fontSize={4}>Page Not Found</Heading>
                </Wrap>
            </Fragment>
        )
    }
}

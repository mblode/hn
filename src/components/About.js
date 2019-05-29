import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Heading, Text, Link } from 'pikcha-frame'
import { Helmet } from 'react-helmet'
import { Wrap } from './Base'

class About extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Hacker News &middot; About</title>
                </Helmet>

                <Wrap>
                    <Heading>About</Heading>

                    <Text>Hacker News web app built using React and Redux.</Text>

                    <Link href="https://github.com/mblode/hn" target="_blank" rel="noopener noreferrer">
                        Find out more on GitHub
                    </Link>
                </Wrap>
            </Fragment>
        )
    }
}

export default withRouter(About);

import React, { Component } from 'react'
import Wrap from '../components/Wrap'
import { Heading } from 'pikcha-frame'


export default class Error extends Component {
    render() {
        return (
            <Wrap>
                <Heading as="h1" fontSize={4}>Page Not Found</Heading>
            </Wrap>
        )
    }
}

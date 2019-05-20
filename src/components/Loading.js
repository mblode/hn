import React, { Component } from 'react'
import Wrap from './Wrap'
import { Spinner } from 'pikcha-frame'

export default class Loading extends Component {
    render() {
        return (
            <Wrap>
                <Spinner stroke="#f68a30" />
            </Wrap>
        )
    }
}

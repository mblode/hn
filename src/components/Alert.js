import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Alert extends Component {
    render() {
        const { type, className, children } = this.props;

        let content = children;

        return (
            <div>
                {content}
            </div>
        );
    }
}

Alert.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string
};

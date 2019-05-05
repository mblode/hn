import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Alert extends Component {
    render() {
        const { type, className, children } = this.props;

        let content = children;

        var alertClass = classNames({
            alert: true,
            [`alert-${type}`]: type !== undefined,
            [className]: className !== undefined
        });

        return (
            <div className={alertClass}>
                {content}
            </div>
        );
    }
}

Alert.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string
};

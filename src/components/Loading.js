import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    active: PropTypes.bool,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
    active: false,
    style: {},
};

function Loading({ active, style }) {
    if (!active) return null;

    return (
        <div className="Loading" style={style}>
            <div className="Loading__col" />
            <div className="Loading__col" />
            <div className="Loading__col" />
        </div>
    );
}

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;

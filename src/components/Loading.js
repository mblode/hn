import React from 'react';

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

export default Loading;

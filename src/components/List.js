import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../components/ListItem';
import Loading from '../components/Loading';

const propTypes = {
    feeds: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    isFetching: PropTypes.bool,
};

const defaultProps = {
    feeds: Immutable.List(),
    isFetching: false,
};

function List({ feeds, isFetching }) {
    const haveNoItems = !isFetching && feeds.size === 0;

    return (
        <ul className="List">
            <Loading
                active={isFetching}
                style={{ position: 'absolute', left: 'calc(50% - 24px)', marginTop: '10px', }}
            />
            {haveNoItems && <p className="List__noti">There are no items to show.</p>}
            {!isFetching && feeds.map((feed, index) => (
                <li className="List__item" key={feed.get('id')}>
                    <span className="List__index">{index + 1}</span>
                    <ListItem {...feed.toJS()} />
                </li>
            )).toArray()}
        </ul>
    );
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;

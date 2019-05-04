
import React from 'react';
import PropTypes from 'prop-types';

import ListContainer from '../containers/ListContainer';
import LocationPaginationContainer from '../containers/LocationPaginationContainer';

const propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

function FeedRoute({ location }) {
  const feedType = location.pathname.split('/').slice(1)[0];

  return (
    <div>
      <LocationPaginationContainer type={feedType} />
      <div className="content-container">
        <ListContainer type={feedType} />
      </div>
    </div>
  );
}

FeedRoute.propTypes = propTypes;

export default FeedRoute;

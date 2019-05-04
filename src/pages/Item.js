
import React from 'react';
import PropTypes from 'prop-types';

import ItemContainer from '../containers/ItemContainer';

const propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
};

function ItemRoute({ match }) {
  const id = parseInt(match.params.id, 10);

  return (
    <div className="content-container">
      <ItemContainer commentId={id} itemId={id} />
    </div>
  );
}

ItemRoute.propTypes = propTypes;

export default ItemRoute;

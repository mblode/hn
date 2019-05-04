import { connect } from 'react-redux';

import List from '../components/List';
import { getFeeds, getIsFetching } from '../store/selectors';

const mapStateToProps = (state, props) => ({
    feeds: getFeeds(state, props),
    isFetching: getIsFetching(state),
});

export default connect(mapStateToProps)(List);

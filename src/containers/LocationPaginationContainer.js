import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import LocationPagination from '../components/LocationPagination';
import { fetchPosts } from '../actions/postsAction';
import { getCurrentPage, getFeedCount } from '../store/selectors';

const mapStateToProps = (state, props) => ({
    currentPage: getCurrentPage(state),
    feedCount: getFeedCount(state, props),
});

const mapDispatchToProps = {
    onPaginate: fetchPosts,
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(LocationPagination));

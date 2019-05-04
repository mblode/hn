import { connect } from 'react-redux';

import Item from '../components/Item';
import { fetchComments } from '../actions/postsAction';
import { getItem, getChildrenComments } from '../store/selectors';

const mapStateToProps = (state, props) => ({
    comments: getChildrenComments(state, props),
    item: getItem(state, props),
});

const mapDispatchToProps = {
    onItemFetch: fetchComments,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Item);

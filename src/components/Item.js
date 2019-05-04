import React from 'react';
import PropTypes from 'prop-types';

import CommentContainer from '../containers/CommentContainer';
import ListItem from '../components/ListItem';
import Loading from '../components/Loading';

const propTypes = {
    comments: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    done: PropTypes.func,
    item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    itemId: PropTypes.number,
    onItemFetch: PropTypes.func,
};

const defaultProps = {
    comments: null,
    done() { },
    item: null,
    itemId: 0,
    onItemFetch() { return Promise.resolve(); },
};

class Item extends React.Component {
    componentWillMount() {
        const { done, item, itemId } = this.props;

        if (!item) {
            this.props.onItemFetch(itemId).then(done, done);
        }
    }

    render() {
        const { comments, item } = this.props;
        if (!comments || !item) {
            return (
                <Loading
                    active
                    style={{ position: 'absolute', left: 'calc(50% - 24px)', marginTop: '30px', }}
                />
            );
        }

        return (
            <div className="Item">
                <div className="Item__content">
                    <ListItem {...item.toJS()} />
                </div>
                {comments.map(id => <CommentContainer commentId={id} key={id} />).toArray()}
            </div>
        );
    }
}
Item.propTypes = propTypes;
Item.defaultProps = defaultProps;
export default Item;

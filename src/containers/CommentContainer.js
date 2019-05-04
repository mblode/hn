import cx from 'classnames';
import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeGetChildrenComments, makeGetCommentContents } from '../store/selectors';

const propTypes = {
    comments: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    contents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
    comments: Immutable.List(),
    contents: Immutable.Map(),
};

export class CommentInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = { collapse: false };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState(prevState => ({ collapse: !prevState.collapse }));
    }

    render() {
        const { comments, contents } = this.props;
        const { collapse } = this.state;

        const innerClassName = cx('Comment__inner', {
            'Comment__inner--hide': collapse,
        });

        return (
            <div className="Comment">
                <div className="Comment__head">
                    <button
                        type="button"
                        onClick={this.toggleCollapse}
                    >
                        {collapse ? '[+]' : '[-]'}
                    </button>
                    {' '}
                    <Link
                        href={`/user/${contents.get('user')}`}
                        to={`/user/${contents.get('user')}`}
                    >
                        {contents.get('user')}
                    </Link>
                    {' '}
                    <span>{contents.get('timeAgo')}</span>
                </div>
                <div className={innerClassName}>
                    <div
                        className="Comment__content"
                        dangerouslySetInnerHTML={{ __html: contents.get('content') }} // eslint-disable-line react/no-danger
                    />
                    {comments.map(id => <Comment commentId={id} key={id} />).toArray()}
                </div>
            </div>
        );
    }
}

CommentInner.propTypes = propTypes;
CommentInner.defaultProps = defaultProps;

const makeMapStateToProps = () => {
    const getChildrenComments = makeGetChildrenComments();
    const getCommentContents = makeGetCommentContents();

    return (state, props) => ({
        comments: getChildrenComments(state, props),
        contents: getCommentContents(state, props),
    });
};

const Comment = connect(makeMapStateToProps, null)(CommentInner);
export default Comment;

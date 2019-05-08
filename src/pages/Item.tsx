import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchComments } from '../actions/postsAction';
import Loading from '../components/Loading';
import Comment from '../components/Comment';
import Alert from '../components/Alert';

class Item extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(fetchComments(id));
    }

    render() {
        const { error, isFetching, data } = this.props.posts;

        if (error) {
            return (<Alert type="danger">Error: {error}</Alert>);
        }

        if (isFetching) {
            return <Loading />;
        }

        return (
            <div>
                {data.comments.map((item, i) => (
                    <Comment key={i} item={item} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
	...state
});

export default withRouter(connect(mapStateToProps)(Item));

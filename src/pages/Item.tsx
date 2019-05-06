import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, RouteProps } from 'react-router-dom'
import { fetchComments } from '../actions/postsAction';
import Loading from '../components/Loading';
import Comment from '../components/Comment';
import Alert from '../components/Alert';

interface Props {
}

interface State {
}

class Item extends Component<Props & RouteProps, State> {
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
                {data.comments.map((item: object, i: number) => (
                    <Comment key={i} user={item.user} timeAgo={item.time_ago} content={item.content} type={item.type} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state: State) => ({
	...state
});

export default withRouter(connect(mapStateToProps)(Item) as React.ComponentType<any>);

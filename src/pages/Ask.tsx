import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, RouteProps, match } from 'react-router-dom'
import { fetchPosts } from '../actions/postsAction';
import Loading from '../components/Loading';
import Post from '../components/Post';
import Alert from '../components/Alert';
import { Dispatch } from 'redux';

interface Props {
    match: match,
    dispatch: Dispatch
}

interface State {
}

class Ask extends Component<Props & RouteProps, State> {
    componentDidMount() {
        let page = this.props.match.params.page;

        if (page === undefined) {
            page = 1;
        }

        this.props.dispatch(fetchPosts('ask', page));
    }

    componentDidUpdate(prevProps) {
        let page = this.props.match.params.page;

        if (page === undefined) {
            page = 1;
        }

        if (this.props.location !== prevProps.location) {
            this.props.dispatch(fetchPosts('ask', page));
        }
	}

    render() {
        const { error, isFetching, ask } = this.props.posts;

        if (error) {
			return (<Alert type="danger">Error: {error}</Alert>);
		}

		if (isFetching) {
			return <Loading />;
		}

        return (
            <div>
                {ask.map((item: object, i: number) => (
                    <Post key={i} commentsCount={item.comments_count} id={item.id} points={item.points} timeAgo={item.time_ago} title={item.title} url={item.url} user={item.user} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state: State) => ({
	...state
});

export default withRouter(connect(mapStateToProps)(Ask) as React.ComponentType<any>);

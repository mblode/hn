import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, RouteProps, match } from 'react-router-dom'
import { fetchPosts } from '../actions/postsAction';
import { ThunkDispatch } from 'redux-thunk'
import Loading from '../components/Loading';
import Post from '../components/Post';
import Alert from '../components/Alert';
import { Post } from '../store/post/types'

interface PropsFromState {
    news: Post[],
    isFetching: boolean,
    error?: string,
}

interface Props {
    match: match<DetailParams>,
    dispatch: ThunkDispatch,
    posts: object,
    location: string,
}

interface State {
}

class Feed extends Component<Props & RouteProps, State> {
    componentDidMount() {
        let page = this.props.match.params.page;

        if (page === undefined) {
            page = "1";
        }

        this.props.dispatch(fetchPosts('news', page));
    }

    componentDidUpdate(prevProps: Props) {
        let page = this.props.match.params.page;

        if (page === undefined) {
            page = "1";
        }

        if (this.props.location !== prevProps.location) {
            this.props.dispatch(fetchPosts('news', page));
        }
	}

    render() {
        const { error, isFetching, news } = this.props.posts;

        if (error) {
			return (<Alert type="danger">Error: {error}</Alert>);
		}

		if (isFetching) {
			return <Loading />;
		}

        return (
            <div>
                {news.map((item, i) => (
                    <Post key={i} item={item} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state: State) => ({
	...state
});

export default withRouter(connect(mapStateToProps)(Feed) as React.ComponentType<any>);

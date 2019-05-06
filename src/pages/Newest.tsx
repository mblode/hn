import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, RouteProps } from 'react-router-dom'
import { fetchPosts } from '../actions/postsAction';
import Loading from '../components/Loading';
import Post from '../components/Post';
import Alert from '../components/Alert';

interface Props {
}

interface State {
}

class Newest extends Component<Props & RouteProps, State> {
    componentDidMount() {
        let page = this.props.match.params.page;

        if (page === undefined) {
            page = 1;
        }

        this.props.dispatch(fetchPosts('newest', page));
    }

    componentDidUpdate(prevProps) {
        let page = this.props.match.params.page;

        if (page === undefined) {
            page = 1;
        }

        if (this.props.location !== prevProps.location) {
            this.props.dispatch(fetchPosts('newest', page));
        }
	}

    render() {
        const { error, isFetching, newest } = this.props.posts;

        if (error) {
			return (<Alert type="danger">Error: {error}</Alert>);
		}

		if (isFetching) {
			return <Loading />;
		}

        return (
            <div>
                {newest.map((item, i) => (
                    <Post key={i} item={item} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state: State) => ({
	...state
});

export default withRouter(connect(mapStateToProps)(Newest) as React.ComponentType<any>);

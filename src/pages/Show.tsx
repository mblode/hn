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

class Show extends Component<Props & RouteProps, State> {
    componentDidMount() {
        let page = this.props.match.params.page;

        if (page === undefined) {
            page = 1;
        }

        this.props.dispatch(fetchPosts('show', page));
    }

    componentDidUpdate(prevProps) {
        let page = this.props.match.params.page;

        if (page === undefined) {
            page = 1;
        }

        if (this.props.location !== prevProps.location) {
            this.props.dispatch(fetchPosts('show', page));
        }
	}

    render() {
        const { error, isFetching, show } = this.props.posts;

        if (error) {
			return (<Alert type="danger">Error: {error}</Alert>);
		}

		if (isFetching) {
			return <Loading />;
		}

        return (
            <div>
                {show.map((item, i) => (
                    <Post key={i} item={item} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state: State) => ({
	...state
});

export default withRouter(connect(mapStateToProps)(Show) as React.ComponentType<any>);

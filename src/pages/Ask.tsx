import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchPosts } from '../actions/postsAction';
import Loading from '../components/Loading';
import Post from '../components/Post';
import Alert from '../components/Alert';

class Ask extends Component {
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
                {ask.map((item, i) => (
                    <Post key={i} item={item} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
	...state
});

export default withRouter(connect(mapStateToProps)(Ask));

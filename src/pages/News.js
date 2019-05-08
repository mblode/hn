import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchPosts } from '../actions/postsAction';
import Loading from '../components/Loading';
import ListItem from '../components/ListItem';
import Alert from '../components/Alert';

class News extends Component {
    componentDidMount() {
        let page = this.props.match.params.page;

        if (page === undefined) {
            page = 1;
        }

        this.props.dispatch(fetchPosts('news', page));
    }

    componentDidUpdate(prevProps) {
        let page = this.props.match.params.page;

        if (page === undefined) {
            page = 1;
        }

        this.props.dispatch(fetchPosts('show', page));
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
                    <ListItem key={i} item={item} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
	...state
});

export default withRouter(connect(mapStateToProps)(News));

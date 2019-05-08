import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchPosts } from '../actions/postsAction';
import styled from 'styled-components'
import Loading from '../components/Loading';
import ListItem from '../components/ListItem';
import Alert from '../components/Alert';

const ListWrap = styled.div`
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
`

class Show extends Component {
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
            this.props.dispatch(fetchPosts('news', page));
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
            <ListWrap>
                {show.map((item, i) => (
                    <ListItem key={i} item={item} />
                ))}
            </ListWrap>
        )
    }
}

const mapStateToProps = state => ({
	...state
});

export default withRouter(connect(mapStateToProps)(Show));

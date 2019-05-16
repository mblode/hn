import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchPosts } from '../actions/postsAction';
import styled from 'styled-components'
import Loading from '../components/Loading';
import ListItem from '../components/ListItem';
import Alert from '../components/Alert';
import Pagination from '../components/Pagination';

const ListWrap = styled.div`
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
`

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {page: this.props.match.params.page};

        if (this.state === undefined) {
            this.setState({
                page: 1
            });
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchPosts('news', this.state.page));
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.dispatch(fetchPosts('news', this.state.page));
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
            <Fragment>
                <Pagination page={this.state.page} />
                <ListWrap>
                    {news.map((item, i) => (
                        <ListItem key={i} item={item} />
                    ))}
                </ListWrap>
                <Pagination page={this.state.page} />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
	...state
});

export default withRouter(connect(mapStateToProps)(News));

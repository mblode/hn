import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPosts } from '../actions/postsAction'
import styled from 'styled-components'
import Loading from '../components/Loading'
import ListItem from '../components/ListItem'
import Alert from '../components/Alert'
import Pagination from '../components/Pagination'

const ListWrap = styled.div`
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid rgb(235, 236, 237);
`

class Jobs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1
        };
    }

    componentDidMount() {
        if (this.props.match.params.page !== undefined) {
            this.setState({
                page: this.props.match.params.page
            });

            this.props.dispatch(fetchPosts('jobs', this.props.match.params.page));
        } else {
            this.setState({
                page: 1
            });

            this.props.dispatch(fetchPosts('jobs', 1));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            if (this.props.match.params.page !== undefined) {
                this.setState({
                    page: this.props.match.params.page
                });

                this.props.dispatch(fetchPosts('jobs', this.props.match.params.page));
            } else {
                this.setState({
                    page: 1
                });

                this.props.dispatch(fetchPosts('jobs', 1));
            }
        }
    }

    render() {
        const { error, isFetching, jobs } = this.props.posts;

        if (error) {
            return (<Alert type="danger">Error: {error}</Alert>);
        }

        if (isFetching) {
            return <Loading />;
        }

        return (
            <ListWrap>
                {jobs.map((item, i) => (
                    <ListItem key={i} item={item} />
                ))}

                <Pagination type='jobs' page={this.state.page} />
            </ListWrap>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default withRouter(connect(mapStateToProps)(Jobs));

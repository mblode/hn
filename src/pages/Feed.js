import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchFeed } from '../actions/postsAction'
import PropTypes from "prop-types";
import styled from 'styled-components'
import Loading from '../components/Loading'
import ListItem from '../components/ListItem'
import Pagination from '../components/Pagination'
import { Alert, Heading } from 'pikcha-frame'

const ListWrap = styled.div`
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid rgb(235, 236, 237);

    @media (max-width: 768px) {
        border-left: none;
        border-right: none;
        border-radius: 0;
    }
`

const PageNumber = styled.div`
    padding: 20px 24px;
    text-transform: uppercase;
    text-align: center;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #e8e8e8;
`

class Feed extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            type: 'news',
            page: 1
        };
    }

    componentDidMount() {
        let type = 'news';
        let page = 1;

        if (this.props.match.params.type !== undefined) {
            type = this.props.match.params.type;
        }

        if (this.props.match.params.page !== undefined) {
            page = this.props.match.params.page;
        }

        this.setState({
            type,
            page
        });

        this.props.dispatch(fetchFeed(type, page));
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            let type = 'news';
            let page = 1;

            if (this.props.match.params.type !== undefined) {
                type = this.props.match.params.type;
            }

            if (this.props.match.params.page !== undefined) {
                page = this.props.match.params.page;
            }

            this.setState({
                type,
                page
            });

            this.props.dispatch(fetchFeed(type, page));
        }
    }

    render() {
        const { error, isFetching, feed } = this.props.posts;

        if (error) {
            return (<Alert kind="danger">Failed to load posts</Alert>);
        }

        if (isFetching) {
            return <Loading />;
        }

        return (
            <ListWrap>
                { this.state.page > 1 &&
                    <PageNumber>
                        <Heading as="h3" fontSize={2}>Page {this.state.page}</Heading>
                    </PageNumber>
                }

                {feed[this.state.type].map((item, i) => (
                    <ListItem key={i} item={item} />
                ))}

                <Pagination type={this.state.type} page={this.state.page} />
            </ListWrap>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default withRouter(connect(mapStateToProps)(Feed));

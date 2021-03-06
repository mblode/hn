import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchFeed } from '../actions/postsAction';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import ListItem from './ListItem';
import ScrollToTop from './ScrollToTop';
import { Loading, Pagination } from './Base';
import { Alert, Heading, get } from 'roni';

const ListWrap = styled.div`
    background-color: ${get('colors.white')};
    border-radius: ${get('radii.md')};
    box-shadow: ${get('shadows.md')};

    @media (max-width: 768px) {
        border-left: none;
        border-right: none;
        border-radius: 0;
    }
`;

const PageNumber = styled.div`
    padding: 20px 24px;
    text-transform: uppercase;
    text-align: center;
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid ${get('colors.gray.3')};
`;

const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

class Feed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: 'news',
            page: 1,
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
            page,
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
                page,
            });

            this.props.dispatch(fetchFeed(type, page));
        }
    }

    render() {
        const { error, isFetching, feed } = this.props.posts;

        if (error) {
            return <Alert kind='danger'>Failed to load posts</Alert>;
        }

        if (isFetching) {
            return <Loading />;
        }

        return (
            <Fragment>
                <Helmet>
                    <title>Hacker News &middot; {capitalize(this.state.type)}</title>
                </Helmet>

                <ScrollToTop />

                <ListWrap>
                    {this.state.page > 1 && (
                        <PageNumber>
                            <Heading as='h3' fontSize={2}>
                                Page {this.state.page}
                            </Heading>
                        </PageNumber>
                    )}

                    {feed[this.state.type].map((item, i) => (
                        <ListItem key={i} item={item} />
                    ))}

                    <Pagination type={this.state.type} page={this.state.page} />
                </ListWrap>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state,
});

export default withRouter(connect(mapStateToProps)(Feed));

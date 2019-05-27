import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchUser } from '../actions/postsAction';
import styled from 'styled-components'
import Loading from '../components/Loading';
import { Alert } from 'pikcha-frame'
import { Helmet } from 'react-helmet'
import { Content } from './Base'

const PageWrap = styled.div`
    background-color: #fff;
    border-radius: 6px;
    padding: 24px 24px;
    border: 1px solid rgb(235, 236, 237);

    @media (max-width: 768px) {
        padding: 24px 16px;
        border-left: none;
        border-right: none;
        border-radius: 0;
    }
`

const PageTitle = styled.div`
    display: block;
    padding-bottom: 12px;
    margin-bottom: 16px;
    border-bottom: 1px solid #e8e8e8;
`

const UserName = styled.div`
    font-size: 22px;
    line-height: 1.3;
    display: block;
    width: 100%;
    color: #212529;
    text-decoration: none;
    margin-bottom: 8px;
`

const Details = styled.p`
    color: #67717a;
    margin-bottom: 6px;
`

class User extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(fetchUser(id));
    }

    render() {
        const { error, isFetching, user } = this.props.posts;

        if (error) {
            return (<Alert kind="danger">Error: {error}</Alert>);
        }

        if (isFetching) {
            return <Loading />;
        }

        return (
            <Fragment>
                <Helmet>
                    <title>Hacker News &middot; {`${user.id}`}</title>
                </Helmet>

                <PageWrap>
                    <PageTitle>
                        <UserName>{user.id}</UserName>

                        <Details>Created: {user.created}</Details>
                        <Details>Karma: {user.karma}</Details>
                    </PageTitle>

                    <Content
                        dangerouslySetInnerHTML={{ __html: user.about }}
                    />
                </PageWrap>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default withRouter(connect(mapStateToProps)(User));

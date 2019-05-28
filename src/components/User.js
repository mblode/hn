import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchUser } from '../actions/postsAction';
import styled from 'styled-components'
import Loading from './Base/Loading';
import { Alert, get } from 'pikcha-frame'
import { Helmet } from 'react-helmet'
import { Content, Wrap } from './Base'

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
    color: ${get('colors.gray.6')};
    text-decoration: none;
    margin-bottom: 8px;
`

const Details = styled.p`
    color: ${get('colors.gray.5')};
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

                <Wrap>
                    <PageTitle>
                        <UserName>{user.id}</UserName>

                        <Details>Created: {user.created}</Details>
                        <Details>Karma: {user.karma}</Details>
                    </PageTitle>

                    <Content
                        dangerouslySetInnerHTML={{ __html: user.about }}
                    />
                </Wrap>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default withRouter(connect(mapStateToProps)(User));

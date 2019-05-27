import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchComments } from '../actions/postsAction';
import styled from 'styled-components'
import parseDomain from 'parse-domain';
import Loading from '../components/Loading';
import CommentItem from '../components/CommentItem';
import { Alert, Heading } from 'pikcha-frame'
import { Dot, User, Time, ListUrl, Content } from '../components/Base'
import { Helmet } from 'react-helmet'

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
    margin-bottom: 16px;
    border-bottom: 1px solid #e8e8e8;
`

const ListTitle = styled.a`
    font-size: 22px;
    line-height: 1.3;
    display: block;
    width: 100%;
    color: #212529;
    text-decoration: none;
    padding-bottom: 4px;

    :hover {
        text-decoration: none;
        color: #212529;
    }
`

const ListTitleInner = styled.span`
    margin-right: 4px;
`

const CommentList = styled.ul`
    padding: 0;
    margin: 0;
`

const ListInfo = styled.div`
    display: block;
    width: 100%;
    padding-bottom: 6px;
`

class Item extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(fetchComments(id));
    }

    parse(url) {
        let link = parseDomain(url)

        if (link != null) {
            return "(" + link.domain + "." + link.tld + ")";
        } else {
            return "";
        }
    }

    render() {
        const { error, isFetching, data } = this.props.posts;

        if (error) {
            return (<Alert kind="danger">Error: {error}</Alert>);
        }

        if (isFetching) {
            return <Loading />;
        }

        let title = (
            <ListTitle href={data.url} target="_blank" rel="noopener noreferrer">
                <ListTitleInner>{data.title}</ListTitleInner>
                <ListUrl>{this.parse(data.url)}</ListUrl>
            </ListTitle>
        )

        const commentLoop = data.comments.map(ele => {
            return (
                <CommentItem
                    user={ele.user}
                    timeAgo={ele.time_ago}
                    content={ele.content}
                    key={ele.id}
                    level={ele.level}
                    id={ele.id}
                    comments={ele.comments}
                    postUser={data.user}
                />
            );
        })

        return (
            <Fragment>
                <Helmet>
                    <title>Hacker News &middot; {`${data.title}`}</title>
                </Helmet>

                <PageWrap>
                    <PageTitle>
                        <ListInfo>
                            {data.user && (
                                <span>
                                    <User
                                        href={`/user/${data.user}/`}
                                        to={`/user/${data.user}`}
                                    >
                                        {data.user}
                                    </User>

                                    <Dot>•</Dot>
                                </span>
                            )}

                            <Time>{data.time_ago}</Time>
                        </ListInfo>

                        { title }

                        <Content
                            dangerouslySetInnerHTML={{ __html: data.content }}
                        />
                    </PageTitle>

                    <Heading as="h5" fontSize={2} mb={1} fontWeight={400}>{data.comments_count} comment{data.comments_count !== 1 ? "s" : ""}</Heading>

                    <CommentList>
                        { commentLoop }
                    </CommentList>
                </PageWrap>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default withRouter(connect(mapStateToProps)(Item));

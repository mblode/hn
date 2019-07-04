import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchComments } from '../actions/postsAction';
import styled from 'styled-components'
import parseDomain from 'parse-domain';
import Loading from './Base/Loading';
import CommentItem from '../components/CommentItem';
import { Alert, get } from 'pikcha-frame'
import { Dot, UserName, Time, ListUrl, Content, Wrap } from '../components/Base'
import { Helmet } from 'react-helmet'

const PageTitle = styled.div`
    display: block;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${get('colors.gray.3')};
`

const CommentHeading = styled.div`
    font-size: 16px;
    margin-bottom: 20px;
`

const ListTitle = styled.a`
    font-size: 22px;
    line-height: 1.3;
    display: block;
    width: 100%;
    color: ${get('colors.gray.7')};
    text-decoration: none;
    padding-bottom: 8px;
    transition: color 0.15s ease-in-out;

    :hover {
        text-decoration: none;
        color: ${get('colors.gray.8')};
    }

    :active {
        text-decoration: none;
        color: ${get('colors.gray.8')};
    }
`

const ListTitleInner = styled.span`
    margin-right: 4px;
    word-wrap: break-word;
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

                <Wrap>
                    <PageTitle>
                        <ListInfo>
                            {data.user && (
                                <span>
                                    <UserName
                                        href={`/user/${data.user}/`}
                                        to={`/user/${data.user}`}
                                    >
                                        {data.user}
                                    </UserName>

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

                    <CommentHeading>{data.comments_count} comment{data.comments_count !== 1 ? "s" : ""}</CommentHeading>

                    <CommentList>
                        { commentLoop }
                    </CommentList>
                </Wrap>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default withRouter(connect(mapStateToProps)(Item));

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchComments } from '../actions/postsAction';
import styled from 'styled-components'
import parseDomain from 'parse-domain';
import Loading from '../components/Loading';
import CommentItem from '../components/CommentItem';
import { Alert, Heading } from 'pikcha-frame'

const PageWrap = styled.div`
    background-color: #fff;
    border-radius: 6px;
    padding: 30px 24px;
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

    :hover {
        text-decoration: none;
        color: #212529;
    }
`

const ListUrl = styled.span`
    font-size: 16px;
    color: #67717a;
    margin-left: 4px;
    width: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
`

const CommentList = styled.ul`
    padding: 0;
    margin: 0;
`

const ListInfo = styled.div`
    display: block;
    width: 100%;
    color: #67717a;
    font-size: 14px;
    padding-bottom: 8px;
`

const Dot = styled.span`
    color: #67717a;
    padding: 0 6px;
    opacity: 0.7;
`

const Time = styled.span`
    margin-right: 4px;
`

const User = styled.a`
    color: #67717a;
    text-decoration: none;
    padding-top: 4px;
    padding-bottom: 4px;

    :hover {
        color: #545e6e;
        text-decoration: underline;
    }
`;

const Content = styled.div`
    margin-right: 4px;
    margin-top: 1rem;

    p {
        margin-bottom: 10px;
    }

    a {
        color: #212529;
        text-decoration: underline;
        word-wrap: break-word;
        word-break: break-all;
    }
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
                {data.title}
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
                />
            );
        })

        return (
            <PageWrap>
                <PageTitle>
                    <ListInfo>
                        {data.user && (
                            <span>
                                <User
                                    href={`https://news.ycombinator.com/user?id=${data.user}`}
                                    target="_blank" rel="noopener noreferrer"
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
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default withRouter(connect(mapStateToProps)(Item));

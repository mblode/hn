import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchComments } from '../actions/postsAction';
import styled from 'styled-components'
import parseDomain from 'parse-domain';
import Loading from '../components/Loading';
import CommentItem from '../components/CommentItem';
import Alert from '../components/Alert';

const PageWrap = styled.div`
    background-color: #fff;
    border-radius: 4px;
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
    padding-bottom: 8px;
    margin-bottom: 16px;
    border-bottom: 1px solid #e8e8e8;
`

const ListTitle = styled.a`
    font-size: 22px;
    font-weight: 500;
    line-height: 1.5;
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
    font-weight: 400;
    color: #828b98;
    margin-left: 4px;
    width: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
`

const CommentTitle = styled.div`
    display: inline-block;
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 0.5rem;
`

const CommentList = styled.ul`
    padding: 0;
    margin: 0;
`

const ListInfo = styled.div`
    display: block;
    width: 100%;
    font-size: 14px;
    margin-top: 4px;
`

const Time = styled.span`
    margin-right: 4px;
`

const User = styled.a`
    color: #3e4551;
    text-decoration: underline;

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
            return (<Alert type="danger">Error: {error}</Alert>);
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
                    { title }

                    <ListInfo>
                        <Time>{data.time_ago} from</Time>

                        {data.user && (
                            <User
                                href={`https://news.ycombinator.com/user?id=${data.user}`}
                                target="_blank" rel="noopener noreferrer"
                            >
                                {data.user}
                            </User>
                        )}
                    </ListInfo>

                    <Content
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                </PageTitle>

                <CommentTitle>{data.comments_count} comments</CommentTitle>

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

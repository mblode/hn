import React, { Component } from 'react';
import styled from 'styled-components';

const CommentList = styled.ul`
    padding: 0;
    margin: 0;
    border-left: 3px solid #eceef1;
    padding-left: 20px;
`

const CommentWrap = styled.li`
    list-style: none;
    padding: 0;
    margin: 0;

    &.hidden ul {
        display: none;
    }
`

const Comment = styled.div`
    display: flex;
    flex-wrap: wrap;
    text-decoration: none;
    border-bottom: 1px solid #e8e8e8;
    margin-top: 16px;

    :hover {
        text-decoration: none;
    }
`

const Toggle = styled.div`
    display: block;
    width: 100%;
    padding: 6px;
    margin: -6px;
    margin-bottom: 10px;

    :hover {
        background-color: #f8f8fa;
    }

    &.toggled {
        background-color: #f0f1f4;
        opacity: 0.5;
    }

    &.toggled:hover {
        background-color: #f0f1f4;
    }
`

const Time = styled.span`
    margin-left: 4px;
    font-size: 12px;
    color: #3e4551;
`

const User = styled.a`
    color: #3e4551;
    text-decoration: underline;
    font-size: 14px;

    :hover {
        color: #545e6e;
        text-decoration: underline;
    }
`;

const Content = styled.div`
    margin-right: 4px;

    p {
        margin-bottom: 10px;
    }

    a {
        color: #212529;
        text-decoration: underline;
    }
`

export default class CommentItem extends Component {
    constructor() {
        super()
        this.state = {
            hidden: false
        }
    }

    toggleHidden() {
        this.setState({
            hidden: !this.state.hidden
        })
    }

    render() {
        const { user, timeAgo, content, level, comments } = this.props;
        const { hidden } = this.state;

        let commentLoop = null;

        if (comments !== undefined) {
            commentLoop = (
                comments.map(ele => {
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
            )
        }

        return (
            <CommentWrap className={hidden ? "hidden" : ""}>
                <Comment level={level}>
                    <Toggle onClick={this.toggleHidden.bind(this)} className={hidden ? "toggled" : ""}>
                        <User
                            href={`https://news.ycombinator.com/user?id=${user}`}
                            target="_blank" rel="noopener noreferrer"
                        >
                            {user},
                        </User>
                        <Time>
                            {timeAgo}
                        </Time>
                    </Toggle>

                    {
                        !hidden &&
                        <Content
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    }
                </Comment>

                <CommentList>
                    { commentLoop }
                </CommentList>
            </CommentWrap>
        )
    }
}

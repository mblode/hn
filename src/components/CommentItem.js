import React, { Component } from 'react';
import styled from 'styled-components';
import { get } from 'pikcha-frame'
import { Dot, UserName, Time, Content } from './Base'

const CommentList = styled.ul`
    padding: 0;
    margin: 0;
    border-left: 3px solid ${get('colors.gray.2')};
    padding-left: 20px;
    margin-top: 24px;

    li {
        padding-top: 0;
        padding-right: 0;
        border-top: none;
    }
`

const CommentWrap = styled.li`
    list-style: none;
    padding-top: 24px;
    padding-bottom: 24px;
    border-top: 1px solid ${get('colors.gray.3')};
    position: relative;

    &.toggled ul {
        display: none;
    }

    :first-child {
        border-top: none;
        padding-top: 0;
    }

    :last-child {
        padding-bottom: 0;
    }
`

const Comment = styled.div`
    display: block;
    text-decoration: none;
    padding: 12px;
    padding-top: 6px;
    margin: -12px;
    padding-bottom: 8px;

    &.toggled {
        padding-top: 0;
        padding-bottom: 0;
    }

    :hover {
        text-decoration: none;
    }
`

const Toggle = styled.header`
    display: block;
    margin: -6px;
    padding: 6px;
    margin-bottom: 6px;
    width: calc(100% + 12px);
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    :hover {
        background-color: ${get('colors.gray.1')};
    }

    &.toggled {
        background-color: ${get('colors.gray.1')};
        opacity: 0.5;
        margin-bottom: 0;
    }

    &.toggled:hover {
        background-color: ${get('colors.gray.1')};
    }
`

export default class CommentItem extends Component {
    constructor() {
        super()
        this.state = {
            hidden: false
        }
    }

    toggleHidden(e) {
        this.setState({
            hidden: !this.state.hidden
        })
        e.stopPropagation();
    }

    render() {
        const { user, timeAgo, content, level, comments, postUser } = this.props;
        const { hidden } = this.state;

        let commentLoop = null;

        if (comments.length > 0) {
            commentLoop = (
                <CommentList>
                    {comments.map(ele => {
                        return (
                            <CommentItem
                                user={ele.user}
                                timeAgo={ele.time_ago}
                                content={ele.content}
                                key={ele.id}
                                level={ele.level}
                                id={ele.id}
                                comments={ele.comments}
                                postUser={postUser}
                            />
                        );
                    })}
                </CommentList>
            )
        }

        return (
            <CommentWrap className={hidden ? "toggled" : ""}>
                <Comment level={level} className={hidden ? "toggled" : ""}>
                    <Toggle onClick={this.toggleHidden.bind(this)} className={hidden ? "toggled" : ""} onMouseDown={(e) => e.preventDefault()}>
                        <UserName
                            href={`/user/${user}/`}
                            to={`/user/${user}`}
                            parent={user === postUser ? 1 : 0}
                        >
                            {user}
                        </UserName>
                        <Dot>•</Dot>
                        <Time>{timeAgo}</Time>
                    </Toggle>

                    {
                        !hidden &&
                        <Content
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    }
                </Comment>

                {commentLoop}
            </CommentWrap>
        )
    }
}

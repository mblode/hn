import React, { Component } from 'react';
import styled from 'styled-components';
import { Dot, User, Time, Content } from './Base'

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
    padding-top: 16px;

    :hover {
        text-decoration: none;
    }
`

const Toggle = styled.div`
    display: block;
    width: 100%;
    padding: 6px;
    margin: -6px;
    margin-bottom: 6px;
    cursor: pointer;

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
                            postUser={postUser}
                        />
                    );
                })
            )
        }

        return (
            <CommentWrap className={hidden ? "hidden" : ""}>
                <Comment level={level}>
                    <Toggle onClick={this.toggleHidden.bind(this)} className={hidden ? "toggled" : ""} onMouseDown={(e) => e.preventDefault()}>
                        <User
                            href={`/user/${user}/`}
                            to={`/user/${user}`}
                            parent={user === postUser ? 1 : 0}
                        >
                            {user}
                        </User>
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

                <CommentList>
                    { commentLoop }
                </CommentList>
            </CommentWrap>
        )
    }
}

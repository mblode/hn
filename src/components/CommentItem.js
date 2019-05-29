import React, { Component } from 'react';
import styled from 'styled-components';
import { get } from 'pikcha-frame'
import { Dot, UserName, Time, Content } from './Base'

const CommentList = styled.ul`
    padding: 0;
    margin: 0;
    border-left: 3px solid ${get('colors.gray.2')};
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
    border-bottom: 1px solid ${get('colors.gray.3')};
    padding-top: 12px;

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
    transition: background-color 0.15s ease-in-out;

    :hover {
        background-color: ${get('colors.gray.0')};
    }

    :active {
        background-color: ${get('colors.gray.1')};
    }

    &.toggled {
        background-color: ${get('colors.gray.1')};
        opacity: 0.5;
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

                <CommentList>
                    { commentLoop }
                </CommentList>
            </CommentWrap>
        )
    }
}

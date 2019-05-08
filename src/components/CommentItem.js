import React, { Component } from 'react';
import styled from 'styled-components';

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
        background-color: #f9f9f9;
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
`

export default class CommentItem extends Component {
    constructor() {
        super()
        this.state = {
            isHidden: false
        }
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render() {
        const { user, time_ago, content } = this.props.item;

        return (
            <Comment>
                <Toggle onClick={this.toggleHidden.bind(this)}>
                    <User
                        href={`https://news.ycombinator.com/user?id=${user}`}
                        target="_blank" rel="noopener noreferrer"
                    >
                        {user},
                    </User>
                    <Time>
                        {time_ago}
                    </Time>
                </Toggle>

                {
                    !this.state.isHidden &&
                    <Content
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                }
            </Comment>
        )
    }
}

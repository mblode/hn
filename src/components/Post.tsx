import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostWrap = styled.div`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;
`

export default class Post extends Component {
    render() {
        const { comments_count, id, points, time_ago, title, url, user } = this.props.item;

        if (url) {

        }

        return (
            <PostWrap>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <h3>{title}</h3>

                    <div className="post-info">
                        {user} &middot; {time_ago}
                    </div>

                    <div>{url}</div>
                </a>

                <Link
                    to={`/item/${id}`}
                >
                    {comments_count} &middot; {points}
                </Link>
            </PostWrap>
        )
    }
}

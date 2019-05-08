import * as React from 'react';
import { withRouter, RouteProps, Link } from 'react-router-dom';
import styled from 'styled-components';

const PostWrap = styled.div`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;
`

interface Props {
    commentsCount?: string,
    id?: string,
    points?: string,
    timeAgo?: string,
    title?: string,
    url?: string,
    user?: string
}

interface State {
}

class Post extends React.Component<Props & RouteProps, State> {
    render() {
        const { commentsCount, id, points, timeAgo, title, url, user } = this.props;

        if (url) {

        }

        return (
            <PostWrap>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    <h3>{title}</h3>

                    <div className="post-info">
                        {user} &middot; {timeAgo}
                    </div>

                    <div>{url}</div>
                </a>

                <Link
                    to={`/item/${id}`}
                >
                    {commentsCount} &middot; {points}
                </Link>
            </PostWrap>
        )
    }
}

export default withRouter(Post as React.ComponentType<any>);

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const List = styled.div`
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #e8e8e8;
    padding: 20px 45px;
    display: flex;
    flex-wrap: wrap;
    text-decoration: none;

    :hover {
        text-decoration: none;
    }
`

const ListTitle = styled.a`
    font-size: 16px;
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

    :visited {
        color: #828b98;
    }
`

const ListInfo = styled.div`
    display: block;
    width: 100%;
    font-size: 12px;
    margin-top: 4px;
`

const Dot = styled.span`
    color: #3e4551;
    padding: 0 6px;
    opacity: 0.7;
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

const StyledLink = styled(Link)`
    color: #3e4551;
    text-decoration: underline;

    :hover {
        color: #545e6e;
        text-decoration: underline;
    }
`;

export default class ListItem extends Component {
    render() {
        const { comments_count, id, points, time_ago, title, url, user } = this.props.item;

        return (
            <List>
                <ListTitle href={url} target="_blank" rel="noopener noreferrer">
                    {title}
                </ListTitle>

                <ListInfo>
                    <StyledLink
                        href={`/item/${id}/`}
                        to={`/item/${id}`}
                    >
                        {comments_count} comments
                    </StyledLink>

                    <Dot>•</Dot>

                    {points !== null && `${points} points`}

                    <Dot>•</Dot>

                    <Time>{time_ago} from</Time>

                    {user && (
                        <User
                            href={`https://news.ycombinator.com/user?id=${user}`}
                            target="_blank" rel="noopener noreferrer"
                        >
                            {user}
                        </User>
                    )}

                </ListInfo>
            </List>
        )
    }
}

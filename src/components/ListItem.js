import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import parseDomain from 'parse-domain';

const List = styled.div`
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #e8e8e8;
    padding: 20px 24px;
    display: flex;
    flex-wrap: wrap;
    text-decoration: none;

    @media (max-width: 768px) {
        padding: 16px 16px;
    }

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

const ListTitleAlt = styled(Link)`
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

const ListUrl = styled.span`
    font-size: 14px;
    font-weight: 400;
    color: #828b98;
    margin-left: 4px;
    width: 50px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
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
    parse(url) {
        let link = parseDomain(url)

        if (link != null) {
            return "(" + link.domain + "." + link.tld + ")";
        } else {
            return "";
        }
    }

    render() {
        const { comments_count, id, points, time_ago, title, url, user } = this.props.item;

        let linkTitle = (
            <ListTitle href={url} target="_blank" rel="noopener noreferrer">
                {title}
                <ListUrl>{this.parse(url)}</ListUrl>
            </ListTitle>
        );

        if (url.includes("item?")) {
            linkTitle = (
                <ListTitleAlt href={`/item/${id}/`} to={`/item/${id}`}>
                    {title}
                    <ListUrl>{this.parse(url)}</ListUrl>
                </ListTitleAlt>
            );
        }

        return (
            <List>
                {linkTitle}

                <ListInfo>
                    <StyledLink
                        href={`/item/${id}/`}
                        to={`/item/${id}`}
                    >
                        {comments_count} comments
                    </StyledLink>

                    <Dot>•</Dot>

                    {points &&
                        <span>
                            <span>{points} points</span>

                            <Dot>•</Dot>
                        </span>
                    }

                    <Time>{time_ago}</Time>

                    {user && (
                        <span>
                            <Time>from</Time>
                            <User
                                href={`https://news.ycombinator.com/user?id=${user}`}
                                target="_blank" rel="noopener noreferrer"
                            >
                                {user}
                            </User>
                        </span>
                    )}

                </ListInfo>
            </List>
        )
    }
}

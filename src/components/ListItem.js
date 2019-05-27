import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import parseDomain from 'parse-domain';
import { Dot, User, Time, ListUrl } from './Base'
import { MessageCircle, ThumbsUp } from 'react-feather'

const List = styled.div`
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid #e8e8e8;
    padding: 16px 24px 8px;
    display: flex;
    flex-wrap: wrap;
    text-decoration: none;

    @media (max-width: 768px) {
        padding: 16px 16px 8px;
    }

    :hover {
        text-decoration: none;
    }
`

const ListTitleWrap = styled.span`
    font-size: 16px;
    line-height: 1.3;
    font-weight: 500;
    display: block;
    width: 100%;
    padding-top: 6px;
    padding-bottom: 4px;
    color: #212529;
    text-decoration: none;

    :hover {
        text-decoration: none;
        color: #212529;
    }
`

const ListTitle = styled.a`
    color: #212529;
    display: block;

    :hover {
        text-decoration: none;
        color: #212529 !important;
    }

    :visited {
        color: #67717a;
    }
`

const ListTitleInner = styled.span`
    margin-right: 4px;
`

const ListTitleAlt = styled(Link)`
    color: #212529;

    :hover {
        text-decoration: none;
        color: #212529 !important;
    }

    :visited {
        color: #67717a;
    }
`

const ListInfo = styled.div`
    display: block;
    width: 100%;
`

const StyledLink = styled(Link)`
    color: #67717a;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    padding-right: 16px;

    :hover {
        color: #545e6e;
        text-decoration: underline;
    }
`;

const ThumbsUpIcon = styled(ThumbsUp)`
    width: 20px;
    height: 20px;
    stroke: #67717a;
    padding-right: 4px;
`;

const MessageCircleIcon = styled(MessageCircle)`
    width: 20px;
    height: 20px;
    stroke: #67717a;
    padding-right: 4px;
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
                <ListTitleInner>{title}</ListTitleInner>
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
                <ListInfo>
                    {user && (
                        <span>
                            <User
                                href={`/user/${user}/`}
                                to={`/user/${user}`}
                            >
                                {user}
                            </User>

                            <Dot>•</Dot>
                        </span>
                    )}

                    <Time>{time_ago}</Time>
                </ListInfo>

                <ListTitleWrap>
                    {linkTitle}
                </ListTitleWrap>

                <ListInfo>
                    <StyledLink
                        href={`/item/${id}/`}
                        to={`/item/${id}`}
                    >
                        <MessageCircleIcon />

                        <span>{comments_count}</span>
                    </StyledLink>

                    {points &&
                        <StyledLink
                            href={`/item/${id}/`}
                            to={`/item/${id}`}
                        >
                            <ThumbsUpIcon />

                            <span>{points}</span>
                        </StyledLink>
                    }

                </ListInfo>
            </List>
        )
    }
}

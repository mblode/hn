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
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    flex-wrap: wrap;
    text-decoration: none;

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
    padding-top: 6px;
    padding-bottom: 4px;

    :hover {
        text-decoration: none;
        color: #212529 !important;
    }

    :visited {
        color: #67717a;
    }
`

const ListTitleAlt = styled(Link)`
    color: #212529;
    display: block;
    padding-top: 6px;
    padding-bottom: 4px;

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

const ListInfo = styled.div`
    display: block;
    width: 100%;
`

const CommentLink = styled(Link)`
    color: #67717a;
    display: block;
    width: 100%;
    padding-top: 4px;
    padding-bottom: 12px;
    text-decoration: none;

    :hover {
        color: #545e6e;
        text-decoration: underline;
    }
`

const CommentItem = styled.span`
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    padding-right: 16px;
`;

const ThumbsUpIcon = styled(ThumbsUp)`
    width: 20px;
    height: 20px;
    padding-right: 4px;
`;

const MessageCircleIcon = styled(MessageCircle)`
    width: 20px;
    height: 20px;
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
                    <ListTitleInner>{title}</ListTitleInner>
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
                                pt={16}
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

                <CommentLink
                    href={`/item/${id}/`}
                    to={`/item/${id}`}
                >
                    <CommentItem>
                        <MessageCircleIcon />
                        <span>{comments_count}</span>
                    </CommentItem>

                    {points &&
                        <CommentItem>
                            <ThumbsUpIcon />
                            <span>{points}</span>
                        </CommentItem>
                    }

                </CommentLink>
            </List>
        )
    }
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import parseDomain from 'parse-domain';
import { Dot, UserName, Time, ListUrl } from './Base'
import { get } from 'pikcha-frame'
import { Like, Comment } from 'styled-icons/boxicons-regular'

const List = styled.div`
    overflow: hidden;
    position: relative;
    border-bottom: 1px solid ${get('colors.gray.3')};
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
    color: ${get('colors.gray.6')};
    text-decoration: none;
    transition: color 0.15s ease-in-out;

    :hover {
        text-decoration: none;
        color: ${get('colors.gray.7')};
    }

    :active {
        text-decoration: none;
        color: ${get('colors.gray.8')};
    }
`

const ListTitle = styled.a`
    color: ${get('colors.gray.7')};
    display: block;
    padding-top: 6px;
    padding-bottom: 2px;
    transition: color 0.15s ease-in-out;

    :hover {
        text-decoration: none;
        color: ${get('colors.gray.8')};
    }

    :active {
        text-decoration: none;
        color: ${get('colors.gray.8')};
    }

    :visited {
        color: ${get('colors.gray.5')};
    }
`

const ListTitleAlt = styled(Link)`
    color: ${get('colors.gray.7')};
    display: block;
    padding-top: 6px;
    padding-bottom: 2px;
    transition: color 0.15s ease-in-out;

    :hover {
        text-decoration: none;
        color: ${get('colors.gray.8')};
    }

    :active {
        text-decoration: none;
        color: ${get('colors.gray.8')};
    }

    :visited {
        color: ${get('colors.gray.5')};
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
    color: ${get('colors.gray.5')};
    display: block;
    padding-top: 4px;
    padding-bottom: 12px;
    text-decoration: none;
    border-radius: ${get('radii.1')}px;
    transition: color 0.15s ease-in-out;

    :hover span {
        text-decoration: underline;
        color: ${get('colors.gray.6')};
    }

    :active {
        text-decoration: underline;
        color: ${get('colors.gray.7')};
    }
`

const CommentItem = styled.span`
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    padding-right: 16px;
`;

const PointsIcon = styled(Like)`
    width: 20px;
    height: 20px;
    padding-right: 4px;
`;

const CommentsIcon = styled(Comment)`
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
                <ListTitleAlt to={`/item/${id}`}>
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
                            <UserName
                                href={`/user/${user}/`}
                                to={`/user/${user}`}
                                pt={16}
                            >
                                {user}
                            </UserName>

                            <Dot>•</Dot>
                        </span>
                    )}

                    <Time pt={16}>{time_ago}</Time>
                </ListInfo>

                <ListTitleWrap>
                    {linkTitle}
                </ListTitleWrap>

                <CommentLink
                    href={`/item/${id}/`}
                    to={`/item/${id}`}
                >
                    {points &&
                        <CommentItem>
                            <PointsIcon />
                            <span>{points}</span>
                        </CommentItem>
                    }

                    <CommentItem>
                        <CommentsIcon />
                        <span>{comments_count}</span>
                    </CommentItem>
                </CommentLink>
            </List>
        )
    }
}

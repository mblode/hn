import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import parseDomain from 'parse-domain';

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
    text-decoration: none;
    padding-top: 8px;
    padding-bottom: 4px;
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

const ListUrl = styled.span`
    font-size: 14px;
    color: #67717a;
    margin-left: 4px;
    width: 50px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;

    &:hover {
        text-decoration: underline;
    }
`

const ListInfo = styled.div`
    display: block;
    color: #67717a;
    width: 100%;
    font-size: 14px;
`

const Dot = styled.span`
    color: #67717a;
    padding: 0 6px;
    opacity: 0.7;
`

const Time = styled.span`
    margin-right: 4px;
`

const User = styled.a`
    color: #67717a;
    text-decoration: none;
    padding-top: 4px;
    padding-bottom: 4px;

    :hover {
        color: #545e6e;
        text-decoration: underline;
    }
`;

const StyledLink = styled(Link)`
    color: #67717a;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    padding-right: 12px;

    :hover {
        color: #545e6e;
        text-decoration: underline;
    }
`;

const ListSvg = styled.svg`
    color: #67717a;
    width: 24px;
    height: 24px;
    fill: #67717a;
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
                <ListInfo>
                    {user && (
                        <span>
                            <User
                                href={`https://news.ycombinator.com/user?id=${user}`}
                                target="_blank" rel="noopener noreferrer"
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
                        <ListSvg fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414" xmlns="http://www.w3.org/2000/svg" ariaLabelledby="title" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" id="message-simple"><title id="title">message-simple</title><g><path d="M20.7414 11.5229C20.96 10.656 21.0005 9.5794 21 8C21.0005 6.4206 20.96 5.344 20.7414 4.47706C20.57 3.68581 20.4733 3.46948 19.9904 3.15288C19.5963 2.85234 18.8701 2.53297 17.4397 2.31262C15.9734 2.08387 14.0894 1.99947 11.5 2C8.91059 1.99947 7.02664 2.08387 5.56035 2.31262C4.12987 2.53297 3.40373 2.85234 3.00961 3.15288C2.52669 3.46948 2.42997 3.68581 2.25863 4.47706C2.03999 5.344 1.99948 6.4206 2 8C2 10.2512 2.13638 11.4423 2.47725 12.174C2.70449 12.6618 3.09917 13.122 4.48824 13.4746C5.33561 13.6897 6 14.4583 6 15.418V16.263L8.90618 14.3255C9.16948 14.1773 9.74784 14.007 10.0507 13.9891C10.5134 13.9965 10.9908 14 11.5 14C14.0894 14.0005 15.9734 13.9161 17.4397 13.6874C18.8701 13.467 19.5963 13.1477 19.9904 12.8471C20.4733 12.5305 20.57 12.3142 20.7414 11.5229ZM23 8C23 14.5 22.0417 16 11.5 16C10.9835 16 10.4899 15.9964 10.0184 15.9888C10.0174 15.9888 10.0164 15.9891 10.0156 15.9896L5.55469 18.9636C4.89014 19.4066 4 18.9302 4 18.1315V15.418C4 15.4157 3.99836 15.4137 3.99614 15.4131C0.43941 14.5103 0 12.4014 0 8C0 1.5 0.958344 0 11.5 0C22.0417 0 23 1.5 23 8Z" transform="translate(5 7)"></path></g></ListSvg>

                        <span>{comments_count}</span>
                    </StyledLink>

                    {points &&
                        <StyledLink
                            href={`/item/${id}/`}
                            to={`/item/${id}`}
                        >
                            <ListSvg fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414" xmlns="http://www.w3.org/2000/svg" ariaLabelledby="title" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" id="thumbsup"><title id="title">thumbsup</title><g><path fillRule="evenodd" clipRule="evenodd" d="M7.11609 6.25327C7.30603 6.91034 7.75196 7.56741 8.73756 8.22448C7.67788 8.22448 6.74923 8.24963 5.9474 8.33187C2.58744 8.6765 1.45411 10.0237 2.23758 14.7245C3.02066 19.423 4.53964 19.2648 8.86905 18.8137C9.14666 18.7848 9.43631 18.7546 9.73758 18.7245C12.8823 18.41 14.7376 18.2245 14.7376 14.2245C14.7376 12.5811 14.6536 11.2445 14.3536 10.2245C14.2542 9.8866 14.1311 9.58344 13.9794 9.31537C13.6845 8.79387 13.2817 8.40512 12.7356 8.15169L13.5775 6.33754C14.3267 6.68523 14.9003 7.17426 15.3369 7.74823C15.5731 7.31245 15.9303 6.89419 16.4732 6.60115C17.1608 6.23008 17.8831 6.22448 18.2376 6.22448C18.5921 6.22448 19.3143 6.23008 20.0019 6.60115C20.8289 7.04747 21.2248 7.78428 21.4188 8.43103C21.5624 8.9347 21.6562 9.65668 21.6942 10.4126C21.7289 11.1359 21.7375 12.0698 21.7376 13.2245C21.7375 14.3791 21.7289 15.3131 21.6942 16.0364C21.6562 16.7923 21.5624 17.5143 21.4188 18.0179C21.2248 18.6647 20.8289 19.4015 20.0019 19.8478C19.3143 20.2189 18.5921 20.2245 18.2376 20.2245C17.8831 20.2245 17.1608 20.2189 16.4732 19.8478C15.9618 19.5718 15.6152 19.1846 15.3793 18.7764C15.1401 19.0456 14.8636 19.2903 14.5454 19.5077C13.2538 20.3905 11.5302 20.5588 10.1881 20.6898C10.1027 20.6981 10.0187 20.7063 9.93658 20.7146C9.65345 20.7428 9.37742 20.7715 9.10868 20.7994L9.10752 20.7996C8.20887 20.8929 7.39167 20.9778 6.66298 21.0115C5.71916 21.0538 4.67884 21.0247 3.71167 20.6554C1.45262 19.7929 0.687679 17.5907 0.264782 15.0533C-0.218098 12.156 -0.211308 9.44247 1.7682 7.76513C2.69259 6.98185 3.83361 6.62916 4.94181 6.44761C5.00189 6.43799 5.06274 6.42876 5.12437 6.41988C5.03077 5.97543 4.9896 5.55387 4.98756 5.22448C4.98756 2.89168 6.35162 1.49043 7.55798 0.609369C8.09816 0.21485 8.81247 -0.0717593 9.62532 0.0158339C10.4377 0.103374 11.0536 0.533314 11.4523 1.00362C12.1947 1.87944 12.3851 3.07465 12.2065 4.0758C12.1218 4.55031 12.1093 4.88402 12.212 5.17057C12.2859 5.37664 12.5205 5.84698 13.5775 6.33754L12.7356 8.15169C9.84489 6.81018 10.0423 4.8188 10.2376 3.72448C10.4328 2.63016 9.71331 1.51184 8.73756 2.22448C7.76181 2.93711 6.98756 3.81576 6.98756 5.22448C6.98756 5.56741 7.01696 5.91034 7.11609 6.25327ZM19.7376 13.2245C19.7376 17.8078 19.6126 18.2245 18.2376 18.2245C16.8626 18.2245 16.7376 17.8078 16.7376 13.2245C16.7376 8.64114 16.8626 8.22448 18.2376 8.22448C19.6126 8.22448 19.7376 8.64114 19.7376 13.2245Z" transform="translate(5.26244 5.77551)"></path></g></ListSvg>

                            <span>{points}</span>
                        </StyledLink>
                    }

                </ListInfo>
            </List>
        )
    }
}

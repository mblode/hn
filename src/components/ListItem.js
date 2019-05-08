import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class ListItem extends Component {
    render() {
        const { commentsCount, id, points, timeAgo, title, url, user } = this.props.item;

        return (
            <div className="ListItem">
                <a className="ListItem__title" href={url} target="__blank">{title}</a>
                <div className="ListItem__info">
                    {points !== null && `${points} points`}
                    {user && ' by '}
                    {user && (
                        <Link
                            className="ListItem__link"
                            href={`/user/${user}`}
                            to={`/user/${user}`}
                        >
                            {user}
                        </Link>
                    )} {timeAgo} | {' '}
                    <Link
                        className="ListItem__link"
                        href={`/item/${id}/`}
                        to={`/item/${id}`}
                    >
                        {commentsCount} comments
                    </Link>
                </div>
            </div>
        )
    }
}

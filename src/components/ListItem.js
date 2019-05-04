import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
    commentsCount: PropTypes.number,
    id: PropTypes.number,
    timeAgo: PropTypes.string,
    title: PropTypes.string,
    points: PropTypes.number,
    user: PropTypes.string,
    url: PropTypes.string,
};

const defaultProps = {
    commentsCount: 0,
    id: 0,
    timeAgo: '',
    title: '',
    points: 0,
    user: '',
    url: '',
};

function ListItem({
    commentsCount,
    id,
    points,
    timeAgo,
    title,
    url,
    user,
}) {
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
    );
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;

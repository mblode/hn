import React from "react";
import { Link } from "react-router-dom";
import { Dot } from "./Base";
import { Like } from './Icons/Like'
import { Comment } from './Icons/Comment'
import Upvote from "./Upvote";
import { parse } from '../utils'

export const ListItem = ({ item }) => {
  const { comments_count, id, points, time_ago, title, url, user } = item;

  let linkTitle = (
    <a href={url} target="_blank" rel="noopener noreferrer" className="list-title">
      <span className="list-title-inner">{title}</span>
      <span className="list-url">{parse(url)}</span>
    </a>
  );

  if (url.includes("item?")) {
    linkTitle = (
      <Link to={`/item/${id}`} className="list-title-alt">
        <span className="list-title-inner">{title}</span>
        <span className="list-url">{parse(url)}</span>
      </Link>
    );
  }

  return (
    <div className="list">
      <div className="block w-full">
        {user && (
          <span>
            <Link href={`/user/${user}/`} to={`/user/${user}`} className="username pt-3">
              {user}
            </Link>

            <Dot>•</Dot>
          </span>
        )}

        <span className="mr-1 text-gray-500 text-sm inline-block pt-3">{time_ago}</span>
      </div>

      <span className="list-title-wrap">{linkTitle}</span>

      <Link href={`/item/${id}/`} to={`/item/${id}`} className="list-comment-link">
        {points && (
          <span className="list-comment-item">
            <Like className="w-5 h-5 pr-1 relative" />
            <span>{points}</span>
          </span>
        )}

        <span className="list-comment-item">
          <Comment className="w-5 h-5 pr-1 relative" />
          <span>{comments_count}</span>
        </span>
      </Link>

      <Upvote id={id} />
    </div>
  );
}

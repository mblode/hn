import React from "react";
import { Link } from "react-router-dom";
import { Dot } from "./Base/Dot";
import Clock from './Icons/Clock'
import Like from './Icons/Like'
import Comment from './Icons/Comment'
import { parse, relativeTime } from '../utils'

export const ListItem = ({ item }) => {
  const { comments_count, id, points, time, title, url, user } = item;

  const to = `/item/${id}`
  const parsedUrl = parse(url)

  let linkTitle = (
    <a href={url} target="_blank" rel="noopener noreferrer" className="list-title">
      <span className="list-title-inner">{title}</span>
    </a>
  );

  if (url.includes("item?")) {
    linkTitle = (
      <Link to={to} className="list-title">
        <span className="list-title-inner">{title}</span>
      </Link>
    );
  }

  return (
    <div className="relative flex flex-wrap px-4 overflow-hidden border-b border-slate-300 dark:border-slate-500">
      <span className="w-full mt-2 text-base font-medium text-slate-600 dark:text-slate-300">{linkTitle}</span>

      <div className="flex flex-nowrap w-full items-center justify-between rounded-lg text-slate-500 dark:text-slate-400 pt-[1px] pb-3">
        <div className="flex-wrap list-link">
          {parsedUrl && (
            <>
              <a href={url} target="_blank" rel="noopener noreferrer" className="list-url">{parsedUrl}</a>
              <Dot />
            </>
          )}

          {user && (
            <>
              <a href={`https://news.ycombinator.com/user?id=${user}`} target="_blank" rel="noopener noreferrer" className="list-url">
                {user}
              </a>
            </>
          )}
        </div>

        <Link to={to} className="list-link">
          {time && (
            <span className="list-link-icon">
              <Clock className="relative w-5 h-5 pr-1" />
              <span>{relativeTime(time)}</span>
            </span>
          )}

          {comments_count && (
            <span className="list-link-icon">
              <Comment className="relative w-5 h-5 pr-1" />
              <span>{comments_count}</span>
            </span>
          )}

          {points && (
            <span className="list-link-icon">
              <Like className="relative w-5 h-5 pr-1" />
              <span>{points}</span>
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Dot } from "./base/dot";
import Like from "./icons/like";
import Comment from "./icons/comment";
import { parse, relativeTime } from "@/lib/utils";

type HackerNewsItem = {
  comments_count: number;
  id: number;
  points: number;
  time: number;
  title: string;
  url: string;
  user: string;
};

type Props = {
  item: HackerNewsItem;
};

export const ListItem = ({ item }: Props) => {
  const { comments_count, id, points, time, title, url, user } = item;

  const to = `/item/${id}`;
  const parsedUrl = parse(url);

  let linkTitle = (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="list-title"
    >
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
    <div className="relative flex flex-wrap px-4 overflow-hidden border-b border-border">
      <div className="flex flex-row items-center pt-3 pb-1 text-sm">
        {parsedUrl ? (
          <>
            <a
              href={`https://news.ycombinator.com/from?site=${parsedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="list-url"
            >
              {parsedUrl}
            </a>
            {(user || time) && <Dot />}
          </>
        ) : null}

        {user ? (
          <>
            <a
              href={`https://news.ycombinator.com/user?id=${user}`}
              target="_blank"
              rel="noopener noreferrer"
              className="list-url"
            >
              {user}
              {time && <Dot />}
            </a>
          </>
        ) : null}

        {time ? (
          <Link to={to} className="list-url">
            {relativeTime(time)}
          </Link>
        ) : null}
      </div>

      <h3 className="w-full text-base">{linkTitle}</h3>

      <Link
        to={to}
        className="flex flex-row items-center w-full pt-1 pb-3 text-sm transition-colors text-muted-foreground"
      >
        {points ? (
          <span className="list-link-icon">
            <Like className="relative w-5 h-5 pr-1" />
            <span>{points}</span>
          </span>
        ) : null}

        {comments_count ? (
          <span className="list-link-icon">
            <Comment className="relative w-5 h-5 pr-1" />
            <span>{comments_count}</span>
          </span>
        ) : null}
      </Link>
    </div>
  );
};

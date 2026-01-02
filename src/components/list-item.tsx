import { Link } from "react-router-dom";
import { parse, relativeTime } from "@/lib/utils";
import { Dot } from "./base/dot";
import Comment from "./icons/comment";
import Like from "./icons/like";

interface HackerNewsItem {
  comments_count: number;
  id: number;
  points: number;
  time: number;
  title: string;
  url: string;
  user: string;
}

interface Props {
  item: HackerNewsItem;
}

export const ListItem = ({ item }: Props) => {
  const { comments_count, id, points, time, title, url, user } = item;

  const to = `/item/${id}`;
  const parsedUrl = parse(url);

  let linkTitle = (
    <a
      className="list-title"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="list-title-inner">{title}</span>
    </a>
  );

  if (url.includes("item?")) {
    linkTitle = (
      <Link className="list-title" to={to}>
        <span className="list-title-inner">{title}</span>
      </Link>
    );
  }

  return (
    <div className="relative flex flex-wrap overflow-hidden border-border border-b px-4">
      <div className="flex flex-row items-center pt-3 pb-1 text-sm">
        {parsedUrl ? (
          <>
            <a
              className="list-url"
              href={`https://news.ycombinator.com/from?site=${parsedUrl}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {parsedUrl}
            </a>
            {(user || time) && <Dot />}
          </>
        ) : null}

        {user ? (
          <a
            className="list-url"
            href={`https://news.ycombinator.com/user?id=${user}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {user}
            {time && <Dot />}
          </a>
        ) : null}

        {time ? (
          <Link className="list-url" to={to}>
            {relativeTime(time)}
          </Link>
        ) : null}
      </div>

      <h3 className="w-full text-base">{linkTitle}</h3>

      <Link
        className="flex w-full flex-row items-center pt-1 pb-3 text-muted-foreground text-sm transition-colors"
        to={to}
      >
        {points ? (
          <span className="list-link-icon">
            <Like className="relative h-5 w-5 pr-1" />
            <span>{points}</span>
          </span>
        ) : null}

        {comments_count ? (
          <span className="list-link-icon">
            <Comment className="relative h-5 w-5 pr-1" />
            <span>{comments_count}</span>
          </span>
        ) : null}
      </Link>
    </div>
  );
};

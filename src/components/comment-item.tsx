import { useCallback, useState } from "react";
import cn from "classnames";
import { relativeTime } from "@/lib/utils";
import { Dot } from "./base/dot.tsx";

type Comment = {
  id: string | number;
  user: string;
  time: number;
  content: string;
  level: number;
  comments: Comment[];
};

type Props = {
  user: string;
  time: number;
  content: string;
  level: number;
  comments: Comment[];
  postUser: string;
  id?: string | number;
};

export const CommentItem = ({
  user,
  time,
  content,
  level,
  comments,
  postUser,
}: Props) => {
  const [hidden, setHidden] = useState(false);

  const toggleHidden = useCallback(
    (e: React.MouseEvent) => {
      setHidden(!hidden);
      e.stopPropagation();
    },
    [hidden],
  );

  let commentLoop = null;

  if (comments.length > 0) {
    commentLoop = (
      <ul className="comment-list">
        {comments.map((ele) => {
          return (
            <CommentItem
              user={ele.user}
              time={ele.time}
              content={ele.content}
              key={ele.id}
              level={ele.level}
              id={ele.id}
              comments={ele.comments}
              postUser={postUser}
            />
          );
        })}
      </ul>
    );
  }

  return (
    <li className={cn("comment-wrap", { toggled: hidden })}>
      <div data-level={level} className={cn("comment", { toggled: hidden })}>
        <header
          onClick={toggleHidden}
          className={cn("comment-toggle", { toggled: hidden })}
          onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
        >
          <a
            href={`https://news.ycombinator.com/user?id=${user}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("username", {
              "text-orange-500!": user === postUser,
            })}
          >
            {user}
          </a>
          <Dot />
          <span className="inline-block mr-1 text-muted-foreground">
            {relativeTime(time)}
          </span>
        </header>

        {!hidden && (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>

      {commentLoop}
    </li>
  );
};

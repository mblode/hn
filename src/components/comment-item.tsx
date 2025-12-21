import cn from "classnames";
import { useCallback, useState } from "react";
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

  const toggleHidden = useCallback(() => {
    setHidden((current) => !current);
  }, []);

  const onToggleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      toggleHidden();
    },
    [toggleHidden],
  );

  const onToggleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      toggleHidden();
    },
    [toggleHidden],
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
        {/* biome-ignore lint/a11y/useSemanticElements: Header wraps a link; avoid nesting interactive elements. */}
        <header
          role="button"
          tabIndex={0}
          aria-expanded={!hidden}
          onClick={onToggleClick}
          onKeyDown={onToggleKeyDown}
          className={cn("comment-toggle", { toggled: hidden })}
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
            // biome-ignore lint/security/noDangerouslySetInnerHtml: HN content includes sanitized markup.
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>

      {commentLoop}
    </li>
  );
};

import cn from "classnames";
import { type ReactElement, useCallback, useState } from "react";
import { relativeTime } from "@/lib/utils";
import { Dot } from "./base/dot.tsx";

interface Comment {
  id: string | number;
  user: string;
  time: number;
  content: string;
  level: number;
  comments: Comment[];
}

interface Props {
  user: string;
  time: number;
  content: string;
  level: number;
  comments: Comment[];
  postUser: string;
  id?: string | number;
}

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
    [toggleHidden]
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
    [toggleHidden]
  );

  let commentLoop: ReactElement | null = null;

  if (comments.length > 0) {
    commentLoop = (
      <ul className="comment-list">
        {comments.map((ele) => {
          return (
            <CommentItem
              comments={ele.comments}
              content={ele.content}
              id={ele.id}
              key={ele.id}
              level={ele.level}
              postUser={postUser}
              time={ele.time}
              user={ele.user}
            />
          );
        })}
      </ul>
    );
  }

  return (
    <li className={cn("comment-wrap", { toggled: hidden })}>
      <div className={cn("comment", { toggled: hidden })} data-level={level}>
        {/* biome-ignore lint/a11y/useSemanticElements: Header wraps a link; avoid nesting interactive elements. */}
        <header
          aria-expanded={!hidden}
          className={cn("comment-toggle", { toggled: hidden })}
          onClick={onToggleClick}
          onKeyDown={onToggleKeyDown}
          role="button"
          tabIndex={0}
        >
          <a
            className={cn("username", {
              "text-orange-500!": user === postUser,
            })}
            href={`https://news.ycombinator.com/user?id=${user}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {user}
          </a>
          <Dot />
          <span className="mr-1 inline-block text-muted-foreground">
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

import React, { useCallback, useState } from "react";
import cn from "classnames"
import { Dot } from './Base/Dot'

export const CommentItem = ({ user, timeAgo, content, level, comments, postUser }) => {
  const [hidden, setHidden] = useState(false)

  const toggleHidden = useCallback((e) => {
    setHidden(!hidden)
    e.stopPropagation();
  }, [hidden])

  let commentLoop = null;

  if (comments.length > 0) {
    commentLoop = (
      <ul className="comment-list">
        {comments.map((ele) => {
          return (
            <CommentItem
              user={ele.user}
              timeAgo={ele.time_ago}
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
    <li className={cn("comment-wrap", { "toggled": hidden })}>
      <div level={level} className={cn("comment", { "toggled": hidden })}>
        <header
          onClick={toggleHidden}
          className={cn("comment-toggle", { "toggled": hidden })}
          onMouseDown={(e) => e.preventDefault()}
        >
          <a
            href={`https://news.ycombinator.com/user?id=${user}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("username", {
              "!text-orange-500": user === postUser
            })}
          >
            {user}
          </a>
          <Dot>•</Dot>
          <span className="inline-block mr-1 text-sm text-gray-500">{timeAgo}</span>
        </header>

        {!hidden && <div className="content" dangerouslySetInnerHTML={{ __html: content }} />}
      </div>

      {commentLoop}
    </li>
  );
}

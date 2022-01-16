import React, { useCallback } from "react";
import { Dot } from './Base/Dot'

export const CommentItem = ({ user, timeAgo, content, level, comments, postUser }) => {
  const [hidden, setHidden] = useState(false)

  const toggleHidden = useCallback((e) => {
    setHidden(!hidden)
    e.stopPropagation();
  }, [])

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
    <li className={cn("comment-wrap", { hidden: "toggled" })}>
      <div level={level} className={cn("comment", { hidden: "toggled" })}>
        <header
          onClick={toggleHidden}
          className={cn("comment-toggle", { hidden: "toggled" })}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Link
            href={`/user/${user}/`}
            to={`/user/${user}`}
            parent={user === postUser ? 1 : 0}
            className="username"
          >
            {user}
          </Link>
          <Dot>•</Dot>
          <span className="mr-1 text-gray-500 text-sm inline-block">{timeAgo}</span>
        </header>

        {!hidden && <div className="content" dangerouslySetInnerHTML={{ __html: content }} />}
      </div>

      {commentLoop}
    </li>
  );
}

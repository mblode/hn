import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "./base/loading";
import { CommentItem } from "../components/comment-item";
import { Alert } from "../components/base/alert";
import { Dot } from "./base/dot";
import { Helmet } from "react-helmet";
import { parse, relativeTime } from "@/lib/utils";

type Comment = {
  id: string | number;
  user: string;
  time: number;
  content: string;
  level: number;
  comments: Comment[];
}

type ItemData = {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  type: string;
  url: string;
  domain?: string;
  content: string;
  comments_count: number;
  comments: Comment[];
}

export const Item = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ItemData | null>(null);

  useEffect(() => {
    const getResults = async () => {
      setLoading(true);

      try {
        const response = await fetch(`https://api.hackerwebapp.com/item/${id}`);

        const json = await response.json();
        setData(json);
        setError(null);
      } catch (error) {
        setData(null);
        setError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setLoading(false);
      }
    };
    getResults();
  }, [id]);

  if (error) {
    return <Alert kind="negative">Error: {error.message}</Alert>;
  }

  if (loading || !data) {
    return <Loading />;
  }

  const parsedUrl = parse(data.url);

  const title = (
    <div className="block pb-2 text-xl transition-colors leading-[1.2] first-letter:w-full text-foreground decoration-none">
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="pr-1 mr-1 break-words hover:underline"
      >
        {data.title}
      </a>
      {parsedUrl && (
        <a
          href={`https://news.ycombinator.com/from?site=${parsedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:underline hover:text-foreground align-middle list-url"
        >
          {parsedUrl}
        </a>
      )}
    </div>
  );

  const commentLoop = data.comments.map((ele: Comment) => {
    return (
      <CommentItem
        user={ele.user}
        time={ele.time}
        content={ele.content}
        key={ele.id}
        level={ele.level}
        id={ele.id}
        comments={ele.comments}
        postUser={data.user}
      />
    );
  });

  return (
    <>
      <Helmet>
        <title>Hacker News &middot; {`${data.title}`}</title>
      </Helmet>

      <div className="wrap">
        <div className="block pb-4 mb-4 border-b border-border">
          <div className="block w-full pb-2 text-sm">
            {data.user && (
              <span>
                <a
                  href={`https://news.ycombinator.com/user?id=${data.user}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="username"
                >
                  {data.user}
                </a>

                <Dot />
              </span>
            )}

            <span className="inline-block mr-1 text-sm text-muted-foreground">
              {relativeTime(data.time)}
            </span>
          </div>

          {title}

          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>

        <div className="mb-5 text-base text-foreground">
          {data.comments_count} comment{data.comments_count !== 1 ? "s" : ""}
        </div>

        <ul className="p-0 m-0">{commentLoop}</ul>
      </div>
    </>
  );
};

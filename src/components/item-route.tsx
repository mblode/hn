import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { parse, relativeTime } from "@/lib/utils";
import { Alert } from "../components/base/alert";
import { CommentItem } from "../components/comment-item";
import { Dot } from "./base/dot";
import { Loading } from "./base/loading";

interface Comment {
  id: string | number;
  user: string;
  time: number;
  content: string;
  level: number;
  comments: Comment[];
}

interface ItemData {
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
    return <Loading commentRows={data?.comments_count ?? 6} variant="item" />;
  }

  const parsedUrl = parse(data.url);

  const title = (
    <div className="block pb-2 text-foreground text-xl leading-[1.2] decoration-none transition-colors first-letter:w-full">
      <a
        className="mr-1 break-words pr-1 hover:underline"
        href={data.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {data.title}
      </a>
      {parsedUrl && (
        <a
          className="list-url align-middle text-muted-foreground text-sm hover:text-foreground hover:underline"
          href={`https://news.ycombinator.com/from?site=${parsedUrl}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {parsedUrl}
        </a>
      )}
    </div>
  );

  const commentLoop = data.comments.map((ele: Comment) => {
    return (
      <CommentItem
        comments={ele.comments}
        content={ele.content}
        id={ele.id}
        key={ele.id}
        level={ele.level}
        postUser={data.user}
        time={ele.time}
        user={ele.user}
      />
    );
  });

  return (
    <>
      <Helmet>
        <title>Hacker News &middot; {data.title}</title>
      </Helmet>

      <div className="wrap">
        <div className="mb-4 block border-border border-b pb-4">
          <div className="block w-full pb-2 text-sm">
            {data.user && (
              <span>
                <a
                  className="username"
                  href={`https://news.ycombinator.com/user?id=${data.user}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {data.user}
                </a>

                <Dot />
              </span>
            )}

            <span className="mr-1 inline-block text-muted-foreground text-sm">
              {relativeTime(data.time)}
            </span>
          </div>

          {title}

          <div
            className="content"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: HN content includes sanitized markup.
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>

        <div className="mb-5 text-base text-foreground">
          {data.comments_count} comment{data.comments_count !== 1 ? "s" : ""}
        </div>

        <ul className="m-0 p-0">{commentLoop}</ul>
      </div>
    </>
  );
};

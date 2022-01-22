import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Loading } from "./Base/Loading";
import { CommentItem } from "../components/CommentItem";
import { Alert } from "../components/Base/Alert";
import { Dot } from "../components/Base/Dot";
import { Helmet } from "react-helmet";
import { parse, relativeTime } from '../utils'

export const Item = () => {
  const { id } = useParams();
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const getResults = async () => {
      setLoading(true)

      try {
        const response = await fetch(
          `https://api.hackerwebapp.com/item/${id}`
        );

        const json = await response.json();
        setData(json)
        setError(null)
      } catch (error) {
        setData(null)
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    getResults()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (error) {
    return <Alert kind="negative">Error: {error}</Alert>;
  }

  if (loading || !data) {
    return <Loading />;
  }

  const parsedUrl = parse(data.url)

  let title = (
    <div className="block pb-2 text-xl transition-colors first-letter:w-full text-slate-700 dark:text-slate-200 decoration-none hover:text-slate-800 dark:hover:text-slate-100 active:text-slate-800 dark:active:text-slate-100">
      <a href={data.url} target="_blank" rel="noopener noreferrer" className="pr-1 mr-1 break-words">{data.title}</a>
      {parsedUrl && <a href={`https://news.ycombinator.com/from?site=${parsedUrl}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 align-middle dark:text-gray-400 list-url">{parsedUrl}</a>}
    </div>
  );

  const commentLoop = data.comments.map((ele) => {
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
        <div className="block pb-4 mb-4 border-b border-slate-300 dark:border-slate-500">
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

                <Dot>•</Dot>
              </span>
            )}

            <span className="inline-block mr-1 text-sm text-slate-500 dark:text-slate-400">{relativeTime(data.time)}</span>
          </div>

          {title}

          <div className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>

        <div className="mb-5 text-base text-slate-800 dark:text-slate-100">
          {data.comments_count} comment{data.comments_count !== 1 ? "s" : ""}
        </div>

        <ul className="p-0 m-0">{commentLoop}</ul>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Loading } from "./Base/Loading";
import { CommentItem } from "../components/CommentItem";
import { Alert } from "../components/Base/Alert";
import { Dot } from "../components/Base/Dot";
import { Helmet } from "react-helmet";
import { parse } from '../utils'

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
    return <Alert kind="danger">Error: {error}</Alert>;
  }

  if (loading || !data) {
    return <Loading />;
  }

  let title = (
    <a href={data.url} target="_blank" rel="noopener noreferrer" className="block w-full pb-2 text-xl text-gray-700 transition-colors dark:text-gray-200 decoration-none hover:text-gray-800 dark:hover:text-gray-100 active:text-gray-800 dark:active:text-gray-100">
      <span className="mr-1 break-words">{data.title}</span>
      <span className="list-url">{parse(data.url)}</span>
    </a>
  );

  const commentLoop = data.comments.map((ele) => {
    return (
      <CommentItem
        user={ele.user}
        timeAgo={ele.time_ago}
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
        <div className="block pb-2 mb-4 border-b border-gray-300">
          <div className="block w-full pb-2">
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

            <span className="inline-block mr-1 text-sm text-gray-500 dark:text-gray-400">{data.time_ago}</span>
          </div>

          {title}

          <div className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>

        <div className="mb-5 text-base text-white dark:text-gray-100">
          {data.comments_count} comment{data.comments_count !== 1 ? "s" : ""}
        </div>

        <ul className="p-0 m-0">{commentLoop}</ul>
      </div>
    </>
  );
}

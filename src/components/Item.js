import React from "react";
import Loading from "./Base/Loading";
import CommentItem from "../components/CommentItem";
import { Alert } from "../components/Base/Alert";
import { Dot } from "../components/Base/Dot";
import { Helmet } from "react-helmet";
import { parse } from '../utils'

export const Item = ({ match }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const id = match.params.id;

    setLoading(true)

    try {
      const response = await fetch(
        `https://api.hackerwebapp.com/item/${id}`
      );

      console.log(data);
      setData(response.data)
      setError(null)
    } catch (error) {
      console.log('error', error);
      setData(null)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  if (error) {
    return <Alert kind="danger">Error: {error}</Alert>;
  }

  if (loading) {
    return <Loading />;
  }

  let title = (
    <a href={data.url} target="_blank" rel="noopener noreferrer" className="text-xl block w-full text-gray-700 decoration-none pb-2 transition-colors hover:text-gray-800 active:text-gray-800">
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
        <div className="block mb-4 pb-2 border-b border-gray-300">
          <div className="block w-full pb-2">
            {data.user && (
              <span>
                <Link
                  href={`/user/${data.user}/`}
                  to={`/user/${data.user}`}
                  className="username"
                >
                  {data.user}
                </Link>

                <Dot>•</Dot>
              </span>
            )}

            <span className="mr-1 text-gray-500 text-sm inline-block">{data.time_ago}</span>
          </div>

          {title}

          <div className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>

        <div className="text-base mb-5">
          {data.comments_count} comment{data.comments_count !== 1 ? "s" : ""}
        </div>

        <ul className="p-0 m-0">{commentLoop}</ul>
      </div>
    </>
  );
}

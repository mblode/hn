import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { ListItem } from "./ListItem";
import { Alert } from "./Base/Alert";
import { Loading } from "./Base/Loading";
import { Pagination } from "./Base/Pagination";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const Feed = () => {
  let params = useParams();

  const [type, setType] = useState("news")
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getResults = async () => {
      let newType = params.type || "news";
      let newPage = params.page || 1;

      setType(newType)
      setPage(newPage)
      setLoading(true)

      try {
        const response = await fetch(
          `https://api.hackerwebapp.com/${newType}?page=${newPage}`
        );

        const json = await response.json();
        setPosts(json)
        setError(null)
      } catch (error) {
        setPosts(null)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    getResults()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  if (error) {
    return <Alert kind="danger">Failed to load posts</Alert>;
  }

  if (loading || posts.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Hacker News &middot; {capitalize(type)}</title>
      </Helmet>

      <div className="bg-white shadow-md dark:bg-slate-800 sm:rounded-lg">
        {page > 1 && (
          <div className="relative px-5 py-6 overflow-hidden text-center uppercase border-b border-gray-300 px-">
            <h3 className="text-sm">
              Page {page}
            </h3>
          </div>
        )}

        {posts.map((item, i) => (
          <ListItem key={i} item={item} />
        ))}

        <Pagination type={type} page={page} />
      </div>
    </>
  );
}

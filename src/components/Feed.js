import React, { useState } from "react";
import { Helmet } from "react-helmet";
import ListItem from "./ListItem";
import { Alert } from "./Base/Alert";
import { Loading } from "./Base/Loading";
import { Pagination } from "./Base/Pagination";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const Feed = ({ match }) => {
  const [type, setType] = useState("news")
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    let newType = match.params.type || type;
    let newPage = match.params.page || page;

    setPage(newType)
    setType(newPage)
    setLoading(true)

    try {
      const response = await fetch(
        `https://api.hackerwebapp.com/${newType}?page=${newType}`
      );

      console.log(data);
      setPosts(response.data)
      setError(null)
    } catch (error) {
      console.log('error', error);
      setPosts(null)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  // componentDidUpdate(prevProps) {
  //   if (this.props.location !== prevProps.location) {
  //     let type = "news";
  //     let page = 1;

  //     if (this.props.match.params.type !== undefined) {
  //       type = this.props.match.params.type;
  //     }

  //     if (this.props.match.params.page !== undefined) {
  //       page = this.props.match.params.page;
  //     }

  //     this.setState({
  //       type,
  //       page,
  //     });

  //     this.props.dispatch(fetchFeed(type, page));
  //   }
  // }


  if (error) {
    return <Alert kind="danger">Failed to load posts</Alert>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Hacker News &middot; {capitalize(type)}</title>
      </Helmet>

      <div className="bg-white sm:rounded shadow-sm ">
        {page > 1 && (
          <div className="px- px-5 py-6 uppercase text-center overflow-hidden relative border-b border-gray-300">
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

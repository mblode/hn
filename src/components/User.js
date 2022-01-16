import React from "react";
import Loading from "./Base/Loading";
import { Helmet } from "react-helmet";
import { Wrap } from "./Base/Wrap";
import { Alert } from "./Base/Alert";

export const User = ({ match }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const id = match.params.id;

    setLoading(true)

    try {
      const response = await fetch(
        `https://api.hackerwebapp.com/user/${id}`
      );

      console.log(data);
      setUser(response.data)
      setError(null)
    } catch (error) {
      console.log('error', error);
      setUser(null)
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

  return (
    <>
      <Helmet>
        <title>Hacker News &middot; {`${user.id}`}</title>
      </Helmet>

      <Wrap>
        <div className="block pb-3 mb-4 border-b border-gray-300">
          <div className=" text-gray-600 text-xl block w-full decoration-none mb-2 break-words">{user.id}</div>
          <p className="text-gray-500 mb-2">Created: {user.created}</p>
          <p className="text-gray-500 mb-2">Karma: {user.karma}</p>
        </div>

        <div className="content" dangerouslySetInnerHTML={{ __html: user.about }} />
      </Wrap>
    </>
  );
}
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ListItem } from "./list-item";
import { Alert } from "./base/alert";
import { Loading } from "./base/loading";
import { Pagination } from "./base/pagination";

interface HackerNewsItem {
  comments_count: number;
  id: number;
  points: number;
  time: number;
  title: string;
  url: string;
  user: string;
}

const capitalize = (s: string): string => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const Feed = () => {
  const params = useParams<{ type?: string; page?: string }>();

  const [type, setType] = useState<string>("news");
  const [page, setPage] = useState<string>("1");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<HackerNewsItem[]>([]);

  useEffect(() => {
    const getResults = async () => {
      const newType = params.type || "news";
      const newPage = params.page || "1";

      setType(newType);
      setPage(newPage);
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.hackerwebapp.com/${newType}?page=${newPage}`,
        );

        const json = await response.json();
        setPosts(json);
        setError(null);
      } catch (error) {
        setPosts([]);
        setError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setLoading(false);
      }
    };

    getResults();
  }, [params]);

  if (error) {
    return <Alert kind="negative">Failed to load posts</Alert>;
  }

  if (loading || posts.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Hacker News &middot; {capitalize(type)}</title>
      </Helmet>

      <div className="bg-card shadow-xl border border-transparent sm:border-border sm:rounded-lg">
        {parseInt(String(page)) > 1 && (
          <div className="relative p-5 overflow-hidden text-center border-b text-foreground border-border">
            <h3 className="text-sm">Page {page}</h3>
          </div>
        )}

        {posts.map((item: HackerNewsItem, i: number) => (
          <ListItem key={i} item={item} />
        ))}

        <Pagination type={type} page={String(page)} />
      </div>
    </>
  );
};

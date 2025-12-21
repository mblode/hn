import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Alert } from "./base/alert";
import { Loading } from "./base/loading";
import { Pagination } from "./base/pagination";
import { ListItem } from "./list-item";

type HackerNewsItem = {
  comments_count: number;
  id: number;
  points: number;
  time: number;
  title: string;
  url: string;
  user: string;
};

const capitalize = (s: string): string => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const Feed = () => {
  const { type: routeType, page: routePage } = useParams<{
    type?: string;
    page?: string;
  }>();

  const [type, setType] = useState<string>("news");
  const [page, setPage] = useState<string>("1");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<HackerNewsItem[]>([]);

  useEffect(() => {
    const getResults = async () => {
      const newType = routeType || "news";
      const newPage = routePage || "1";

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
  }, [routePage, routeType]);

  if (error) {
    return <Alert kind="negative">Failed to load posts</Alert>;
  }

  if (loading || posts.length === 0) {
    const pageNumber = Number.parseInt(page, 10);
    const safePageNumber = Number.isNaN(pageNumber) ? 1 : pageNumber;

    return (
      <Loading
        variant="feed"
        rows={posts.length || 30}
        showPageHeader={safePageNumber > 1}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Hacker News &middot; {capitalize(type)}</title>
      </Helmet>

      <div className="bg-card shadow-xl border border-transparent sm:border-border sm:rounded-lg">
        {Number.parseInt(page, 10) > 1 && (
          <div className="relative p-5 overflow-hidden text-center border-b text-foreground border-border">
            <h3 className="text-sm">Page {page}</h3>
          </div>
        )}

        {posts.map((item: HackerNewsItem) => (
          <ListItem key={item.id} item={item} />
        ))}

        <Pagination type={type} page={String(page)} />
      </div>
    </>
  );
};

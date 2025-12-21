import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "./base/button.tsx";

export const ErrorRoute = () => {
  return (
    <>
      <Helmet>
        <title>Hacker News &middot; Page Not Found</title>
      </Helmet>

      <div className="text-center wrap">
        <h1 className="mb-2 text-2xl">Oops.</h1>

        <h2 className="mb-4 text-xl">Can't find that page...</h2>

        <Link to="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </>
  );
};

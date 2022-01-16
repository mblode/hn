import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export const Error = () => {
  return (
    <>
      <Helmet>
        <title>Hacker News &middot; Page Not Found</title>
      </Helmet>

      <div className="wrap text-center">
        <Heading as="h1" fontSize={8} mb={2}>
          Oops.
        </Heading>
        <Heading as="h1" fontSize={4} mb={4}>
          Can't find that page...
        </Heading>
        <Link to="/">
          <Button kind="secondary">Go back home</Button>
        </Link>
      </div>
    </>
  );
}

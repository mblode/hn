import { Helmet } from "react-helmet";

export const About = () => {
  return (
    <>
      <Helmet>
        <title>Hacker News &middot; About</title>
      </Helmet>

      <div className="wrap">
        <div className="content">
          <h1 className="mb-2 text-3xl font-medium">About</h1>

          <p>
            <strong>
              <a href="https://news.ycombinator.com/" rel="nofollow">
                Hacker News
              </a>{" "}
              web app built using React.
            </strong>
          </p>

          <p>
            My Hacker News client is inspired by{" "}
            <a href="https://hnpwa.com/" rel="nofollow">
              HNPWA
            </a>{" "}
            and <a href="/mblode/hn/blob/master/hn.premii.com">HN Premii</a>. It
            is built using the best-in-class front-end technologies including
            React, and React Router.
          </p>

          <p>
            <a href="https://github.com/mblode/hn" rel="nofollow">
              Find out more on GitHub
            </a>
          </p>

          <h2 className="my-2 text-xl font-bold">Creator</h2>

          <p>
            <em>Matthew Blode</em>
          </p>

          <ul className="list-disc list-inside">
            <li>
              <a href="https://github.com/mblode">GitHub</a>
            </li>
            <li>
              <a href="https://codepen.io/mblode" rel="nofollow">
                CodePen
              </a>
            </li>
          </ul>

          <h3 className="my-2 text-xl font-bold">License</h3>

          <p>
            MIT ©{" "}
            <a href="http://matthewblode.com" rel="nofollow">
              Matthew Blode
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

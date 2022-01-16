import { Link } from "react-router-dom";
import { Button } from "./Button";

export const Pagination = ({ page, type }) => {
  return (
    <div className="relative flex items-center justify-center px-4 py-4 overflow-hidden sm:px-5 sm:py-6">
      <Link to={`/${type}/${parseInt(page) - 1}`} className="mx-1">
        <Button disabled={parseInt(page) <= 1}>Prev</Button>
      </Link>

      <Link to={`/${type}/${parseInt(page) + 1}`} className="mx-1">
        <Button disabled={type === "jobs"}>Next</Button>
      </Link>
    </div>
  );
}
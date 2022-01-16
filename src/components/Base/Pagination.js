import { Link } from "react-router-dom";

export const Pagination = ({ page, type }) => {
  return (
    <div className="flex items-center px-4 py-4 overflow-hidden relative justify-center sm:px-5 sm:py-6">
      <Link to={`/${type}/${parseInt(page) - 1}`}>
        <Button disabled={parseInt(page) <= 1}>Prev</Button>
      </Link>

      <Link to={`/${type}/${parseInt(page) + 1}`}>
        <Button disabled={type === "jobs"}>Next</Button>
      </Link>
    </div>
  );
}
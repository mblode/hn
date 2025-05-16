import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

interface PaginationProps {
  page: string;
  type: string;
}

export const Pagination = ({ page, type }: PaginationProps) => {
  const navigate = useNavigate();

  const onPrev = useCallback(() => {
    navigate(`/${type}/${parseInt(page) - 1}`);
  }, [navigate, page, type]);

  const onNext = useCallback(() => {
    navigate(`/${type}/${parseInt(page) + 1}`);
  }, [navigate, page, type]);

  return (
    <div className="relative flex items-center justify-center px-4 py-4 overflow-hidden sm:px-5 sm:py-6">
      <div className="mx-1">
        <Button disabled={parseInt(page) <= 1} onClick={onPrev}>
          Prev
        </Button>
      </div>

      <div>
        <Button disabled={type === "jobs"} onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

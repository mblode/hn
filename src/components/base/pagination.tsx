import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

type Props = {
  page: string;
  type: string;
};

export const Pagination = ({ page, type }: Props) => {
  const navigate = useNavigate();
  const pageNumber = Number.parseInt(page, 10);
  const safePageNumber = Number.isNaN(pageNumber) ? 1 : pageNumber;

  const onPrev = useCallback(() => {
    navigate(`/${type}/${safePageNumber - 1}`);
  }, [navigate, safePageNumber, type]);

  const onNext = useCallback(() => {
    navigate(`/${type}/${safePageNumber + 1}`);
  }, [navigate, safePageNumber, type]);

  return (
    <div className="relative flex items-center justify-center px-4 py-4 overflow-hidden sm:px-5 sm:py-6">
      <div className="mx-1">
        <Button disabled={safePageNumber <= 1} onClick={onPrev}>
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

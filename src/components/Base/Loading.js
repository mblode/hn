import React from "react";
import { Spinner } from "./Spinner";

export const Loading = () => {
  return (
    <div className="wrap text-center min-h-full">
      <Spinner />
    </div>
  );
}

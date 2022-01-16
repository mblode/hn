import React from "react";
import Spinner from "../Icons/Spinner";

export const Loading = () => {
  return (
    <div className="wrap text-center sm:min-h-[calc(100vh-92px)] min-h-[calc(100vh-60px)] flex justify-center items-center flex-col">
      <Spinner className="w-8 h-8 text-orange-500" />
    </div>
  );
}

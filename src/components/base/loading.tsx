import { Spinner } from "./spinner";

export const Loading = () => {
  return (
    <div className="wrap text-center sm:min-h-[calc(100vh-92px)] min-h-[calc(100vh-60px)] flex justify-center items-center flex-col">
      <Spinner />
    </div>
  );
};

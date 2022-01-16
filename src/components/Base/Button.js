import cn from "classnames";
import { Spinner } from "./Spinner";

export const Button = ({
  disabled,
  children,
  fullWidth,
  onClick,
  isLoading,
  ...props
}) => {
  return (
    <button
      className={cn(
        "btn px-5 py-3 text-base bg-green-500 border-green-500 text-white hover:bg-green-700 rounded-lg hover:border-green-700 hover:shadow-md focus:shadow-md",
        {
          "cursor-wait": isLoading,
          "!cursor-not-allowed !bg-gray-200 !text-gray-500 !shadow-none":
            disabled,
          "block w-full": fullWidth,
          "inline-block": !fullWidth,
        }
      )}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      <div className={cn({ "opacity-0 invisible": isLoading })}>{children}</div>

      {isLoading && (
        <div
          className="absolute w-5 h-5 transform -translate-x-1/2 -translate-y-1/2 text- top-1/2 left-1/2"
          data-testid="button-loading"
        >
          <Spinner />
        </div>
      )}
    </button>
  );
};
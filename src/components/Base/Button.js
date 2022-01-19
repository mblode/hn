import cn from "classnames";
import Spinner from "../Icons/Spinner";

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
        "btn px-4 py-2 text-base bg-white dark:bg-slate-700 border-gray-300 text-gray-700 dark:text-gray-200 hover:bg-gray-100 rounded-lg hover:border-gray-400 hover:shadow-md focus:shadow-md",
        {
          "cursor-wait": isLoading,
          "!cursor-not-allowed !bg-white !text-gray-500 !dark:text-gray-400 !shadow-none !border-gray-200 !dark:border-gray-400":
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
          <Spinner className="w-full h-full" />
        </div>
      )}
    </button>
  );
};
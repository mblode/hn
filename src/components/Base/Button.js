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
        "btn px-4 rounded-lg py-2 text-base bg-white transition-colors dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200",
        {
          "cursor-wait": isLoading,
          "cursor-not-allowed opacity-50":
            disabled,
          "hover:bg-slate-100 dark:hover:bg-slate-900 hover:border-slate-400 hover:shadow-md focus:shadow-md":
            !disabled,
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
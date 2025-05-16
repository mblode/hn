import cn from "classnames";
import { Spinner } from "./spinner";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

export const Button = ({
  disabled,
  children,
  fullWidth,
  onClick,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "btn px-4 rounded-lg py-2 text-base bg-card transition-colors border-border text-card-foreground",
        {
          "cursor-wait": isLoading,
          "cursor-not-allowed opacity-50": disabled,
          "hover:bg-card hover:border-border hover:shadow-md focus:shadow-md":
            !disabled,
          "block w-full": fullWidth,
          "inline-block": !fullWidth,
        },
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
          <Spinner size={20} strokeWidth={4} />
        </div>
      )}
    </button>
  );
};

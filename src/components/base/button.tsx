import cn from "classnames";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "./spinner";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
};

export const Button = ({
  disabled,
  children,
  fullWidth,
  onClick,
  isLoading,
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        "btn rounded-lg border-border bg-card px-4 py-2 text-base text-card-foreground transition-colors",
        {
          "cursor-wait": isLoading,
          "cursor-not-allowed opacity-50": disabled,
          "hover:border-border hover:bg-card hover:shadow-md focus:shadow-md":
            !disabled,
          "block w-full": fullWidth,
          "inline-block": !fullWidth,
        }
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      <div className={cn({ "invisible opacity-0": isLoading })}>{children}</div>

      {isLoading && (
        <div
          className="text- absolute top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform"
          data-testid="button-loading"
        >
          <Spinner size={20} strokeWidth={4} />
        </div>
      )}
    </button>
  );
};

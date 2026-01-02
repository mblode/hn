import cn from "classnames";
import type { ReactNode } from "react";

const classNames = {
  kind: {
    positive: "bg-green-200 text-green-700",
    neutral: "bg-card text-foreground",
    negative: "bg-red-200 text-red-700",
  },
};

interface Props {
  kind?: "positive" | "neutral" | "negative";
  children: ReactNode;
}

export const Alert = ({ kind = "neutral", children }: Props) => {
  return (
    <div className={cn("alert", classNames.kind[kind])} role="alert">
      {children}
    </div>
  );
};

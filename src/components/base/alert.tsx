import cn from "classnames";
import type { ReactNode } from "react";

const classNames = {
  kind: {
    positive: "bg-green-200 text-green-700",
    neutral: "bg-card text-foreground",
    negative: "bg-red-200 text-red-700",
  },
};

interface AlertProps {
  kind?: "positive" | "neutral" | "negative";
  children: ReactNode;
}

export const Alert = ({ kind = "neutral", children }: AlertProps) => {
  return (
    <div role="alert" className={cn("alert", classNames.kind[kind])}>
      {children}
    </div>
  );
};

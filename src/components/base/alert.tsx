import cn from "classnames";
import type { ReactNode } from "react";

const classNames = {
  kind: {
    positive: "bg-green-200 text-green-700",
    neutral: "bg-card text-foreground",
    negative: "bg-red-200 text-red-700",
  },
};

type Props = {
  kind?: "positive" | "neutral" | "negative";
  children: ReactNode;
};

export const Alert = ({ kind = "neutral", children }: Props) => {
  return (
    <div role="alert" className={cn("alert", classNames.kind[kind])}>
      {children}
    </div>
  );
};

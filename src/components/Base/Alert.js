import cn from "classnames";

const classNames = {
  kind: {
    positive: "bg-green-200 text-green-700",
    neutral: "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200",
    negative: "bg-red-200 text-red-700",
  },
};

export const Alert = ({ kind = "neutral", children }) => {
  return (
    <div
      role="alert"
      className={cn("alert", classNames.kind[kind])}
    >
      {children}
    </div>
  );
};
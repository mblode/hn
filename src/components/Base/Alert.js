import cn from "classnames";

const classNames = {
  kind: {
    positive: "bg-green-200 text-green-700",
    neutral: "bg-gray-200 text-gray-700",
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
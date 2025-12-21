import { type ClassValue, clsx } from "clsx";
import { formatDistanceStrict } from "date-fns";
import { enAU } from "date-fns/locale";
import extractDomain from "extract-domain";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parse = (url: string) => {
  const link = extractDomain(url);

  return link ?? null;
};

type FormatDistanceLocale = {
  lessThanXSeconds: string;
  xSeconds: string;
  halfAMinute: string;
  lessThanXMinutes: string;
  xMinutes: string;
  aboutXHours: string;
  xHours: string;
  xDays: string;
  aboutXWeeks: string;
  xWeeks: string;
  aboutXMonths: string;
  xMonths: string;
  aboutXYears: string;
  xYears: string;
  overXYears: string;
  almostXYears: string;
};

const formatDistanceLocale: FormatDistanceLocale = {
  lessThanXSeconds: "{{count}}s",
  xSeconds: "{{count}}s",
  halfAMinute: "30s",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

function formatDistance(
  token: keyof FormatDistanceLocale,
  count: string | number,
  options: { addSuffix?: boolean; comparison?: number } = {},
) {
  const result = formatDistanceLocale[token].replace(
    "{{count}}",
    count.toString(),
  );

  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return `in ${result}`;
    } else {
      return `${result} ago`;
    }
  }

  return result;
}

const locale = {
  ...enAU,
  formatDistance,
};

export const relativeTime = (time: number) => {
  return formatDistanceStrict(new Date(time * 1000), new Date(), { locale });
};

import { formatDistanceStrict } from 'date-fns';
import { enAU } from 'date-fns/esm/locale';
import extractDomain from "extract-domain";

export const parse = (url) => {
  let link = extractDomain(url);

  return link ?? null
}

const formatDistanceLocale = {
  lessThanXSeconds: '{{count}}s',
  xSeconds: '{{count}}s',
  halfAMinute: '30s',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

function formatDistance(token, count, options) {
  options = options || {}

  const result = formatDistanceLocale[token].replace('{{count}}', count)

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      return result + ' ago'
    }
  }

  return result
}

const locale = {
  ...enAU,
  formatDistance,
};

export const relativeTime = (time) => {
  return formatDistanceStrict(new Date(time * 1000), new Date(), { locale });
}
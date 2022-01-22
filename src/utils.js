import { formatDistanceStrict } from 'date-fns';
import { enAU } from 'date-fns/esm/locale';
import extractDomain from "extract-domain";

export const parse = (url) => {
  let link = extractDomain(url);

  return link ?? null
}

// moment.locale('en', {
//   relativeTime: {
//     future: 'in %s',
//     past: '%s ago',
//     s: '1s',
//     ss: '%ss',
//     m: '1m',
//     mm: '%dm',
//     h: '1h',
//     hh: '%dh',
//     d: '1d',
//     dd: '%dd',
//     M: '1M',
//     MM: '%dM',
//     y: '1Y',
//     yy: '%dY'
//   }
// })

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
  console.log(time * 1000, new Date(time * 1000), new Date())
  return formatDistanceStrict(new Date(time * 1000), new Date(), { locale });
}
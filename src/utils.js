import { parseDomain } from "parse-domain";

export const parse = (url) => {
  let link = parseDomain(url);

  if (link != null) {
    return "(" + link.domain + "." + link.tld + ")";
  } else {
    return "";
  }
}

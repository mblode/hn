import extractDomain from "extract-domain";

export const parse = (url) => {
  let link = extractDomain(url);
  console.log(link)

  if (link != null) {
    return `(${link})`;
  } else {
    return "";
  }
}

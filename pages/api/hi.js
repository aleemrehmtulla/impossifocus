import { extract } from "article-parser";
import { convert } from "html-to-text";

export default async function handler(req, res) {
  console.log("ewf");

  const url = req.body.url;
  const hi = await extract(url);
  const df = convert(hi.content);
  const yo = df.replaceAll(/\[([^\]]+)\]/gi, "");

  res.end(`Post: ${yo}`);
}

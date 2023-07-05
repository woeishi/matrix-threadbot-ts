import { tsToString } from "./tsToString";
import { Message } from "./types";

export function formatHtml(
  { ts, participant, body }: Message,
  semantic = false
) {
  const datetime = tsToString(ts);
  if (semantic) {
    return escape(`<figure>
    <figcaption>\n${
      participant.displayName
    }: <time datetime="${new Date(ts).toISOString()}">${datetime}</time>
    </figcaption>
    <blockquote>\n${body}\n<blockquote>
  </figure>`);
  } else {
    return escape(`<blockquote>\n${participant.displayName}: ${datetime}<br>\n${body}\n</blockquote>`);
  }
}

function escape(text: string) {
  const lookup:Record<string,string> = {
      '&': "&amp;",
      '"': "&quot;",
      '\'': "&apos;",
      '<': "&lt;",
      '>': "&gt;"
  };
  return text.replace( /[&"'<>]/g, c => lookup[c] );
}

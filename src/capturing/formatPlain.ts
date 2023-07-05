import { tsToString } from "./tsToString";
import { Message } from "./types";
//@ts-expect-error
import TurndownService from "turndown";

type TurndownService = object;

const indentedQuoteRule = {
  filter: 'blockquote',
  replacement: function (content:string) {
    return content.trim().split('\n').map(line => "  "+line).join('\n');
  }
}

// TODO research if using unformatted event.body serves better
export function formatPlain(
  { ts, participant, body }: Message,
  service?: TurndownService
) {
  const datetime = tsToString(ts);
  const turndownService = service ?? (new TurndownService({strongDelimiter: "__"})).addRule('indentedQuote', indentedQuoteRule);
  const plainBody = turndownService.turndown(body);
  return `${participant.displayName}: ${datetime}
${plainBody}`;
}

import { tsToString } from "./tsToString";
import { Message } from "./types";
//@ts-expect-error
import TurndownService from "turndown";

type TurndownService = object;

export function formatMd(
  { ts, participant, body }: Message,
  service?: TurndownService
) {
  const datetime = tsToString(ts);
  const turndownService = service ?? new TurndownService({codeBlockStyle: "fenced"});
  return turndownService.turndown(`<blockquote>
    <b>${participant.displayName}</b>: <i>${datetime}</i><br>
    ${body}<blockquote>`);
}

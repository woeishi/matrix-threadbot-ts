import { isIHTMLContent } from "../messageEvent/guards";
import { ITextMessageContent } from "../messageEvent/types";
import { BELOW, CaptureOptions, HELP, HTML, PART } from "./types";



export function parseCommand(content: ITextMessageContent) {
  let options: CaptureOptions = {};
  if (isIHTMLContent(content)) {
    let cmdString = content.formatted_body.substring(
      content.formatted_body.indexOf("</a>") + 4
    );
    if (cmdString.startsWith(":")) cmdString = cmdString.substring(1);
    const words = cmdString.split(" ").filter((text) => text !== "");

    if (words.includes(BELOW)) options.below = true;
    if (words.includes(PART)) options.part = true;
    if (words.includes(HTML)) options.html = true;
    if (words.includes(HELP) || words.includes("?")) options.help = true;
  } else {
    throw new Error(
      `A message with mention must be html formatted, assuming not "${content.body}" is not`
    );
  }
  return options;
}

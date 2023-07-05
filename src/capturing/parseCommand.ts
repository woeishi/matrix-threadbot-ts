import { isIHTMLContent } from "../messageEvent/guards";
import { ITextMessageContent } from "../messageEvent/types";
import { BELOW, CaptureOptions, HELP, HTML, PART, PLAIN } from "./types";



export function parseCommand(content: ITextMessageContent) {
  let options: CaptureOptions = {};
  if (isIHTMLContent(content)) {
    let cmdString = content.formatted_body.substring(
      content.formatted_body.indexOf("</a>") + 4
    );
    if (cmdString.startsWith(":")) cmdString = cmdString.substring(1);
    const words = cmdString.split(" ").filter((text) => text !== "");

    for (const word of words) {
      switch (word) {
        case BELOW:
          if (!options.below)
            options.below = true;
          break;
        case PART:
          if (!options.part)
            options.part = true;
          break;
        case HTML:
          if (!options.format)
            options.format = HTML;
          break;
        case PLAIN:
          if (!options.format)
            options.format = PLAIN;
          break;
        case HELP:
        case "?":
          if (!options.help)
            options.help = true;
          break;
      }
    }
  } else {
    throw new Error(
      `A message with mention must be html formatted, assuming not "${content.body}" is not`
    );
  }
  return options;
}

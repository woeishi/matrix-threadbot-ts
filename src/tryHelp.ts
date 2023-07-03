import { Room } from "matrix-js-sdk";
import { TextMessageEvent } from "./messageEvent/types";
import { parseCommand } from "./capturing/parseCommand";
import { getHelpMessage } from "./capturing/helpMessage";

export function tryHelp(room: Room, textMessageEvent: TextMessageEvent) {
  const {help} = parseCommand(textMessageEvent.getContent());
  if (help) {
    const content = getHelpMessage();
    room.client.sendHtmlMessage(room.roomId, content, content);
  }
  room.client.sendTextMessage(room.roomId, "cannot work outside of a thread, sry!\n try 'help' for options");
}


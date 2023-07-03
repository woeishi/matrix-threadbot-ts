import { MatrixClient, Thread } from "matrix-js-sdk";
import {
  AudioMessageEvent,
  EmoteMessageEvent,
  FileMessageEvent,
  IFileContent,
  IMsgEvent,
  ImageMessageEvent,
  LocationMessageEvent,
  NoticeMessageEvent,
  TextMessageEvent,
  VideoMessageEvent,
} from "../messageEvent/types";
import {
  isIAudioMessage,
  isIFileMessage,
  isIImageMessage,
  isILocationMessage,
  isITextEmoteMessage,
  isITextMessage,
  isITextNoticeMessage,
  isIVideoMessage,
} from "../messageEvent/guards";
import { getBody } from "../messageEvent/content";
import { ILocationContent } from "matrix-js-sdk/lib/@types/location";
import { Message, Participant } from "./types";

export function parseMessage(
  thread: Thread,
  event: IMsgEvent,
  participants: Record<string, Participant>
) {
  const ts = event.getTs();
  const participant = parseParticipant(thread, event, participants);
  const body = parseBody(thread.client, event);
  return { ts, participant, body } as Message;
}

function parseParticipant(
  thread: Thread,
  event: IMsgEvent,
  participants: Record<string, Participant>
) {
  const memberId = event.getSender();
  let participant: Participant = {
    displayName: memberId?.substring(1, memberId?.indexOf(":")) ?? "",
    userId: memberId
  };
  if (!!memberId) {
    if (!participants[memberId]) {
      const member = thread.room.getMember(memberId);
      if (!!member) {
        participants[memberId] = { displayName: member.rawDisplayName, userId: memberId };
      } else {
        participants[memberId] = participant;
      }
    }
    participant = participants[memberId];
  }
  return participant;
}

function parseBody(client: MatrixClient, event: IMsgEvent) {
  if (
    isITextMessage(event) ||
    isITextEmoteMessage(event) ||
    isITextNoticeMessage(event)
  )
    return parseStringMessage(event);
  else if (isILocationMessage(event)) return parseLocationMessage(event);
  else if (
    isIFileMessage(event) ||
    isIImageMessage(event) ||
    isIAudioMessage(event) ||
    isIVideoMessage(event)
  )
    return parseFileMessage(client, event);
  else
    throw new Error(`encountered unknown message type ${event.getContent().msgtype}`);
}

const parseStringMessage = (
  event: TextMessageEvent | EmoteMessageEvent | NoticeMessageEvent
) => getBody(event.getContent());

const parseLocationMessage = (event: LocationMessageEvent) =>
  `<a href="${event.getContent<ILocationContent>().geo_uri}>${
    event.getContent<ILocationContent>().body
  }</a>`;

const parseFileMessage = (client: MatrixClient,
  event:
    | FileMessageEvent
    | ImageMessageEvent
    | AudioMessageEvent
    | VideoMessageEvent
) => {
  let url = event.getContent<IFileContent>().url;
  if (url.startsWith('mxc:')) {
    const http = client.mxcUrlToHttp(url, undefined, undefined, undefined, true);
    url = http ?? url;
  }
  return `<a href="${url}">${
      event.getContent<IFileContent>().body
    }</a>`;
}
  

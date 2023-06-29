import { MatrixClient, RoomEvent, Thread } from "matrix-js-sdk";
import { ITextMessageContent, TextMessageEvent } from "./messageEvent/types";
import { isIMessageEvent, isITextMessage } from "./messageEvent/guards";
import { isMention, isThreaded } from "./messageEvent/content";

export function listenNewMention(client: MatrixClient, onMention?: (thread: Thread, textMessageEvent: TextMessageEvent) => Promise<void>) {
  client.on(RoomEvent.Timeline, async (event, room) => {
    if (!!room && isIMessageEvent(event) && isITextMessage(event)) {
      const content = event.getContent<ITextMessageContent>();
      if (isMention(content, client.getUserId())) {
        if (!isThreaded(content)) {
            // TODO reply with info
        } else {
          const thread = room.getThread(content["m.relates_to"].event_id);
          if (!!thread && !!onMention) {
            // only needed if we don't await catchUp
            // const receipt = thread.getReadReceiptForUserId(client.getUserId()!);
            // if (!receipt || receipt.data.ts < event.getTs())

            await onMention(thread, event);
          }
        }
      }
      client.sendReadReceipt(event);
    }
  });
}


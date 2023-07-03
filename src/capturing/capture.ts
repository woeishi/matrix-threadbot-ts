import { Direction, Thread } from "matrix-js-sdk";
import { TextMessageEvent } from "../messageEvent/types";
import { parseCommand } from "./parseCommand";
import { isIMsgEvent } from "../messageEvent/guards";
import { isMention } from "../messageEvent/content";
import { paginate } from "../eventTimeline";
import { parseMessage } from "./parseMessage";
import { Participant } from "./types";
import { formatHtml } from "./formatHtml";
import { formatMd } from "./formatMd";
import { getDMRoomId } from "./getDMRoomId";

export async function capture(thread: Thread, textMessageEvent: TextMessageEvent) {
  if (!!thread.findEventById(textMessageEvent.getId() ?? "")) {
    const options = parseCommand(textMessageEvent.getContent());
    
    const formatFn = !!options.html ? formatHtml : formatMd;
    
    const timeline = thread.liveTimeline;
    await paginate(timeline, Direction.Backward, true); // TODO process per page instead of eager loading to start

    const participants:Record<string,Participant> = {};
    let content = "";
    
    for (const evt of timeline.getEvents().sort((a,b) => b.getTs()-a.getTs())) {
      if (evt.getId() !== textMessageEvent.getId() && evt.getSender() !== thread.client.getUserId() && isIMsgEvent(evt)) {
        if (isMention(evt.getContent(), thread.client.getUserId())) {
          if (options.part) {
            break;
          }
        } else {
          content = formatFn(parseMessage(thread, evt, participants)) +"\n\n"+content;
        }
      }
    }
    content = `<pre><code>${content}</code></pre>`;
    let destination: {roomId: string, threadId: string | null} = { roomId: thread.roomId, threadId: thread.id };
    if (!options.below) {
      const dmRoomId = await getDMRoomId(thread.client, textMessageEvent.getSender());
      if (!!dmRoomId) {
        content = `in response to <a href="https://matrix.to/#/${destination.roomId}/${textMessageEvent.getId()}">this prompt</a>:<br>${content}`;
        destination = { roomId: dmRoomId, threadId: null};
      }
    }
    thread.client.sendHtmlMessage(destination.roomId, destination.threadId, content, content);
  }
}
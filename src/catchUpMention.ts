import { Direction, MatrixClient, Thread } from "matrix-js-sdk";
import { paginate } from "./eventTimeline";
import { isIMessageEvent, isITextMessage } from "./messageEvent/guards";
import { isMention } from "./messageEvent/content";
import { TextMessageEvent } from "./messageEvent/types";

export async function catchUpMention(client: MatrixClient, onMention?: (thread: Thread, textMessageEvent: TextMessageEvent) => Promise<void>) {
  const userId = client.getUserId();
  if (!!userId) {
    const { joined_rooms } = await client.getJoinedRooms();
    for (const roomId of joined_rooms) {
      const room = client.getRoom(roomId);
      if (!!room) {
        await room.fetchRoomThreads();
        const threads = room.getThreads();
        for (const thread of threads) {
          const timeline = thread.liveTimeline;
          const readUpToId = thread.getEventReadUpTo(userId);
          let readUpToIndex = 0;
          if (!readUpToId) {
            await paginate(timeline, Direction.Backward, true);
          } else {
            let readEvent = timeline.getTimelineSet().findEventById(readUpToId);
            while (!readEvent) {
              await paginate(timeline, Direction.Backward);
              readEvent = timeline.getTimelineSet().findEventById(readUpToId);
            }
            timeline.getEvents().every((event, i) => {
              if (event.getId() === readUpToId) {
                readUpToIndex = i;
                return false;
              }
              return true;
            });
          }

          let lastEvent = null;
          timeline.getEvents().forEach(async (event, i) => {
            if (i >= readUpToIndex) {
              if (isIMessageEvent(event) && isITextMessage(event)) {
                const content = event.getContent();
                if (isMention(content, client.getUserId()) && !!onMention) {
                  
                  await onMention(thread, event);
                }
              }
            }
            lastEvent = event;
          });
          client.sendReadReceipt(lastEvent);
        }
      }
    }
  }
}


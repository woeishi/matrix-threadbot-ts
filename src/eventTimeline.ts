import { Direction, EventTimeline } from "matrix-js-sdk";

export const pagination = async (timeline: EventTimeline) => {
  const result: Record<Direction, boolean | null> = { b: null, f: null };
  if (timeline.paginationRequests.b !== null)
    result.b = await timeline.paginationRequests.b;
  if (timeline.paginationRequests.f !== null)
    result.f = await timeline.paginationRequests.f;
};

export const paginate = async (
  timeline: EventTimeline,
  direction: Direction,
  loop = false
) => {
  let requestedTimeline = timeline.getNeighbouringTimeline(direction);
  if (loop) {
    while (!!requestedTimeline) {
      timeline = requestedTimeline;
      requestedTimeline = timeline.getNeighbouringTimeline(direction);
    }
  } else {
    timeline = requestedTimeline ?? timeline;
  }
  await pagination(timeline);
  return timeline;
};

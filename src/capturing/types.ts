export type CaptureOptions = {
  below?: boolean;
  part?: boolean;
  html?: boolean;
}

export type Participant = {
  displayName: string;
  userId?: string;
}

export type Message = {
  ts: number,
  participant: Participant,
  body: string,
}
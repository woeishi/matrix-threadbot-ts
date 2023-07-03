export type CaptureOptions = {
  help?: boolean;
  below?: boolean;
  part?: boolean;
  html?: boolean;
}

export const HELP: keyof CaptureOptions = "help";
export const BELOW: keyof CaptureOptions = "below";
export const PART: keyof CaptureOptions = "part";
export const HTML: keyof CaptureOptions = "html";

export type Participant = {
  displayName: string;
  userId?: string;
}

export type Message = {
  ts: number,
  participant: Participant,
  body: string,
}
export type CaptureOptions = {
  help?: boolean;
  below?: boolean;
  part?: boolean;
  format?: FormatOptions;
}

type FormatOptions = typeof HTML | typeof MD | typeof PLAIN;

export const HELP: keyof CaptureOptions = "help";
export const BELOW: keyof CaptureOptions = "below";
export const PART: keyof CaptureOptions = "part";
export const HTML = "html";
export const MD = "md";
export const PLAIN = "plain";


export type Participant = {
  displayName: string;
  userId?: string;
}

export type Message = {
  ts: number,
  participant: Participant,
  body: string,
}
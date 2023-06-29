import { IContent, MsgType, MatrixEvent, EventType } from "matrix-js-sdk";

export interface IMsgEvent extends MatrixEvent {
  type: EventType.RoomMessage | EventType.RoomMessageEncrypted;
}

export interface IMessageContent<T extends MsgType> extends IContent {
  msgtype: T;
  body: string;
}

export interface IMessageEvent<T extends MsgType> extends IMsgEvent {
  content: IMessageContent<T>;
}

export interface IHTMLContent {
  format: "org.matrix.custom.html";
  formatted_body: string;
}

export interface ITextMessageContent extends IMessageContent<MsgType.Text> {}
export interface IHTMLMessageContent
  extends ITextMessageContent,
    IHTMLContent {}

export type TextMessageEvent = IMessageEvent<MsgType.Text>;

export interface ITextEmoteContent extends IMessageContent<MsgType.Emote> {}
export interface IHTMLEmoteContent extends ITextEmoteContent, IHTMLContent {}

export type EmoteMessageEvent = IMessageEvent<MsgType.Emote>;

export interface ITextNoticeContent extends IMessageContent<MsgType.Notice> {}
export interface IHTMLNoticeContent extends ITextNoticeContent, IHTMLContent {}

export type NoticeMessageEvent = IMessageEvent<MsgType.Notice>;

interface IThumbnailInfo {
  mimetype: string;
  size: number;
  h: number;
  w: number;
}

interface IInfo {
  thumbnail_info: IThumbnailInfo;
  thumbnail_url: string;
}

interface IEncryptedInfo {
  thumbnail_file: object;
  thumbnail_info: IThumbnailInfo;
}

export interface ILocationContent extends IMessageContent<MsgType.Location> {
  info: IInfo;
  geo_uri: object;
}

export type LocationMessageEvent = IMessageEvent<MsgType.Location>;

interface IFileInfo extends IInfo {
  mimetype: string;
  size: number;
}

interface IEncryptedFileInfo extends IEncryptedInfo {
  mimetype: string;
  size: number;
}

export interface IFileContent extends IMessageContent<MsgType.File> {
  info: IFileInfo;
  url: string;
}
export interface IEncryptedFileContent extends IMessageContent<MsgType.File> {
  info: IFileInfo;
  file: object;
}

export type FileMessageEvent = IMessageEvent<MsgType.File>;

interface IImageInfo extends IFileInfo {
  h: number;
  w: number;
}

interface IEncryptedImageInfo extends IEncryptedFileInfo {
  h: number;
  w: number;
}

export interface IImageContent extends IMessageContent<MsgType.Image> {
  info: IImageInfo;
  url: string;
}
export interface IEncryptedImageContent extends IMessageContent<MsgType.Image> {
  info: IImageInfo;
  file: object;
}

export type ImageMessageEvent = IMessageEvent<MsgType.Image>;

interface IAudioInfo {
  mimetype: string;
  size: number;
  duration: number;
}

export interface IAudioContent extends IMessageContent<MsgType.Audio> {
  info: IAudioInfo;
  url: string;
}
export interface IEncryptedAudioContent extends IMessageContent<MsgType.Audio> {
  info: IAudioInfo;
  file: object;
}

export type AudioMessageEvent = IMessageEvent<MsgType.Audio>;

interface IVideoInfo extends IFileInfo {
  duration: number;
  h: number;
  w: number;
}

interface IEncryptedVideoInfo extends IEncryptedFileInfo {
  duration: number;
  h: number;
  w: number;
}

export interface IVideoContent extends IMessageContent<MsgType.Video> {
  info: IVideoInfo;
  url: string;
}
export interface IEncryptedVideoContent extends IMessageContent<MsgType.Video> {
  info: IEncryptedVideoInfo;
  file: object;
}

export type VideoMessageEvent = IMessageEvent<MsgType.Video>;

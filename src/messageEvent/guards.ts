import { EventType, IContent, MsgType } from "matrix-js-sdk";
import {
  IAudioContent,
  IFileContent,
  IHTMLContent,
  IImageContent,
  ILocationContent,
  IMessageContent,
  IMessageEvent,
  IMsgEvent,
  ITextEmoteContent,
  ITextMessageContent,
  ITextNoticeContent,
  IVideoContent,
} from "./types";

export const isIMessageContent = <T extends MsgType>(
  content: IContent
): content is IMessageContent<T> =>
  !!content.msgtype && Object.values(MsgType).includes(content.msgtype as MsgType) && !!content.body;

export const isIHTMLContent = (content: IContent): content is IHTMLContent =>
  !!content && !!content.format && content.format === "org.matrix.custom.html";

export const isIMsgEvent = (object: any): object is IMsgEvent =>
  !!object &&
  (object.getType() === EventType.RoomMessage ||
    object.getType() === EventType.RoomMessageEncrypted);

export const isIMessageEvent = <T extends MsgType>(
  object: any
): object is IMessageEvent<T> =>
  isIMsgEvent(object) && isIMessageContent(object.getContent());

export const isITextMessageContent = (
  content: IContent
): content is ITextMessageContent => content.msgtype === MsgType.Text;

export const isITextMessage = (
  event: any
): event is IMessageEvent<MsgType.Text> =>
  isIMessageEvent(event) && isITextMessageContent(event.getContent());

export const isITextEmoteContent = (
  content: IContent
): content is ITextEmoteContent => content.msgtype === MsgType.Emote;

export const isITextEmoteMessage = (
  event: any
): event is IMessageEvent<MsgType.Emote> =>
  isIMessageEvent(event) && isITextEmoteContent(event.getContent());

export const isITextNoticeContent = (
  content: IContent
): content is ITextNoticeContent => content.msgtype === MsgType.Notice;

export const isITextNoticeMessage = (
  event: any
): event is IMessageEvent<MsgType.Notice> =>
  isIMessageEvent(event) && isITextNoticeContent(event.getContent());

export const isILocationContent = (
  content: IContent
): content is ILocationContent => content.msgtype === MsgType.Location;

export const isILocationMessage = (
  event: any
): event is IMessageEvent<MsgType.Location> =>
  isIMessageEvent(event) && isILocationContent(event.getContent());

export const isIFileContent = (content: IContent): content is IFileContent =>
  content.msgtype === MsgType.File;

export const isIFileMessage = (
  event: any
): event is IMessageEvent<MsgType.File> =>
  isIMessageEvent(event) && isIFileContent(event.getContent());

export const isIImageContent = (content: IContent): content is IImageContent =>
  content.msgtype === MsgType.Image;

export const isIImageMessage = (
  event: any
): event is IMessageEvent<MsgType.Image> =>
  isIMessageEvent(event) && isIImageContent(event.getContent());

export const isIAudioContent = (content: IContent): content is IAudioContent =>
  content.msgtype === MsgType.Audio;

export const isIAudioMessage = (
  event: any
): event is IMessageEvent<MsgType.Audio> =>
  isIMessageEvent(event) && isIAudioContent(event.getContent());

export const isIVideoContent = (content: IContent): content is IVideoContent =>
  content.msgtype === MsgType.Video;

export const isIVideoMessage = (
  event: any
): event is IMessageEvent<MsgType.Video> =>
  isIMessageEvent(event) && isIVideoContent(event.getContent());

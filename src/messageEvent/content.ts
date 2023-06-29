import { IContent, IEventRelation, RelationType } from "matrix-js-sdk";
import { isIHTMLContent } from "./guards";

interface IThreadEventRelation extends IEventRelation {
  rel_type: RelationType.Thread;
  event_id: string;
}

interface IThreadContent extends IContent {
  "m.relates_to": IThreadEventRelation
}

export const isThreaded = (content: IContent): content is IThreadContent => content["m.relates_to"]?.rel_type === RelationType.Thread;

export const isMention = (content: IContent, userId?: string | null) => isIHTMLContent(content) && content.formatted_body.includes(`/${userId}">`);

export const getBody = (content: IContent):string => isIHTMLContent(content) ? content.formatted_body : (content.body ?? "");
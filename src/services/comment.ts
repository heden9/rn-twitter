import request from "../utils/request";
import { Aid, Cid } from "../types";

export interface Comment {
  id: Cid;
  headImgUrl: string;
  nickname: string;
  content: string;
  pubTime: string;
  likeNum: number;
  isLike: boolean;
  rawPubTime: number;
}

export type CommentsResult = Comment[];

export function getComments(id: Aid): Promise<CommentsResult> {
  return request(`/comments/${id}`, {
    method: 'GET',
  });
}

export function postComment(id: Aid, content: string) {
  return request(`/comments/${id}`, {
    method: 'POST',
    body: {
      content,
      pComment: 0,
    },
  });
}

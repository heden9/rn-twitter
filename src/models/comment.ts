import { EffectsCommandMap } from "dva-core";
import format from "../utils/format";
import { CommentStore, Aid } from "../types";
import { getComments, CommentsResult } from "../services/comment";

export default {
  namespace: 'comment',
  state: {
    commentMap: {},
  },
  reducers: {
    fetchCommentsOk(state: CommentStore, { payload: { aid, comments } }: { payload: any }) {
      state.commentMap[aid] = comments;
    },
  },
  effects: {
    *fetchComments({ payload }: { payload: { aid: Aid } }, { call, put, select }: EffectsCommandMap) {
      console.log(payload)
      const data: CommentsResult = yield call(getComments, payload.aid);
      console.log(data);
      const comments = data.map(cm => ({
        cid: '' + cm.id,
        nickname: cm.nickname,
        avatar: cm.headImgUrl,
        content: format(cm.content),
        forward_count: 0,
        like_count: cm.likeNum,
        is_like: cm.isLike,
        created_at: cm.rawPubTime,
      }))
      yield put({ type: 'fetchCommentsOk', payload: { aid: payload.aid, comments } })
    },
  },
  subscriptions: {
      // setup({ dispatch }) {
      // },
  },
}

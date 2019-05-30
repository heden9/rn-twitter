import { keyBy } from "lodash";
import format from "../utils/format";
import { UserInfoMap, Store, FeedStore, Aid } from "../types";
import { EffectsCommandMap } from "dva-core";
import { getDynamics, DynamicsResult, changeLikes, LikesResult, DynamicDetailResult, getDynamicsDetail } from "../services/dynamic";
import { delay } from "../utils/delay";
const s = `LIVE NOW: Tune in to hear from mission experts on today's @OrbitalATK #Antares cargo launch to the International @Space_Station: nasa.gov/live Have questions? Use #askNASA `;

// const timeline: Timeline[] = new Array(100).fill(0).map((item, index) => ({
//   key: "" + index,
//   jsxText: res,
//   comment_count: 20,
//   forward_count: 14,
//   like_count: 10,
//   is_like: false,
//   uid: "" + (1000 + index),
//   pics: ["http://lorempixel.com/640/480/city"],
// }));

// const userInfo = keyBy(
//   new Array(100).fill(0).map((item, index) => ({
//     uid: "" + (1000 + index),
//     nickname: "NASA" + index,
//     avatar: `https://s3.amazonaws.com/uifaces/faces/twitter/g3d/128.jpg`,
//     follow_count: 100,
//     follow_me: false,
//     following: false,
//     verified: true,
//   })),
//   "uid",
// );

function arrToStrMap(obj: any, key: string = "key") {
  const map: UserInfoMap = {};
  const list: string[] = [];
  obj.forEach((item: any) => {
    const id = item[key];
    map[id] = item;
    list.push(id);
  });
  return { map, list };
}

export default {
  namespace: "feed",
  state: {
    limit: 12,
    timelineMap: {},
    timelineOrder: [],
    userInfoMap: {},
    offset: 0,
    hasMore: 1,
    refreshing: false,
    loading: false,
  },
  reducers: {
    changeLikeOk(
      state: FeedStore,
      { payload: { id, like } }: { payload: { id: string; like: boolean } },
    ) {
      state.timelineMap[id].is_like = like;
      if (like) {
        state.timelineMap[id].like_count += 1
      }else {
        state.timelineMap[id].like_count -= 1
      }
    },
    fetchTimelineOk(state: FeedStore, { payload: { userInfoMap, timelineMap, offset, hasMore, timelineOrder, refresh } }: { payload: any }) {
      state.offset = offset;
      state.hasMore = hasMore;
      Object.assign(state.timelineMap, timelineMap);
      Object.assign(state.userInfoMap, userInfoMap)
      state.timelineOrder = timelineOrder;
    },
    fetchArticleOk(state: FeedStore, { payload: article }: { payload: any }) {
      state.timelineMap[article.aid] = {
        ...state.timelineMap[article.aid],
        ...article,
      }
    },
    refreshOk(state: FeedStore, { payload: { refreshing } }: { payload: { refreshing: boolean }}) {
      state.refreshing = refreshing;
    },
    loadOk(state: FeedStore, { payload: { loading } }: { payload: { loading: boolean }}) {
      state.loading = loading;
    },
    spinOk(state: FeedStore, { payload: { refresh, spinning } }: { payload: { refresh: boolean, spinning: boolean }}) {
      if (refresh) {
        state.refreshing = spinning;
      } else {
        state.loading = spinning;
      }
    },
  },
  effects: {
    *fetchTimeline({ payload }: { payload: { refresh: boolean } }, { call, put, select }: EffectsCommandMap) {
      console.log(payload);
      const delayer = delay(1000);
      yield put({ type: 'spinOk', payload: { refresh: payload.refresh, spinning: true } });

      const { offset, timelineOrder, limit } = yield select((state: Store) => state.feed);

      // fetch data from 0 when refresh
      const data: DynamicsResult = yield call(getDynamics, { offset: payload.refresh ? 0 : offset, limit });
      console.log(data);
      const rawTimeline = [];
      const rawUserInfoMap: any = {};
      for (const dy of data.dynamics) {
        const newDy = {
          key: '' + dy.id,
          aid: '' + dy.id,
          brief: format(dy.brief),
          comment_count: dy.commentNum,
          forward_count: 0,
          like_count: dy.likeNum,
          is_like: dy.isLike,
          uid: '' + dy.uid,
          pics: dy.img,
          created_at: dy.rawPubTime,
        };
        rawTimeline.push(newDy);
        rawUserInfoMap[newDy.uid] = {
          uid: newDy.uid,
          nickname: dy.nickname,
          avatar: dy.headImgUrl,
          follow_count: 0,
          follow_me: false,
          following: false,
          verified: true,
        }
      }

      const { map, list } = arrToStrMap(rawTimeline);
      // min timeout is 1000ms
      yield delayer;
      yield put({
        type: 'fetchTimelineOk',
        payload: {
          userInfoMap: rawUserInfoMap,
          timelineMap: map,
          timelineOrder: payload.refresh ? list : timelineOrder.concat(list),
          offset: data.offset,
          hasMore: data.hasMore,
        },
      });
      yield put({ type: 'spinOk', payload: { refresh: payload.refresh, spinning: false } });
    },

    *changeLikes({ payload }: { payload: { dId: string, isLike: boolean} }, { call, put, all }: EffectsCommandMap) {
      const [data]: [LikesResult] = yield all([
        call(changeLikes, payload.dId, payload.isLike),
        put({ type: 'changeLikeOk', payload: { id: payload.dId, like: payload.isLike } }),
      ]);
      // reset
      if (!data) {
        yield put({ type: 'changeLikeOk', payload: { id: payload.dId, like: !payload.isLike } });
      }
    },

    *fetchArticle({ payload }: { payload: { aid: Aid } }, { call, put, select }: EffectsCommandMap) {
      const data: DynamicDetailResult = yield call(getDynamicsDetail, payload.aid);
      const article = {
        key: '' + data.id,
        aid: '' + data.id,
        content: format(data.content),
        comment_count: data.commentNum,
        forward_count: 0,
        like_count: data.likeNum,
        is_like: data.isLike,
        pics: data.img,
        created_at: data.rawPubTime,
      }
      yield put({ type: 'fetchArticleOk', payload: article })
    },
  },
  subscriptions: {
    // setup({ dispatch }) {}
  },
};

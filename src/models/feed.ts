import { keyBy } from "lodash";
import format from "../utils/format";
import { ITimelineItem, IUserMap, IStore, IFeedType } from "../types";
const s = `LIVE NOW: Tune in to hear from mission experts on today's @OrbitalATK #Antares cargo launch to the International @Space_Station: nasa.gov/live Have questions? Use #askNASA `;
const res = format(s);
const timeline: ITimelineItem[] = new Array(10).fill(0).map((item, index) => ({
  key: "" + index,
  jsxText: res,
  comment_count: 20,
  forward_count: 14,
  like_count: 10,
  is_like: false,
  uid: "" + (1000 + index),
  pics: ["http://lorempixel.com/640/480/city"]
}));
const userInfo = keyBy(
  new Array(10).fill(0).map((item, index) => ({
    uid: "" + (1000 + index),
    nick_name: "NASA" + index,
    avatar: `https://s3.amazonaws.com/uifaces/faces/twitter/aleinadsays/${128}.jpg`,
    follow_count: 100,
    follow_me: false,
    following: false,
    verified: true
  })),
  "uid"
);
function arrToStrMap(obj: any, key: string = "key") {
  const map: IUserMap = {};
  const list: string[] = [];
  obj.forEach((item: any) => {
    map[item[key]] = item;
    list.push(item[key]);
  });
  return { map, list };
}

export default {
  namespace: "feed",
  state: {
    timeline: arrToStrMap(timeline),
    userMap: userInfo
  },
  reducers: {
    like_change(
      state: IFeedType,
      { payload: { id, like } }: { payload: { id: string; like: boolean } }
    ) {
      state.timeline.map[id].is_like = like;
      if (like) {
        state.timeline.map[id].like_count += 1
      }else {
        state.timeline.map[id].like_count -= 1
      }
    }
  },
  effects: {
    // *fetch(action, { call, put }) {}
  },
  subscriptions: {
    // setup({ dispatch }) {}
  }
};

import format from "../utils/format";
import { ITimelineItem } from "../types";
const s = `LIVE NOW: Tune in to hear from mission experts on today's @OrbitalATK #Antares cargo launch to the International @Space_Station: nasa.gov/live Have questions? Use #askNASA `;
const res = format(s);
const timeline: ITimelineItem[] = new Array(10).fill(0).map((item, index) => ({
  key: "" + index,
  jsxText: res,
  comment_count: 20,
  forward_count: 14,
  like_count: 10,
  uid: "1000",
  pics: ["http://lorempixel.com/640/480/city"]
}));
const userInfo = {
  "1000": {
    uid: "1000",
    nick_name: "NASA",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/aleinadsays/128.jpg",
    follow_count: 100,
    follow_me: false,
    following: false,
    verified: true
  }
};
function objToStrMap(obj: any) {
  const strMap = new Map();
  for (const k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
export default {
  namespace: "feed",
  state: {
    timeline,
    userMap: objToStrMap(userInfo)
  },
  reducers: {
    save() {}
  },
  effects: {
    // *fetch(action, { call, put }) {}
  },
  subscriptions: {
    // setup({ dispatch }) {}
  }
};

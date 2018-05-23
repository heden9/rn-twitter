import format from "../utils/format";
import { TimelineItem } from "../types";
const s = `LIVE NOW: Tune in to hear from mission experts on today's @OrbitalATK #Antares cargo launch to the International @Space_Station: nasa.gov/live Have questions? Use #askNASA `;
const res = format(s);
const timeline: Array<TimelineItem> = new Array(10)
  .fill(0)
  .map((item, index) => ({
    key: "" + index,
    jsxText: res,
    // comment_count: ,
  }));

export default {
  namespace: "feed",
  state: {
    timeline: timeline,
    userInfoMap: new Map(),
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

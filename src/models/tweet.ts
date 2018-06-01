import { ITweetType } from "../types";

export default {
  namespace: "tweet",
  state: {
    tmpContent: ""
  },
  reducers: {
    save(state: ITweetType, { payload: { tmpContent } }: { payload: any }) {
      state.tmpContent = tmpContent;
    }
  },
  effects: {
    // *fetch(action, { call, put }) {
    // },
  },
  subscriptions: {
    // setup({ dispatch }) {
    // },
  }
};

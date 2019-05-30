import { EffectsCommandMap } from "dva-core";
import { TweetStore, Store } from "../types";
import { postDynamics } from "../services/timeline";

export default {
  namespace: "tweet",
  state: {
    dratContent: "",
  },
  reducers: {
    save(state: TweetStore, { payload: { dratContent } }: { payload: any }) {
      state.dratContent = dratContent;
    },
  },
  effects: {
    *commit({}, { call, put, select }: EffectsCommandMap) {
      const { dratContent } = yield select((state: Store) => state.tweet);
      const data = yield call(postDynamics, dratContent);
      console.log(data);
      if (data.id) {
        yield put({ type: 'save', payload: { dratContent: '' } });
      }
      return !!data.id;
    },
  },
  subscriptions: {
    // setup({ dispatch }) {
    // },
  },
};

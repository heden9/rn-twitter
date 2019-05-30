import { signIn, signUp, checkLogin } from '../services/user';
import { EffectsCommandMap } from "dva-core";
import { UserStore } from '../types';

export default {

  namespace: 'user',

  state: {
    id: '',
    nickname: '',
    headImgUrl: '',
  },

  subscriptions: {
  },

  effects: {
    *login({ payload }: { payload: Parameters<typeof signIn>[0] }, { call, put }: EffectsCommandMap) {  // eslint-disable-line
      console.log(payload);
      const data = yield call(signIn, payload);
      console.log(data);
      if (!data) {
        return false;
      }
      yield put({ type: 'signInSuccess', payload: data });
      return true;
    },

    *autoLogin(_: any, { call, put }: EffectsCommandMap) {  // eslint-disable-line
      const data = yield call(checkLogin);
      if (!data) {
        return;
      }
      yield put({ type: 'signInSuccess', payload: data });
    },
  },

  reducers: {
    signInSuccess(state: UserStore, { payload: { id, headImgUrl, nickname } }: { payload: { id: string, nickname: string, headImgUrl: string }}) {
      state.id = id;
      state.nickname = nickname;
      state.headImgUrl = headImgUrl;
    },
  },

};

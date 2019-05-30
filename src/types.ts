import { NavigationScreenProps } from "react-navigation";
import { ViewProps } from "react-native";
import { NavigationStackRouterConfig } from "react-navigation";

export type Uid = string;
export type JsxText = string | JSX.Element
export interface Timeline {
  key: string,
  jsxText: JsxText[],
  comment_count: number,
  forward_count: number,
  like_count: number,
  is_like: boolean,
  created_at: number | string,
  pics: string[],
  uid: Uid,
}
export interface UserInfo {
  uid: Uid,
  nick_name: string,
  avatar: string,
  follow_count: number,
  follow_me: boolean,
  following: boolean,
  verified: boolean
}
export interface UserInfoMap {
  [key: string]: UserInfo
}
export interface TimelineData {
  map: {
    [key: string]: Timeline,
  },
  list: string[]
}
export interface FeedStore {
  timelineMap: {
    [key: string]: Timeline,
  },
  timelineOrder: string[],
  userInfoMap: UserInfoMap,
  offset: number;
  hasMore: number;
  refreshing: boolean;
  loading: boolean;
}

export interface TweetStore {
  dratContent: string
}

export interface UserStore {
  id: string,
  nickname: string,
  headImgUrl: string
}

export interface Store {
  feed: FeedStore,
  tweet: TweetStore,
  user: UserStore,
  loading: any;
}

// global alias

export type NavigationProps = NavigationScreenProps['navigation'];
export type Style = ViewProps['style'];
export type NavigationOptions = NavigationStackRouterConfig['navigationOptions'];

import { NavigationScreenProps } from "react-navigation";
import { ViewProps } from "react-native";
import { NavigationStackRouterConfig } from "react-navigation";

export type Uid = string;
export type Aid = string;
export type Cid = string;
export type JsxText = string | JSX.Element
export interface Timeline {
  key: string,
  aid: Aid,
  brief: JsxText[],
  content?: JsxText[],
  comment_count: number,
  forward_count: number,
  like_count: number,
  is_like: boolean,
  created_at: number,
  pics: string[],
  uid: Uid,
}
export interface UserInfo {
  uid: Uid,
  nickname: string,
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

export interface CommentData {
  cid: Cid,
  content: JsxText[],
  comment_count: number,
  forward_count: number,
  like_count: number,
  is_like: boolean,
  created_at: number,
}

export interface CommentStore {
  commentMap: {
    [key: string]: CommentData[],
  }
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
  comment: CommentStore,
  loading: any;
}

// global alias

export type NavigationProps = NavigationScreenProps['navigation'];
export type Style = ViewProps['style'];
export type NavigationOptions = NavigationStackRouterConfig['navigationOptions'];

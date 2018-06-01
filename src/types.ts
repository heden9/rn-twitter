
import * as React from 'react'
type Uid = string;
export type JsxText = string | JSX.Element
export interface ITimelineItem {
  key: string,
  jsxText: JsxText[],
  comment_count: number,
  forward_count: number,
  like_count: number,
  is_like: boolean,
  created_at?: number | string,
  pics: string[],
  uid: Uid,
}
export interface IUserInfo {
  uid: Uid,
  nick_name: string,
  avatar: string,
  follow_count: number,
  follow_me: boolean,
  following: boolean,
  verified: boolean
}
export interface IUserMap {
  [key: string]: IUserInfo
}
export interface ITimeline {
  map: {
    [key: string]: ITimelineItem
  },
  list: string[]
}
export interface IFeedType {
  timeline: ITimeline,
  userMap: IUserMap
}

export interface ITweetType {
  tmpContent: string
}
export interface IStore {
  feed: IFeedType,
  tweet: ITweetType
}



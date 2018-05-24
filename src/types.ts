
import * as React from 'react'
type Uid = string;
export type JsxText = string | JSX.Element
export interface ITimelineItem {
  key: string,
  jsxText: JsxText[],
  comment_count: number,
  forward_count: number,
  like_count: number,
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
export type UserMap = Map<Uid, IUserInfo>
export interface ITimeline {
  map: Map<any, ITimelineItem>,
  list: string[]
}
export interface IFeedType {
  timeline: ITimeline,
  userMap: UserMap
}
export interface IStore {
  feed: IFeedType,
}

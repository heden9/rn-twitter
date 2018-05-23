
import * as React from 'react'
type Uid = string;
type JsXtext = [string, React.ReactElement<any>]
export interface TimelineItem {
  key: string,
  jsXtext: JsXtext[],
  comment_count: number,
  forward_count: number,
  like_count: number,
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
export interface FeedType {
  timeline: TimelineItem[],
  user: Map<Uid, UserInfo>
}
export interface Store {
  feed: FeedType,
}

import { NavigationProps, UserInfo, Timeline } from "../../types";

export interface FeedListItemProps {
  timeline: Timeline;
  userInfo: UserInfo;
  onLike: (key: string, like: boolean) => void;
  navigation: NavigationProps;
}

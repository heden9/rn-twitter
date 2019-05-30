import { NavigationScreenProps } from "react-navigation";
import { Timeline, UserInfoMap } from "../../types";

export interface FeedProps extends NavigationScreenProps {
  timelineMap: {
    [key: string]: Timeline;
  };
  refreshing: boolean;
  loading: boolean;
  hasMore: boolean;
  timelineOrder: string[];
  userInfoMap: UserInfoMap;
  onLike(id: string, like: boolean): void;
  onFetch(): void;
  onRefresh(): void;
}

export interface FeedState {
  refreshing: boolean;
}

import { UserInfo, Timeline } from "../../types";
import { ViewStyle } from "react-native";

export interface FeedCardProps {
  timeline: Timeline;
  userInfo: UserInfo;
  onLike: (key: string, like: boolean) => void;
  onCardPress: (timeline: Timeline, userInfo: UserInfo) => void;
  onAvatarPress: (timeline: Timeline, userInfo: UserInfo) => void;
}

export interface ArticleCardProps {
  timeline: Timeline;
  userInfo: UserInfo;
  onPress?: () => void;
}

export interface ActionBarProps {
  buttonStyle?: ViewStyle;
  iconSize?: number;
}

export interface ActionBarIconProps {
  onPress?: () => void;
  style?: ViewStyle;
  iconSize?: number;
  iconName?: string;
  label?: string | number;
}

export interface CardActionBarProps {
  buttonStyle?: ViewStyle;
  iconSize: number;
  commentCount: number;
  forwardCount: number;
  likeCount: number;
  initialLike: boolean;
  onForward: () => void;
  onShare: () => void;
  onLike: (isLike: boolean) => void;
  onComment: () => void;
}

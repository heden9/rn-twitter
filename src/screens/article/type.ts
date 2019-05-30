import { NavigationScreenProps } from "react-navigation";
import { Timeline, UserInfo, Uid, Aid, CommentData } from "../../types";

export interface ArticleNavigationParams {
  uid: Uid;
  aid: Aid;
}

export interface ArticleProps extends NavigationScreenProps<ArticleNavigationParams> {
  timeline: Timeline;
  userInfo: UserInfo;
  uid: Uid;
  aid: Aid;
  onLike(isLike: boolean): void;
  onFetch(): void;
}

export interface CommentsProps {
  aid: Aid;
  uid: Uid;
  comments: CommentData[];
  onFetch(): void;
}

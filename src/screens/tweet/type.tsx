import { NavigationScreenProps } from "react-navigation";

export interface TweetProps extends NavigationScreenProps {
  content: string;
  headImgUrl: string;
  onChange(content: string): void;
}

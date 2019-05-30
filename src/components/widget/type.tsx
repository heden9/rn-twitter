import { ViewStyle, TouchableOpacityProps } from "react-native";

export interface BtnLikeProps {
  count: string | number;
  size?: number;
  initialLike: boolean;
  countShow?: boolean;
  style?: ViewStyle;
  onPress?: (like: boolean) => void;
}

export interface BtnLikeState {
  like: boolean;
  count?: number;
}

export interface MyLottieProps {
  source: string | number;
  _ref?: any;
  style?: ViewStyle;
}

export interface AvatarProps {
  onPress?: TouchableOpacityProps['onPress'];
  size?: number;
  style?: ViewStyle;
  uri: string;
}

export interface BtnTweetProps {
  onPress?: TouchableOpacityProps['onPress'];
  style?: ViewStyle;
}

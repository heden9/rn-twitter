import React, { ReactElement } from "react";
import {
  Image,
  View,
  Text as RNText,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  TouchableWithoutFeedbackProps,
  ViewProps,
  TouchableOpacityProps,
} from "react-native";
import Colors from "../constants/Colors";
const { Lottie } = require("expo").DangerZone;
const { createIconSetFromIcoMoon } = require("@expo/vector-icons");
const icoMoonConfig = require("../assets/fonts/config.json");

export const Icon = createIconSetFromIcoMoon(icoMoonConfig);
const margin = 20;
const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
  button: {
    borderRadius: 15,
    overflow: "hidden",
  },
  pen: {
    marginRight: margin,
  },
  toolsBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  toolsText: {
    color: Colors.tabIconDefault,
    fontSize: 16,
    marginLeft: 3,
  },
  touchContainer: {
    height: 45,
    paddingVertical: 6,
    alignItems: "center",
    flexDirection: "row",
  },
  toolsBarItem: {
    flex: 1,
  },
  lottieContainer: {
    // position: "relative",
    height: 20,
    width: 20,
    // marginTop: -7,
    // backgroundColor: 'red',
  },
  lottie: {
    position: "absolute",
    // top: "-50%",
    // left: "-50%",
    ...Platform.select({
      ios: {
        width: 65,
        height: 65,
        top: -12,
        left: -11.5,
      },
      android: {
        width: 70,
        height: 70,
        top: -25,
        left: -25,
      },
    }),
  },
  androidLottie: {
    position: "absolute",
  },
  like: {
    color: Colors.likeColor,
  },
});

const noop = () => {};

interface IAvatarProps {
  onPress?: TouchableOpacityProps['onPress'];
  width?: number;
  style?: ViewProps['style'];
  uri: string;
}

export const Avatar: React.SFC<IAvatarProps> = ({ onPress = noop, width = 30, style = {}, uri }) => {
  return (
    <TouchableHighlight style={[styles.button, { borderRadius: width / 2, width, height: width }, style]} onPress={onPress}>
      <Image
        style={[styles.image, { width, height: width }]}
        source={{ uri }}
      />
    </TouchableHighlight>
  );
}

interface ITweetEntryProps {
  onPress: TouchableOpacityProps['onPress'];
}

export const TweetEntry: React.SFC<ITweetEntryProps> = ({ onPress = noop }) => {
  return (
    <TouchableOpacity style={styles.pen} onPress={onPress}>
      <Icon name={"pen"} size={26} color={Colors.tabIconSelected} />
    </TouchableOpacity>
  );
}

interface ILikeButtonProps {
  likeCount: string | number;
  initialLike: boolean;
  countShow?: boolean;
  style?: ViewProps['style'];
  onPress?: (like: boolean) => void;
}

interface ILikeButtonState {
  like: boolean;
  likeCount?: number;
}

export class LikeButton extends React.PureComponent<
  ILikeButtonProps,
  ILikeButtonState
> {
  static getDerivedStateFromProps(
    nextProps: ILikeButtonProps,
    prevState: ILikeButtonState,
  ) {
    const likeCount = +nextProps.likeCount;
    return {
      ...prevState,
      like: nextProps.initialLike,
      likeCount,
    };
  }
  animation: React.RefObject<any>;
  state = {
    like: false,
    likeCount: 0,
  };
  constructor(props: ILikeButtonProps) {
    super(props);
    this.animation = React.createRef();
  }
  componentDidUpdate() {
    this.setAnimationStep();
  }
  componentDidMount() {
    this.setAnimationStep();
  }
  setAnimationStep = () => {
    const { like } = this.state;
    if (like) {
      this.animation.current.play(120, 120);
    } else {
      this.animation.current.reset();
    }
  };
  toggle = () => {
    const { like, likeCount } = this.state;
    if (like) {
      this.animation.current.reset();
    } else {
      this.animation.current.play(30, 120);
    }
    this.setState({
      like: !like,
      likeCount: !like ? likeCount + 1 : +this.props.likeCount,
    });

    if (this.props.onPress) {
      this.props.onPress(!like);
    }
  };
  render() {
    const { likeCount, like } = this.state;
    const { countShow = true, style } = this.props;
    const likeStyle = like ? styles.like : {};
    return (
      <TouchableWithoutFeedback onPress={this.toggle}>
        <View style={[styles.touchContainer, style]}>
          {MyLottie({
            _ref: this.animation,
            source: require("../assets/lottie/heart.json"),
          })}
          {countShow && (
            <RNText style={[styles.toolsText, likeStyle]}>{likeCount}</RNText>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

interface IMyLottieProps {
  source: string | number;
  _ref?: any;
}

export const MyLottie: React.SFC<IMyLottieProps> = ({ source, _ref }) => {
  return (
    <View style={styles.lottieContainer}>
      <Lottie
        loop={false}
        style={styles.lottie}
        ref={_ref}
        source={source}
        resizeMode={"cover"}
      />
    </View>
  );
}

interface IToolsBarOptionsItem {
  key: string;
  onPress?: () => void;
  icon?: string;
  label?: string | number;
  IconCpt?: ReactElement<any>;
}

interface IToolsBarProps {
  options: IToolsBarOptionsItem[];
  buttonStyle?: any;
  iconSize?: number;
}

export const ToolsBar: React.SFC<IToolsBarProps> = ({
  options,
  buttonStyle = {},
  iconSize = 20,
}) => {
  return (
    <React.Fragment>
      {/* {children({ options, buttonStyle, iconSize })} */}
      <View style={styles.toolsBar}>
        {options.map(item => {
          const { onPress = noop } = item;
          return (
            <View style={styles.toolsBarItem} key={item.key}>
              {item.IconCpt ? (
                React.cloneElement(item.IconCpt, {
                  ...item,
                  style: [styles.touchContainer, buttonStyle],
                })
              ) : (
                <TouchableWithoutFeedback onPress={onPress}>
                  <View style={[styles.touchContainer, buttonStyle]}>
                    {item.icon && (
                      <Icon
                        name={item.icon}
                        size={iconSize}
                        color={Colors.tabIconDefault}
                      />
                    )}
                    {item.label && (
                      <RNText style={styles.toolsText}>{item.label}</RNText>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          );
        })}
      </View>
    </React.Fragment>
  );
}

interface IToolsBar2Props {
  buttonStyle?: ViewProps['style'];
  iconSize?: number;
}

interface IToolsBar2IconProps {
  onPress?: TouchableWithoutFeedbackProps['onPress'];
  style?: ViewProps['style'];
  iconSize?: number;
  iconName?: string;
  label?: string | number;
}

export const ToolsBar2: React.SFC<IToolsBar2Props> & { Icon: React.SFC<IToolsBar2IconProps> } = ({ buttonStyle = {}, children }) => {
  return (
    <View style={styles.toolsBar}>
      {React.Children.map(children, (child: any, i) => {
        return (
          <View style={styles.toolsBarItem}>
            {React.cloneElement(child, {
              style: buttonStyle,
            })}
          </View>
        );
      })}
    </View>
  );
}

ToolsBar2.Icon = ({ onPress = noop, style = {}, iconSize = 20, iconName, label }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.touchContainer, style]}>
        {iconName && (
          <Icon
            name={iconName}
            size={iconSize}
            color={Colors.tabIconDefault}
          />
        )}
        {label && <RNText style={styles.toolsText}>{label}</RNText>}
      </View>
    </TouchableWithoutFeedback>
  );
};

interface ITwitterIconProps {
  name: string;
  selected?: boolean;
}

export function TwitterIcon({ name, selected = false }: ITwitterIconProps) {
  const color = selected ? Colors.tabIconSelected : Colors.tabIconDefault;
  return (
    <Icon name={name} size={26} style={{ marginBottom: -3 }} color={color} />
  );
}

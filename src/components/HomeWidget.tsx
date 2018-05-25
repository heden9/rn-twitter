import React, { ReactElement } from "react";
import {
  Image,
  View,
  Text as RNText,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import Colors from "../constants/Colors";
const { Lottie } = require("expo").DangerZone;
import { Button } from "native-base";
const { createIconSetFromIcoMoon } = require("@expo/vector-icons");
const icoMoonConfig = require("../assets/fonts/config.json");
export const Icon = createIconSetFromIcoMoon(icoMoonConfig);
interface ITwitterIconProps {
  name: string;
  selected: boolean;
}

export function TwitterIcon({ name, selected = false }: ITwitterIconProps) {
  const color = selected ? Colors.tabIconSelected : Colors.tabIconDefault;
  return (
    <Icon name={name} size={26} style={{ marginBottom: -3 }} color={color} />
  );
}
const margin = 20;
const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  button: {
    borderRadius: 15,
    marginLeft: margin,
    overflow: "hidden"
  },
  pen: {
    marginRight: margin
  },
  toolsBar: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  toolsText: {
    color: Colors.tabIconDefault,
    fontSize: 16,
    marginLeft: 3
  },
  touchContainer: {
    height: 45,
    paddingVertical: 6,
    alignItems: "center",
    flexDirection: "row"
  },
  toolsBarItem: {
    flex: 1
  },
  lottieContainer: {
    // position: "relative",
    height: 20,
    width: 20
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
        left: -11.5
      },
      android: {
        width: 70,
        height: 70,
        top: -25,
        left: -25
      }
    })
  },
  androidLottie: {
    position: "absolute"
  },
  like: {
    color: Colors.likeColor
  }
});
const noop = () => {};
export function Avatar({ onPress = noop }) {
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <Image
        style={styles.image}
        source={require("../assets/images/avatar.jpg")}
      />
    </TouchableHighlight>
  );
}
export function TweetEntry({ onPress = noop }) {
  return (
    <TouchableOpacity style={styles.pen} onPress={onPress}>
      <Icon name={"pen"} size={26} color={Colors.tabIconSelected} />
    </TouchableOpacity>
  );
}
interface ILikeButtonProps {
  like_count: string | number;
  initialLike: boolean;
  show_count?: boolean;
  style?: any;
  onPress?: (like: boolean) => void;
}
interface ILikeButtonState {
  like: boolean;
  like_count?: number;
}
export class LikeButton extends React.PureComponent<
  ILikeButtonProps,
  ILikeButtonState
> {
  static defaultProps = {
    onPress: noop
  };
  static getDerivedStateFromProps(
    nextProps: ILikeButtonProps,
    prevState: ILikeButtonState
  ) {
    const { like } = prevState;
    const like_count = +nextProps.like_count;
    return {
      ...prevState,
      like: nextProps.initialLike,
      like_count
    };
  }
  animation: React.RefObject<any>;
  state = {
    like: false,
    like_count: 0
  };
  constructor(props: any) {
    super(props);
    this.animation = React.createRef();
  }
  componentDidUpdate() {
    this.setAnimationStep()
  }
  componentDidMount() {
    this.setAnimationStep()
  }
  setAnimationStep = () => {
    const { like, like_count } = this.state;
    if (like) {
      this.animation.current.play(120, 120);
    } else {
      this.animation.current.reset();
    }
  }
  toggle = () => {
    const { like, like_count } = this.state;
    if (like) {
      this.animation.current.reset();
    } else {
      this.animation.current.play(30, 120);
    }
    this.setState({
      like: !like,
      like_count: !like ? like_count + 1 : +this.props.like_count
    });
    this.props.onPress(!like);
  };
  render() {
    const { like_count, like } = this.state;
    const { show_count = true, style = styles.touchContainer } = this.props;
    const likeStyle = like ? styles.like : {};
    return (
      <TouchableWithoutFeedback onPress={this.toggle}>
        <View style={style}>
          {MyLottie({
            _ref: this.animation,
            source: require("../assets/lottie/heart.json")
          })}
          {show_count && (
            <RNText style={[styles.toolsText, likeStyle]}>{like_count}</RNText>
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
export function MyLottie({ source, _ref }: IMyLottieProps) {
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
interface IOptionsItem {
  key: string;
  onPress?: () => void;
  icon?: string;
  label?: string | number;
  IconCpt?: ReactElement<any>;
}
interface IToolsBarProps {
  options: IOptionsItem[];
  buttonStyle?: any;
  iconSize?: number;
  children?: any;
}
export function ToolsBar({
  options,
  buttonStyle = {},
  iconSize = 20,
  children = noop
}: IToolsBarProps) {
  return (
    <React.Fragment>
      {children({ options, buttonStyle, iconSize })}
      <View style={styles.toolsBar}>
        {options.map(item => {
          const { onPress = noop } = item;
          return (
            <View style={styles.toolsBarItem} key={item.key}>
              {item.IconCpt ? (
                React.cloneElement(item.IconCpt, {
                  ...item,
                  style: [styles.touchContainer, buttonStyle]
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

export function ToolsBar2({
  buttonStyle = {},
  iconSize = 20,
  children
}: any) {
  return (
    <View style={styles.toolsBar}>
      {React.Children.map(children, (child, i) => {
        return <View style={styles.toolsBarItem}>{child}</View>;
      })}
    </View>
  );
}
ToolsBar2.Icon = (props: any) => {
  const { onPress, style, icon, label } = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.touchContainer, style]}>
        {icon && (
          <Icon
            name={icon.name}
            size={icon.size}
            color={Colors.tabIconDefault}
          />
        )}
        {label && <RNText style={styles.toolsText}>{label}</RNText>}
      </View>
    </TouchableWithoutFeedback>
  );
};

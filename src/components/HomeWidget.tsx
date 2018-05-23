import React, { ReactElement } from "react";
import {
  Image,
  View,
  Text as RNText,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback
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
    width: 45,
    height: 45,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center"
  },
  lottieContainer: {
    position: "relative",
    height: 20,
    width: 20
  },
  lottie: {
    position: "absolute",
    width: 60,
    height: 60,
    top: "-50%",
    left: "-50%"
  }
});
const noop = () => {};
export function Avatar({ onPress = noop }) {
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri:
            "https://pbs.twimg.com/profile_images/941537711810158593/aDLJWEHU_normal.jpg"
        }}
      />
    </TouchableHighlight>
  );
}
export function Pen({ onPress = noop }) {
  return (
    <TouchableOpacity style={styles.pen} onPress={onPress}>
      <Icon name={"pen"} size={26} color={Colors.tabIconSelected} />
    </TouchableOpacity>
  );
}
export class LikeButton extends React.PureComponent {
  animation: any;
  play = () => {
    console.log(this.animation)
    // this.animation.play();
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.play}>
        <View style={styles.touchContainer}>
          {
            MyLottie({
              source: require("../assets/lottie/heart.json")
            })
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

interface IMyLottieProps {
  source: string | number;
  _ref?: any;
}
export function MyLottie ({ source, _ref }: IMyLottieProps) {
  return (
    <View style={styles.lottieContainer}>
      <Lottie loop={false} style={styles.lottie} ref={_ref} source={source} />
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

export function ToolsBar({ options }: { options: IOptionsItem[] }) {
  return (
    <View style={styles.toolsBar}>
      {options.map(item => {
        const { onPress = noop } = item;
        return (
          <View style={{ flex: 1 }} key={item.key}>
            {item.IconCpt ? (
              React.cloneElement(item.IconCpt, { ...item })
            ) : (
              <Button onPress={onPress} iconLeft transparent light>
                {item.icon && (
                  <Icon
                    name={item.icon}
                    size={20}
                    color={Colors.tabIconDefault}
                  />
                )}
                {item.label && (
                  <RNText style={styles.toolsText}>{item.label}</RNText>
                )}
              </Button>
            )}
          </View>
        );
      })}
    </View>
  );
}

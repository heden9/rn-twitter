import * as React from "react";
import {
  TextInput,
  View,
  Keyboard,
  StyleSheet,
  Animated,
  Easing,
  Platform,
  SafeAreaView
} from "react-native";
import { Item, Input } from "native-base";
import Colors from "../constants/Colors";
import isIPX from "../utils/isIpx";
const HEIGHT = isIPX ? 80 : 49;
interface IReplayInputProps {
  style?: any;
}
const styles = StyleSheet.create({
  replayContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    alignItems: "center",
    backgroundColor: Colors.tabBar,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderTopColor: Colors.borderColor,
    borderTopWidth: 1
  }
});
export default class ReplayInput extends React.Component<IReplayInputProps> {
  keyboardDidShowListener: any;
  keyboardDidHideListener: any;
  state = {
    bottom: new Animated.Value(0)
  };
  componentDidMount() {
    const keyboardShowEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const keyboardHideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    this.keyboardDidShowListener = Keyboard.addListener(
      keyboardShowEvent,
      this._keyboardWillShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      keyboardHideEvent,
      this._keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardWillShow = (e: any) => {
    console.log("Keyboard Shown", e.endCoordinates.height);
    Animated.timing(this.state.bottom, {
      toValue: e.endCoordinates.height - HEIGHT, // 目标值
      duration: e.duration, // 动画时间
      easing: Easing.bezier(0.1, 0.76, 0.55, 0.9)
    }).start();
  };

  _keyboardWillHide = (e: any) => {
    console.log("Keyboard Hidden");
    Animated.timing(this.state.bottom, {
      toValue: 0, // 目标值
      duration: 110 // 动画时间
      // easing: Easing.bezier(0.1, 0.76, 0.55, 0.9),
    }).start();
  };

  render() {
    return (
      <SafeAreaView>
        <Animated.View
          style={[styles.replayContainer, { bottom: this.state.bottom }]}
        >
          <Item
            rounded
            style={{ backgroundColor: Colors.bgColor, borderWidth: 0 }}
          >
            <Input
              placeholder="发表回复"
              style={{
                height: 33,
                paddingLeft: 13,
                color: Colors.inputColor,
                marginTop: -2
              }}
            />
          </Item>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

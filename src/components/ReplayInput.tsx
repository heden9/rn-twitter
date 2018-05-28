import * as React from "react";
import { TextInput, View, Keyboard, StyleSheet, Animated, Easing } from "react-native";
import { Item, Input } from "native-base";
import Colors from "../constants/Colors";
interface IReplayInputProps {
  style?: any;
}
const styles = StyleSheet.create({
  replayContainer: {
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    zIndex: 999,
    alignItems: "center",
    backgroundColor: Colors.tabBar,
    paddingVertical: 20
  }
});
export default class ReplayInput extends React.Component<IReplayInputProps> {
  state = {
    text: "",
    bottom: new Animated.Value(0),
  };
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    console.log("Keyboard Shown", e.startCoordinates.height);
    Animated.timing(this.state.bottom, {
      toValue: e.startCoordinates.height - 20, // 目标值
      duration: 100, // 动画时间
      // easing: Easing.linear, // 缓动函数
      // useNativeDriver: true
    }).start();
  }

  _keyboardDidHide = () => {
    console.log("Keyboard Hidden");
    Animated.timing(this.state.bottom, {
      toValue: 0, // 目标值
      duration: 100, // 动画时间
      // easing: Easing.linear, // 缓动函数
      // useNativeDriver: true
    }).start();
  }

  render() {
    return (
      <Animated.View style={[styles.replayContainer, { bottom: this.state.bottom }]}>
        <Item rounded>
          <Input placeholder="Rounded Textbox" />
        </Item>
      </Animated.View>
    );
  }
}

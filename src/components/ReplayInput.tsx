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
    text: "",
    bottom: new Animated.Value(0),
  };
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this._keyboardWillShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this._keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardWillShow = (e: any) => {
    console.log("Keyboard Shown", e.startCoordinates.height);
    Animated.timing(this.state.bottom, {
      toValue: e.startCoordinates.height - 25, // 目标值
      duration: 210, // 动画时间
    }).start();
  }

  _keyboardWillHide = () => {
    console.log("Keyboard Hidden");
    Animated.timing(this.state.bottom, {
      toValue: 0, // 目标值
      duration: 110, // 动画时间
    }).start();
  }

  render() {
    return (
      <Animated.View style={[styles.replayContainer, { bottom: this.state.bottom }]}>
        <Item rounded style={{ backgroundColor: Colors.bgColor, borderWidth: 0 }}>
          <Input placeholder="发表回复" style={{ height: 33, paddingLeft: 13, color: Colors.inputColor, marginTop: -2 }} />
        </Item>
      </Animated.View>
    );
  }
}

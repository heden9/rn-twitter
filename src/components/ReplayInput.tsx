import * as React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { Item, Input } from "native-base";
import Colors from "../constants/Colors";
import isIPX from "../utils/isIpx";
const HEIGHT = isIPX ? 83 : 49;
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
export default class ReplayInput extends React.PureComponent<IReplayInputProps> {
  render() {
    return (
      <View style={styles.replayContainer}>
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
        <KeyboardSpacer topSpacing={-HEIGHT}/>
      </View>
    );
  }
}

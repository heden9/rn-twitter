import React from "react";
import { StyleSheet, TouchableHighlight } from "react-native";
import Colors from '../constants/Colors'
import {
  Text,
} from "native-base";
import { JsxText } from '../types'
const styles = StyleSheet.create({
  default: {

  },
  attention: {
    color: Colors.tintColor,
    lineHeight: 20,
  },
  topic: {
    color: Colors.tintColor,
    lineHeight: 20
  }
})
type types = 'attention' | 'topic' | 'default';
const noop = () => {}
const buttonCreator = (s: string, type: types) => {
  return (
    <TouchableHighlight underlayColor={'#eee'} style={{ marginBottom: -3 }} key={s} onPress={noop}>
      <Text style={styles[type]}>{s}</Text>
    </TouchableHighlight>
  )
}
export default function Format(source: string): JsxText[] {
  const regx = /(#[0-9a-zA-Z\\u4e00-\\u9fa5\_]+)|(@([^\s|\/|:|@]+))/ig;
  let res
  let start = 0;
  const jsxArr = [];
  while(res = regx.exec(source)) {
    const s = res[0];
    const index = res.index;
    jsxArr.push(source.slice(start, index));
    start = index + s.length;
    if (s.startsWith('@')) {
      jsxArr.push(buttonCreator(s, 'attention'));
    }else if (s.startsWith('#')) {
      jsxArr.push(buttonCreator(s, 'topic'))
    }
  }
  return jsxArr;
}

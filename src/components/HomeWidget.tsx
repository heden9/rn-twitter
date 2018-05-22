import React, { ReactElement } from "react";
import {
  Image,
  View,
  Text as RNText,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";
const {
  Text,
  ActionSheet,
  Button
} = require("native-base");
const { createIconSetFromIcoMoon } = require("@expo/vector-icons");
const icoMoonConfig = require("../assets/fonts/config.json");
export const Icon = createIconSetFromIcoMoon(icoMoonConfig);
interface TwitterIconProps {
	name: string,
	selected: boolean
}

export function TwitterIcon({ name, selected = false }: TwitterIconProps) {
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
interface optionsItem {
  key: string;
  icon?: string;
  label?: string | number;
  IconCpt?: ReactElement<any>;
}
const Options: Array<optionsItem> = [
  {
    key: "comment",
    icon: "comment",
    label: "12"
  },
  {
    key: "forward",
    icon: "forward",
    label: "12"
  },
  {
    key: "upload",
    icon: "upload"
  }
];
export function ToolsBar({ options = Options }) {
  return (
    <View style={styles.toolsBar}>
      {options.map(item => {
        return (
          <View style={{ flex: 1 }} key={item.key}>
            {item.IconCpt ? (
              React.cloneElement(item.IconCpt, { ...item })
            ) : (
              <Button iconLeft transparent light>
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

import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableWithoutFeedback, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { Icon } from '../widget';
import { ActionBarProps, ActionBarIconProps } from './types';

const styles = StyleSheet.create({
  bar: {
    overflow: 'hidden',
    flexDirection: "row",
    justifyContent: "space-around",
  },
  barItem: {
    flex: 1,
  },

  iconWrap: {
    height: 45,
    paddingVertical: 6,
    alignItems: "center",
    flexDirection: "row",
  },
  iconText: {
    color: Colors.tabIconDefault,
    fontSize: 16,
    marginLeft: 3,
  },
});

export const ActionBar: React.SFC<ActionBarProps> & { Icon: React.SFC<ActionBarIconProps> } = ({ buttonStyle = {}, children }) => {
  return (
    <View style={styles.bar}>
      {React.Children.map(children, (child: any, i) => {
        return (
          <View style={styles.barItem}>
            {React.cloneElement(child, {
              style: buttonStyle,
            })}
          </View>
        );
      })}
    </View>
  );
}

ActionBar.Icon = ({ onPress = () => {}, style = {}, iconSize = 20, iconName, label }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.iconWrap, style]}>
        {!!iconName && (
          <Icon
            name={iconName}
            size={iconSize}
            color={Colors.tabIconDefault}
          />
        )}
        {!!label && <Text style={styles.iconText}>{label}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

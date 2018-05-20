import React from 'react';
// import { withNavigationFocus } from 'react-navigation'
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import icoMoonConfig from '../assets/fonts/config.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);

// @withNavigationFocus
export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.selected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

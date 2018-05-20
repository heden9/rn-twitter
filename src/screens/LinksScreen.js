import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation'
import { ExpoConfigView } from '@expo/samples';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import FacebookTabBar from './FacebookTabBar'

export default createMaterialTopTabNavigator({
    tab1: ExpoConfigView,
    tab2: ExpoConfigView,
    tab3: ExpoConfigView,
}, {
    lazy: true,
    initialRouteName: 'tab2',
    animationEnabled: false
})

import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation'
import { ExpoConfigView } from '@expo/samples';

export default createMaterialTopTabNavigator({
    tab1: ExpoConfigView,
    tab2: ExpoConfigView,
    tab3: ExpoConfigView,
}, {
    lazy: true,
    initialRouteName: 'tab1',
    animationEnabled: false
})

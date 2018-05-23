import React, { Component } from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  NavigationStackRouterConfig,
  NavigationRouteConfig,
  NavigationScreenConfig,
  NavigationStackScreenOptions
} from "react-navigation";
import Colors from "../constants/Colors";
import { TwitterIcon } from "../components/HomeWidget";
import Home from "../screens/Home";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

const TabBottom = require("../components/TabBottom").default;

const createTabScreen = (name: string, screen: NavigationRouteConfig, icon: string) => {
  if (screen.navigationOptions instanceof Function) {
    const _tmp = screen.navigationOptions;
    screen.navigationOptions = (props: any) => ({
      ..._tmp(props),
      headerStyle: {
        backgroundColor: Colors.tabBar,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor
      }
    });
  } else {
    screen.navigationOptions = {
      ...screen.navigationOptions,
      headerStyle: {
        backgroundColor: Colors.tabBar,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor
      }
    };
  }
  const TabStackScreen = createStackNavigator(
    {
      [name]: screen
    },
    {}
  );
  TabStackScreen.navigationOptions = {
    tabBarLabel: name,
    tabBarIcon: ({ focused }: any) => (
      <TwitterIcon selected={focused} name={`${icon}${focused ? "-o" : ""}`} />
    )
  };
  return TabStackScreen;
};

const BottomTabs = createBottomTabNavigator(
  {
    HomeStack: createTabScreen("主页", Home, "home"),
    SearchStack: createTabScreen("搜索", LinksScreen, "search"),
    SettingsStack: createTabScreen("通知", SettingsScreen, "n"),
    LetterStack: createTabScreen("私信", SettingsScreen, "letter")
  },
  {
    tabBarComponent: TabBottom,
    // activeTintColor: '#F44336',
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: Colors.tabBar,
        borderTopWidth: 1,
        borderTopColor: Colors.borderColor
      }
    }
  }
);
const TabsInDrawer = createDrawerNavigator({
  SimpleTabs: {
    screen: BottomTabs,
    navigationOptions: {
      drawer: () => ({
        label: "Simple Tabs"
      })
    }
  }
});
// createStackNavigator({
//   drawer: TabsInDrawer
// })
export default TabsInDrawer;

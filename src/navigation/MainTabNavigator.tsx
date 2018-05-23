import React, { Component } from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  NavigationRouteConfig,
  NavigationRouteConfigMap
} from "react-navigation";
import Colors from "../constants/Colors";
import { TwitterIcon } from "../components/HomeWidget";
import Home from "../screens/Home";
import Article from "../screens/Article";
import Tweet from "../screens/Tweet";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

const TabBottom = require("../components/TabBottom").default;

const createTabScreen = (
  routeConfigMap: NavigationRouteConfigMap,
  icon: string
) => {
  const TabStackScreen = createStackNavigator(routeConfigMap, {
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.tabBar,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor
      }
    }
  });
  TabStackScreen.navigationOptions = {
    tabBarLabel: icon,
    showIcon: true,
    tabBarIcon: ({ focused }: any) => (
      <TwitterIcon selected={focused} name={`${icon}${focused ? "-o" : ""}`} />
    )
  };
  return TabStackScreen;
};
const HomeStack = createTabScreen(
  {
    home: {
      screen: Home,
      path: '/'
    },
    article: {
      screen: Article,
      path: '/article/:id'
    }
  },
  "home"
);
const SearchStack = createTabScreen(
  {
    search: LinksScreen
  },
  "search"
);
const SettingsStack = createTabScreen(
  {
    n: SettingsScreen
  },
  "n"
);
const LetterStack = createTabScreen(
  {
    letter: SettingsScreen
  },
  "letter"
);
const BottomTabs = createBottomTabNavigator(
  {
    HomeStack: {
      screen: HomeStack,
      path: '/'
    },
    SearchStack,
    SettingsStack,
    LetterStack
  },
  {
    tabBarComponent: TabBottom,
    // activeTintColor: '#F44336',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
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
export default createStackNavigator(
  {
    drawer: TabsInDrawer,
    tweet: Tweet
  },
  {
    // initialRouteName: "drawer",
    navigationOptions: {
      header: null
    },
    mode: "modal"
  }
);

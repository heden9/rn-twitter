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
    initialRouteName: icon,
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
    tabBarIcon: ({ focused }: any) => (
      <TwitterIcon selected={focused} name={`${icon}${focused ? "-o" : ""}`} />
    )
  };
  return TabStackScreen;
};

const BottomTabs = createBottomTabNavigator(
  {
    HomeStack: createTabScreen(
      {
        home: Home,
        article: Article
      },
      "home"
    ),
    SearchStack: createTabScreen(
      {
        search: LinksScreen
      },
      "search"
    ),
    SettingsStack: createTabScreen(
      {
        n: SettingsScreen
      },
      "n"
    ),
    LetterStack: createTabScreen(
      {
        letter: SettingsScreen
      },
      "letter"
    )
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
export default createStackNavigator(
  {
    drawer: TabsInDrawer,
    tweet: Tweet
  },
  {
    initialRouteName: "drawer",
    navigationOptions: {
      header: null
    },
    mode: "modal"
  }
);

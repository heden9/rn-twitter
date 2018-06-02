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
import Person from "../screens/Person";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

const { default: TabBarBottom } = require("../components/TabBottom");

const { ExpoConfigView } = require("@expo/samples");
const createTabScreen = (
  routeConfigMap: NavigationRouteConfigMap,
  icon: string,
  config?: any
) => {
  const TabStackScreen = createStackNavigator(routeConfigMap, {
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Colors.tabBar,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor
      }
    },
    ...config
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
const BottomTabs = createBottomTabNavigator(
  {
    HomeStack: {
      screen: createTabScreen(
        {
          home: {
            screen: Home,
            path: "/"
          },
          article: {
            screen: Article,
            path: "/article/:id"
          },
          person: {
            screen: Person,
            path: "/person/:id"
          }
        },
        "home",
      ),
      path: "/"
    },
    SearchStack: createTabScreen(
      {
        search: LinksScreen
      },
      "search"
    ),
    SettingsStack: createTabScreen(
      {
        n: ExpoConfigView
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
    tabBarComponent: TabBarBottom,
    // activeTintColor: '#F44336',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: Colors.tabBar,
        borderTopColor: Colors.borderColor
      }
    }
  }
);
const TabsInDrawer = createDrawerNavigator(
  {
    SimpleTabs: {
      screen: BottomTabs,
      navigationOptions: {
        gesturesEnabled: false,
        title: "Reservering"
      }
    }
  },
  {
    drawerLockMode: "locked-closed"
  }
);
export default createStackNavigator(
  {
    drawer: {
      screen: TabsInDrawer,
      navigationOptions: {
        header: null
      }
    },
    tweet: Tweet
  },
  {
    // initialRouteName: "tweet",
    // navigationOptions: {
    //   header: null
    // },
    mode: "modal",
    cardStyle: {
      backgroundColor: Colors.bgColor
    }
  }
);

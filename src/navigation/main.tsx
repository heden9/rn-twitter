import React from "react";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  NavigationRouteConfigMap,
} from "react-navigation";
import Colors from "../constants/Colors";
import { TwitterIcon } from "../components/home-widget";
import Feed from "../screens/feed";
import Article from "../screens/article";
import Tweet from "../screens/tweet";
import Person from "../screens/person";
import LinksScreen from "../screens/link";
import LoginScreen from '../screens/login';
import AuthLoadingScreen from '../screens/auth-loading';
import SettingsScreen from "../screens/settings";
import Me from '../screens/me';

const { default: TabBarBottom } = require("../components/TabBottom");
const { ExpoConfigView } = require("@expo/samples");

const createTabScreen = (
  routeConfigMap: NavigationRouteConfigMap,
  icon: string,
  config?: any,
) => {
  const TabStackScreen = createStackNavigator(routeConfigMap, {
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Colors.tabBar,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
      },
    },
    cardStyle: {
      backgroundColor: Colors.bgColor,
    },
    ...config,
  })
  TabStackScreen.navigationOptions = {
    tabBarLabel: icon,
    showIcon: true,
    tabBarIcon: ({ focused }: any) => (
      <TwitterIcon selected={focused} name={`${icon}${focused ? "-o" : ""}`} />
    ),
  };
  return TabStackScreen;
};

const AppMainTabs = createBottomTabNavigator(
  {
    HomeStack: {
      screen: createTabScreen(
        {
          home: {
            screen: Feed,
            path: "/",
          },
          article: {
            screen: Article,
            path: "/article/:id",
          },
          person: {
            screen: Person,
            path: "/person/:id",
          },
        },
        "home",
      ),
      path: "/",
    },
    SearchStack: createTabScreen(
      {
        search: LinksScreen,
      },
      "search",
    ),
    SettingsStack: createTabScreen(
      {
        n: ExpoConfigView,
      },
      "n",
    ),
    LetterStack: createTabScreen(
      {
        letter: SettingsScreen,
      },
      "letter",
    ),
  },
  {
    tabBarComponent: TabBarBottom,
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      style: {
        backgroundColor: Colors.tabBar,
        borderTopColor: Colors.borderColor,
      },
    },
  },
)

const AppMainStack = createStackNavigator(
  {
    drawer: {
      screen: AppMainTabs,
      navigationOptions: {
        header: null,
      },
    },
    tweet: Tweet,
  },
  {
    // initialRouteName: "tweet",
    // navigationOptions: {
    //   header: null
    // },
    mode: "modal",
    cardStyle: {
      backgroundColor: Colors.bgColor,
    },
  },
);

const AppAuthStack = createStackNavigator({
  login: LoginScreen,
})

// const AppMainDrawer = createDrawerNavigator(
//   {
//     Me: {
//       screen: Me,
//       navigationOptions: {
//         gesturesEnabled: false,
//         title: "Reservering",
//       },
//     },
//     App: AppMainStack,
//   },
//   // {
//   //   drawerLockMode: "locked-closed"
//   // }
// );
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppMainStack,
    Auth: AppAuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));

import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
// import { createMaterialBottomTabNavigator as createBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import TabBarIcon from "../components/TwitterIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

const createTabScreen = (name, screen, icon) => {
  const TabStackScreen = createStackNavigator({
    [name]: screen
  });
  TabStackScreen.navigationOptions = {
    tabBarLabel: name,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon selected={focused} name={`${icon}${focused ? "-o" : ""}`} />
    ),
    tabBarOptions: {
      showLabel: false
    }
  };
  return TabStackScreen;
};

export default createBottomTabNavigator(
  {
    HomeStack: createTabScreen("主页", HomeScreen, "home"),
    LinksStack: createTabScreen("搜索", LinksScreen, "search"),
    SettingsStack: createTabScreen("私信", SettingsScreen, "n")
  },
  {
    shifting: false,
    // activeTintColor: '#F44336',
    tabBarOptions: {
      showLabel: false
    }
  }
);

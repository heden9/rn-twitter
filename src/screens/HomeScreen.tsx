import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import {
  NavigationScreenConfig,
  NavigationStackScreenOptions
} from "react-navigation";
import {
  Container,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
import { MonoText } from "../components/StyledText";
import { Avatar, Pen } from "../components/HomeWidget";
import List from '../components/List';
export default class HomeScreen extends React.Component {
  static navigationOptions: NavigationScreenConfig<
    NavigationStackScreenOptions
  > = props => {
    const { openDrawer }: any = props.navigation;
    return {
      title: "主页",
      headerLeft: <Avatar onPress={() => openDrawer()} />,
      headerRight: <Pen />
    };
  };

  render() {
    return (
      <Container>
        <List />
      </Container>
    );
  }
}

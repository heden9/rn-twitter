import React from "react";
import { Container, Content } from "native-base";
import {
  NavigationScreenConfig,
  NavigationStackScreenOptions
} from "react-navigation";
import { Text, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
interface IArticleProps {
  navigation: any;
}
const styles = StyleSheet.create({
  replayContainer: {
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    zIndex: 999,
    alignItems: "center",
    backgroundColor: Colors.tabBar,
    paddingVertical: 20
  }
});
export default class Article extends React.PureComponent<IArticleProps> {
  static navigationOptions = {
    title: "推文"
  };
  componentDidMount() {
    console.log(this.props.navigation.state);
  }
  render() {
    return (
      <Container>
        <Content>
          <Text>page: Article</Text>
        </Content>
        <View style={styles.replayContainer}>
          <Text>replay</Text>
        </View>
      </Container>
    );
  }
}

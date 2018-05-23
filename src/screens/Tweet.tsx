import React from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Title,
  Right,
  Button
} from "native-base";
import {
  NavigationScreenConfig,
  NavigationStackScreenOptions
} from "react-navigation";
import { Text } from "react-native";

export default class Tweet extends React.PureComponent {
  static navigationOptions = {
    title: "发推"
  };
  render() {
    return (
      <Container style={{ backgroundColor: '#fff'}}>
        <Header style={{ backgroundColor: '#fff'}}>
          <Left />
          <Right >
            <Button rounded info onPress={() => this.props.navigation.navigate('article')}>
              <Text>发推</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <Text>page: tweet</Text>
        </Content>
      </Container>
    );
  }
}

import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Icon,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
} from "native-base";
import { connect } from "../utils/dva";
import { Store, NavigationOptions } from "../types";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

class LoginScreen extends React.PureComponent<any> {
  static navigationOptions: NavigationOptions = {
    headerTitle: (
      <Icon name="logo-twitter" style={{ color: Colors.tintColor }} />
    ),
  };

  state = {
    username: "",
    password: "",
  };

  onUsernameChange = (username: string) => {
    this.setState({
      username,
    });
  };

  onPasswordChange = (password: string) => {
    this.setState({
      password,
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <Container>
        <Form>
          <Item>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              onChangeText={this.onUsernameChange}
              placeholder="手机号码、邮箱或用户名"
            />
          </Item>
          <Item last>
            <Input
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={this.onPasswordChange}
              placeholder="密码"
            />
          </Item>
          <Button block onPress={this.login}>
            <Text>Sign in</Text>
          </Button>
        </Form>
      </Container>
    );
  }

  login = async () => {
    const isLoginSuccess = await this.props.login(
      this.state.username,
      this.state.password,
    );

    // success
    if (isLoginSuccess) {
      this.props.navigation.navigate("App");
    }
  };
}

export default connect(
  ({ user }: Store) => {
    return {};
  },
  dispatch => {
    return {
      login(username: string, password: string) {
        return dispatch({
          type: "user/login",
          payload: { username, password },
        });
      },
    };
  },
)(LoginScreen);

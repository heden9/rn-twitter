import React from "react";
import {
  Container,
  Header,
  Left,
  Right,
  Text,
  Button,
  Textarea
} from "native-base";
import {
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import { Icon } from "../components/HomeWidget";
import { connect } from "../utils/dva";
import { IStore } from "../types";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { Avatar } from "../components/HomeWidget";
import { NavigationStackRouterConfig } from "react-navigation";
import { SafeAreaView } from "react-navigation";
const GAP = 15;
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 0
    // paddingBottom: 20
  },
  button: {
    width: 56,
    borderRadius: 20,
    height: 34
  },
  buttonText: {
    color: "#fff",
    flex: 1,
    textAlign: "center"
  },
  textarea: {
    flexDirection: "row"
  }
});
export interface ITweetProps {
  navigation: any;
  content: string;
  goBack: any;
}

const ContainerHeight = Layout.window.height - Layout.HeaderHeight;

interface IContentBoxProps {
  content?: string;
  onChange?: any;
}

function mapStateToProps({ tweet }: IStore) {
  return {
    content: tweet.tmpContent
  };
}

class ContentBox extends React.Component<IContentBoxProps> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    const { onChange, content } = this.props;
    return (
      <View
        style={{
          backgroundColor: "#fff",
          height: ContainerHeight,
          paddingTop: 12
        }}
      >
        <View style={styles.textarea}>
          <Avatar width={40} style={{ marginLeft: GAP }} />
          <Textarea
            rowSpan={10}
            autoFocus
            style={{ flex: 1, paddingRight: GAP }}
            placeholderTextColor={Colors.tabIconDefault}
            maxLength={120}
            placeholder="有什么新鲜事？"
            defaultValue={content}
            onChangeText={onChange}
          />
        </View>
      </View>
    );
  }
}
const ConnectedBox = connect(
  mapStateToProps,
  dispatch => {
    return {
      onChange(tmpContent: string) {
        dispatch({ type: "tweet/save", payload: { tmpContent } });
      }
    };
  }
)(ContentBox);

class Tweet extends React.PureComponent<ITweetProps> {
  static navigationOptions: NavigationStackRouterConfig["navigationOptions"] = {
    title: "发推",
    header: null,
    headerTransparent: true,
    headerLeft: null,
  };
  render() {
    const { content, goBack } = this.props;
    return (
      <Container>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <Header
            style={{
              backgroundColor: "#fff",
              borderBottomWidth: 0
            }}
          >
            <Left>
              <TouchableOpacity onPress={goBack}>
                <Icon
                  name={"x"}
                  size={24}
                  style={{ marginBottom: -3 }}
                  color={"rgb(29, 161, 242)"}
                />
              </TouchableOpacity>
            </Left>
            <Right>
              <Button style={{ height: 34, marginRight: 0 }} transparent>
                <Text style={{ color: "rgb(29, 161, 242)" }}>草稿</Text>
              </Button>
              <Button
                disabled={!content}
                style={{
                  width: 56,
                  borderRadius: 20,
                  height: 34
                }}
                info
                onPress={goBack}
              >
                <RNText style={styles.buttonText}>发推</RNText>
              </Button>
            </Right>
          </Header>

          <ScrollView style={{ flex: 1 }}>
            <ConnectedBox />
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}
export default connect(
  mapStateToProps,
  (_, props: ITweetProps) => {
    return {
      goBack() {
        props.navigation.goBack();
      }
    };
  }
)(Tweet);

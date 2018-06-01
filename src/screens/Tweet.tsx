import React from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Title,
  Right,
  Text,
  Button,
  Textarea
} from "native-base";
import {
  NavigationScreenConfig,
  NavigationStackScreenOptions
} from "react-navigation";
import {
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Platform
} from "react-native";
import { Icon } from "../components/HomeWidget";
import { connect } from "../utils/dva";
import { IStore } from "../types";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import isIPX from "../utils/isIpx";
import { Avatar } from "../components/HomeWidget";
const GAP = 15;
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    paddingLeft: GAP,
    paddingRight: GAP
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
}

const HeaderHeight = Platform.OS === "ios" ? (isIPX ? 88 : 64) : 56;
const ContainerHeight = Layout.window.height - HeaderHeight;

interface IContentBoxProps {
  content?: string;
  onChange?: any;
}

function mapStateToProps({ tweet }: IStore) {
  console.log(tweet);
  return {
    content: tweet.tmpContent
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    onChange(tmpContent: string) {
      dispatch({ type: "tweet/save", payload: { tmpContent } });
    }
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
const ConnectedBox = connect(mapStateToProps, mapDispatchToProps)(ContentBox);

class Tweet extends React.PureComponent<ITweetProps> {
  static navigationOptions = {
    title: "发推",
    header: null
  };
  render() {
    const { content } = this.props;
    console.log("tweet", content);
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
              style={styles.button}
              info
              onPress={() => this.props.navigation.goBack()}
            >
              <RNText style={styles.buttonText}>发推</RNText>
            </Button>
          </Right>
        </Header>
        <ScrollView style={{ flex: 1 }}>
          <ConnectedBox />
        </ScrollView>
      </Container>
    );
  }
}
export default connect(mapStateToProps)(Tweet);

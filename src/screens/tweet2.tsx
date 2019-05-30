import React from "react";
import {
  Container,
  Header,
  Left,
  Right,
  Text,
  Button,
  Textarea,
} from "native-base";
import {
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Icon } from "../components/home-widget";
import { connect } from "../utils/dva";
import { Store, NavigationOptions, Style } from "../types";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { Avatar } from "../components/home-widget";
import {
  NavigationStackRouterConfig,
  NavigationScreenProps,
  HeaderBackButtonProps,
} from "react-navigation";
import { SafeAreaView } from "react-navigation";
const GAP = 15;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    paddingTop: 0,
    // paddingBottom: 20
  },
  headerLeftWrap: {
    flexDirection: "row",
  },
  btnDrat: {
    height: 34,
    marginRight: 0,
  },
  btnDratText: {
    color: "rgb(29, 161, 242)",
  },
  btnTweet: {
    width: 56,
    borderRadius: 20,
    height: 34,
  },
  btnTweetText: {
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  messageArea: {
    paddingTop: 12,
    backgroundColor: "#fff",
  },
  messageAreaInner: {
    flexDirection: "row",
  },
});

export interface ITweetProps extends NavigationScreenProps {
  content: string;
  headImgUrl: string;
  goBack(): void;
  onChange(content: string): void;
}

interface ITweetHeaderLeftProps {
  disabledTweet: boolean;
  onTweet(): void;
  onDrat(): void;
}

class Tweet extends React.PureComponent<ITweetProps> {
  static navigationOptions: NavigationOptions = {
    title: "发推",
    header: null,
  };

  static HeaderLeftBtnGroup: React.SFC<ITweetHeaderLeftProps> = ({
    disabledTweet,
    onTweet,
    onDrat,
  }) => {
    return (
      <Right>
        <Button transparent style={styles.btnDrat as any} onPress={onDrat}>
          <Text style={styles.btnDratText}>草稿</Text>
        </Button>
        <Button
          info
          disabled={disabledTweet}
          style={styles.btnTweet as any}
          onPress={onTweet}
        >
          <RNText style={styles.btnTweetText}>发推</RNText>
        </Button>
      </Right>
    );
  };

  renderMessageArea() {
    const { onChange, content, headImgUrl } = this.props;
    return (
      <ScrollView style={styles.messageArea}>
        <View style={styles.messageAreaInner}>
          <Avatar width={40} style={{ marginLeft: GAP }} uri={headImgUrl} />
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
      </ScrollView>
    );
  }

  renderHeader() {
    const { goBack, content } = this.props;
    return (
      <Header
        style={styles.header as any}
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
        <Tweet.HeaderLeftBtnGroup disabledTweet={!content} onTweet={goBack} onDrat={goBack}/>
      </Header>
    );
  }

  render() {
    return (
      <Container>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          {this.renderHeader()}
          {this.renderMessageArea()}
        </SafeAreaView>
      </Container>
    );
  }
}

export default connect(
  ({ tweet, user }: Store) => {
    return {
      content: tweet.dratContent,
      headImgUrl: user.headImgUrl,
    };
  },
  (dispatch, props: ITweetProps) => {
    return {
      goBack() {
        props.navigation.goBack();
      },
      onChange(dratContent: string) {
        dispatch({ type: "tweet/save", payload: { dratContent } });
      },
    };
  },
)(Tweet);

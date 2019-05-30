import React from "react";
import {
  Container,
  Text,
  Button,
  Textarea,
} from "native-base";
import {
  Text as RNText,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { Icon, Avatar } from "../../components/widget";
import { connect } from "../../utils/dva";
import { Store, NavigationOptions } from "../../types";
import Colors from "../../constants/Colors";
import styles from "./style";
import { TweetProps } from "./type";

interface TweetHeaderLeftProps {
  disabledTweet: boolean;
  onTweet(): void;
  onDrat(): void;
}

class Tweet extends React.PureComponent<TweetProps> {
  static MARGIN_COMMON = 15;
  static navigationOptions: NavigationOptions = props => {
    const goBack = () => props.navigation.goBack();
    const HeaderRightBtnGroup = connect(({ tweet, loading }: Store) => {
      return {
        disabledTweet: !tweet.dratContent || !!loading.effects['tweet/commit'],
      }
    }, dispatch => {
      return {
        async onTweet() {
          const success = await dispatch({ type: 'tweet/commit' });
          if (!success) {
            Alert.alert('发推失败');
          }
          goBack();
          dispatch({ type: 'feed/fetchTimeline', payload: { refresh: true } });
        },
      }
    })(Tweet.HeaderRightBtnGroup);
    return {
      title: "发推",
      gesturesEnabled: false,
      headerStyle: {
        borderBottomColor: 'transparent',
      },
      headerLeftContainerStyle: {
        paddingLeft: Tweet.MARGIN_COMMON,
      },
      headerRightContainerStyle: {
        paddingRight: Tweet.MARGIN_COMMON,
      },
      headerLeft: (
        <TouchableOpacity onPress={goBack}>
          <Icon
            name={"x"}
            size={24}
            style={{ marginBottom: -3 }}
            color={"rgb(29, 161, 242)"}
          />
        </TouchableOpacity>
      ),
      headerRight: <HeaderRightBtnGroup onDrat={goBack} onTweet={goBack}/>,
    }
  };

  static HeaderRightBtnGroup: React.SFC<TweetHeaderLeftProps> = ({
    disabledTweet,
    onTweet,
    onDrat,
  }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
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
      </View>
    );
  };

  renderMessageArea() {
    const { onChange, content, headImgUrl } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.messageAreaInner}>
        <Avatar width={40} uri={headImgUrl} />
        <Textarea
          rowSpan={10}
          autoFocus
          style={{ flex: 1 }}
          placeholderTextColor={Colors.tabIconDefault}
          maxLength={120}
          placeholder="有什么新鲜事？"
          defaultValue={content}
          onChangeText={onChange}
        />
      </ScrollView>
    );
  }

  render() {
    return (
      <Container>
        {this.renderMessageArea()}
      </Container>
    );
  }
}

export default connect(
  ({ user, tweet }: Store) => {
    return {
      headImgUrl: user.headImgUrl,
      content: tweet.dratContent,
    };
  },
  (dispatch) => {
    return {
      onChange(dratContent: string) {
        dispatch({ type: "tweet/save", payload: { dratContent } });
      },
    };
  },
)(Tweet);

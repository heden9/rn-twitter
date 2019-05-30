import React from "react";
import { Container, Content, ActionSheet } from "native-base";
import {
  NavigationScreenConfig,
  NavigationStackScreenOptions,
} from "react-navigation";
import {
  Text,
  StyleSheet,
  View,
  PixelRatio,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import Colors from "../constants/Colors";
import { FeedListItem_2 } from "../components/home-list";
import ReplayInput from '../components/ReplayInput';
import { ToolsBar2, LikeButton } from "../components/home-widget";
import { connect } from "../utils/dva";
import { Store, Timeline, UserInfo, Uid } from "../types";
// import { InputToolbar } from "react-native-gifted-chat";
const GAP = 10;
const FONTSIZE = 14;
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    padding: 16,
    paddingBottom: 0,
  },
  tipBar: {
    paddingVertical: GAP,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: "#eee",
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },

  bold: {
    color: "black",
    fontWeight: "bold",
    fontSize: FONTSIZE,
  },
  text: {
    fontSize: FONTSIZE,
    marginLeft: 3,
    color: Colors.subTitle,
  },

  textInputView: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#CCC",
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    textAlignVertical: "top",
  },
  textInputButton: {
    flexShrink: 1,
  },
});

interface IArticleProps {
  navigation: any;
  articleInfo: Timeline;
  userInfo: UserInfo;
  likeChange: any;
  uid: Uid;
}
const forwardActionOpts = ["转推", "带评论转推", "取消"];
const shareActionOpts = [
  "通过私信分享",
  "添加推文到书签",
  "分享推文...",
  "取消",
];
class Article extends React.PureComponent<IArticleProps> {
  static navigationOptions = {
    title: "推文",
  };
  componentDidMount() {}
  forwardAction = () => {
    return ActionSheet.show(
      {
        options: forwardActionOpts,
        cancelButtonIndex: forwardActionOpts.length - 1,
      },
      () => {},
    );
  };
  uploadAction = () => {
    return ActionSheet.show(
      {
        options: shareActionOpts,
        cancelButtonIndex: shareActionOpts.length - 1,
      },
      () => {},
    );
  };
  jumpToPerson = () => {
    this.props.navigation.navigate("person", {
      userInfo: this.props.userInfo,
      uid: this.props.uid,
    });
  }
  render() {
    const { articleInfo, userInfo, likeChange } = this.props;
    const defaultIconSize = 23;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} keyboardDismissMode="on-drag">
          <View style={styles.cardContainer}>
            <FeedListItem_2 onPress={this.jumpToPerson} item={articleInfo} userInfo={userInfo} />
            <Text style={[styles.text, { margin: 0, marginVertical: GAP }]}>
              2018/5/19 上午1:02
            </Text>
            <View style={styles.tipBar}>
              <Text style={styles.bold}>{articleInfo.forward_count}</Text>
              <Text style={styles.text}>转推</Text>
              <Text style={[styles.bold, { marginLeft: 5 }]}>
                {articleInfo.like_count}
              </Text>
              <Text style={styles.text}>喜欢</Text>
            </View>
            <ToolsBar2 buttonStyle={{ justifyContent: "center" }}>
              <ToolsBar2.Icon
                iconName={'comment'}
                iconSize={23}
              />
              <ToolsBar2.Icon
                onPress={this.forwardAction}
                iconName={'forward'}
                iconSize={23}
              />
              <LikeButton
                countShow={false}
                onPress={likeChange}
                likeCount={articleInfo.like_count}
                initialLike={articleInfo.is_like}
              />
              <ToolsBar2.Icon
                iconName="upload"
                iconSize={23}
                onPress={this.uploadAction}
              />
            </ToolsBar2>
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
        <ReplayInput />
      </View>
    );
  }
}
function mapDispatchToProps(dispatch: any, props: IArticleProps) {
  const { aid, uid } = props.navigation.state.params;
  return {
    likeChange(like: boolean) {
      dispatch({ type: "feed/changeLikeSuccess", payload: { id: aid, like } });
    },
  };
}
function mapStateToProps({ feed }: Store, props: IArticleProps) {
  const { aid, uid } = props.navigation.state.params;
  return {
    articleInfo: feed.timelineMap[aid],
    userInfo: feed.userInfoMap[uid],
    uid,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Article);

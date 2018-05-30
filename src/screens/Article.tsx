import React from "react";
import { Container, Content, ActionSheet } from "native-base";
import {
  NavigationScreenConfig,
  NavigationStackScreenOptions
} from "react-navigation";
import { Text, StyleSheet, View, PixelRatio } from "react-native";
import Colors from "../constants/Colors";
import { FeedListItem_2 } from "../components/List";
import ReplayInput from "../components/ReplayInput";
import { ToolsBar2, LikeButton } from "../components/HomeWidget";
import { connect } from "../utils/dva";
import { IStore, ITimelineItem, IUserInfo } from "../types";
import { InputToolbar } from "react-native-gifted-chat";
const GAP = 10;
const FONTSIZE = 14;
const styles = StyleSheet.create({

  cardContainer: {
    backgroundColor: "#fff",
    padding: 16,
    paddingBottom: 0
  },
  tipBar: {
    paddingVertical: GAP,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: "#eee",
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  },

  bold: {
    color: "black",
    fontWeight: "bold",
    fontSize: FONTSIZE
  },
  text: {
    fontSize: FONTSIZE,
    marginLeft: 3,
    color: Colors.subTitle
  }
});

interface IArticleProps {
  navigation: any;
  articleInfo: ITimelineItem;
  userInfo: IUserInfo;
  likeChange: any;
}
const forwordActionOpts = ["转推", "带评论转推", "取消"];
const shareActionOpts = [
  "通过私信分享",
  "添加推文到书签",
  "分享推文...",
  "取消"
];
class Article extends React.PureComponent<IArticleProps> {
  static navigationOptions = {
    title: "推文"
  };
  componentDidMount() {}
  render() {
    const { articleInfo, userInfo, likeChange } = this.props;
    const forwardAction = () => {
      return ActionSheet.show(
        {
          options: forwordActionOpts,
          cancelButtonIndex: forwordActionOpts.length - 1
        },
        () => {}
      );
    };
    const uploadAction = () => {
      return ActionSheet.show(
        {
          options: shareActionOpts,
          cancelButtonIndex: shareActionOpts.length - 1
        },
        () => {}
      );
    };
    return (
      <View style={{ flex: 1 }}>
        <Content>
          <View style={styles.cardContainer}>
            <FeedListItem_2 item={articleInfo} userInfo={userInfo} />
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
              <ToolsBar2.Icon icon={{ name: "comment", size: 23 }} />
              <ToolsBar2.Icon
                onPress={forwardAction}
                icon={{ name: "forward", size: 23 }}
              />
              <LikeButton
                show_count={false}
                onPress={likeChange}
                like_count={articleInfo.like_count}
                initialLike={articleInfo.is_like}
              />
              <ToolsBar2.Icon
                onPress={uploadAction}
                icon={{ name: "upload", size: 23 }}
              />
            </ToolsBar2>
          </View>
        </Content>
        {/* <View style={styles.replayContainer}>

        </View> */}
        <ReplayInput />
          {/* <InputToolbar/> */}
      </View>
    );
  }
}
function mapDispatchToProps(dispatch: any, props: IArticleProps) {
  const { aid, uid } = props.navigation.state.params;
  return {
    likeChange(like: boolean) {
      dispatch({ type: "feed/like_change", payload: { id: aid, like } });
    }
  };
}
function mapStateToProps({ feed }: IStore, props: IArticleProps) {
  const { aid, uid } = props.navigation.state.params;
  return {
    articleInfo: feed.timeline.map[aid],
    userInfo: feed.userMap[uid]
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Article);

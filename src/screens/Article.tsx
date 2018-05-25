import React from "react";
import { Container, Content, ActionSheet } from "native-base";
import {
  NavigationScreenConfig,
  NavigationStackScreenOptions
} from "react-navigation";
import { Text, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { FeedListItem_2 } from "../components/List";
import { ToolsBar2, LikeButton } from '../components/HomeWidget'
import { connect } from "../utils/dva";
import { IStore, ITimelineItem, IUserInfo } from "../types";
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
  },
  cardContainer: {
    backgroundColor: "#fff",
    padding: 16,
    paddingBottom: 0
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
      <Container>
        <Content>
          <View style={styles.cardContainer}>
            <FeedListItem_2 item={articleInfo} userInfo={userInfo} />
            <Text>{articleInfo.like_count}喜欢</Text>
            <ToolsBar2>
              <ToolsBar2.Icon
                icon={{ name: "comment", size: 20 }}
              />
              <ToolsBar2.Icon
                onPress={forwardAction}
                icon={{ name: "forward", size: 20 }}
              />
              <LikeButton
                show_count={false}
                onPress={likeChange}
                like_count={articleInfo.like_count}
                initialLike={articleInfo.is_like}
              />
              <ToolsBar2.Icon
                onPress={uploadAction}
                icon={{ name: "upload", size: 20 }}
              />
            </ToolsBar2>
          </View>
        </Content>
        <View style={styles.replayContainer}>
          <Text>replay</Text>
        </View>
      </Container>
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

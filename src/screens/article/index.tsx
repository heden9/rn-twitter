import React from "react";
import { ActionSheet } from "native-base";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import Comments from './comment';

import Colors from "../../constants/Colors";
import { ArticleCard } from "../../components/card";
import ReplayInput from '../../components/ReplayInput';
import { connect } from "../../utils/dva";
import { Store } from "../../types";
import { ArticleProps, ArticleNavigationParams } from "./type";
import { CardActionBar } from "../../components/card";
import { formatTimeDetail } from "../../utils/time";
const GAP = 10;
const FONTSIZE = 14;
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    padding: 16,
    paddingBottom: 0,
  },
  tipBar: {
    fontSize: FONTSIZE,
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
  },
  text: {
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

const forwardActionOpts = ["转推", "带评论转推", "取消"];
const shareActionOpts = [
  "通过私信分享",
  "添加推文到书签",
  "分享推文...",
  "取消",
];
class Article extends React.PureComponent<ArticleProps> {
  static ACTION_BAR_ICON_SIZE = 23;
  static navigationOptions = {
    title: "推文",
  };

  onForward = () => {
    return ActionSheet.show(
      {
        options: forwardActionOpts,
        cancelButtonIndex: forwardActionOpts.length - 1,
      },
      () => {},
    );
  };

  onShare = () => {
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

  componentDidMount() {
    this.props.onFetch();
  }

  render() {
    const { timeline, userInfo, onLike, aid, uid } = this.props;
    const createdAt = formatTimeDetail(timeline.created_at);
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} keyboardDismissMode="on-drag">
          <View style={styles.cardContainer}>
            <ArticleCard onPress={this.jumpToPerson} timeline={timeline} userInfo={userInfo} />
            <Text style={[styles.text, { margin: 0, marginVertical: GAP }]}>{createdAt}</Text>
            <View style={styles.tipBar}>
              <Text style={styles.bold}>{timeline.forward_count}</Text>
              <Text style={styles.text}>转推</Text>
              <Text style={[styles.bold, { marginLeft: 5 }]}>{timeline.like_count}</Text>
              <Text style={styles.text}>喜欢</Text>
            </View>
            <CardActionBar
              buttonStyle={{ justifyContent: "center" }}
              iconSize={Article.ACTION_BAR_ICON_SIZE}
              commentCount={timeline.comment_count}
              forwardCount={timeline.forward_count}
              likeCount={timeline.like_count}
              initialLike={timeline.is_like}
              onShare={this.onShare}
              onLike={onLike}
              onForward={this.onForward}
              onComment={() => {}}
            />
          </View>
          <Comments aid={aid} uid={uid}/>
        </ScrollView>
        <ReplayInput />
      </View>
    );
  }
}

export default connect(({ feed }: Store, props: ArticleProps) => {
  const { uid, aid } = props.navigation.state.params as ArticleNavigationParams;
  return {
    timeline:  feed.timelineMap[aid],
    userInfo: feed.userInfoMap[uid],
    uid,
    aid,
  };
}, (dispatch, props: ArticleProps) => {
  const { aid } = props.navigation.state.params as ArticleNavigationParams;
  return {
    onLike(isLike: boolean) {
      dispatch({ type: "feed/changeLikes", payload: { dId: aid, isLike } });
    },
    onFetch() {
      dispatch({ type: "feed/fetchArticle", payload: { aid } });
    },
  };
})(Article);

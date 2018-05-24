import React from "react";
import { Container, Content } from "native-base";
import {
  NavigationScreenConfig,
  NavigationStackScreenOptions
} from "react-navigation";
import { Text, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { FeedListItem_2 as FeedListItem } from "../components/List";
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
class Article extends React.PureComponent<IArticleProps> {
  static navigationOptions = {
    title: "推文"
  };
  componentDidMount() {}
  render() {
    const { articleInfo, userInfo, likeChange } = this.props;

    return (
      <Container>
        <Content>
          <View style={styles.cardContainer}>
            <FeedListItem
              test={likeChange}
              item={articleInfo}
              userInfo={userInfo}
            />
            <Text>{articleInfo.like_count}喜欢</Text>
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

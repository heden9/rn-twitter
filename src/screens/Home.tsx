import React from "react";
import { FlatList } from "react-native";
import {
  NavigationScreenConfig,
  NavigationStackScreenOptions
} from "react-navigation";
import { Container, ActionSheet } from "native-base";
import {
  Avatar,
  TweetEntry,
  LikeButton,
  ToolsBar2
} from "../components/HomeWidget";
import { FeedListItemCpt } from "../components/List";
import { IStore, ITimelineItem, IFeedType, IUserMap } from "../types";

import { connect } from "../utils/dva";

function mapStateToProps({ feed }: IStore) {
  return {
    timelineMap: feed.timeline.map,
    timelineList: feed.timeline.list,
    userMap: feed.userMap
  };
}
function mapDispatchToProps(dispatch: any) {
  return {
    likeChange(id: string, like: boolean) {
      dispatch({ type: "feed/like_change", payload: { id, like } });
    }
  }
}
interface IHomeProps {
  navigation: any;
  timelineMap: {
    [key: string]: ITimelineItem;
  };
  timelineList: ITimelineItem[];
  userMap: IUserMap;
  dispatch: any;
  likeChange: any;
}
interface IHomeState {
  refreshing: boolean;
}

const forwordActionOpts = ["转推", "带评论转推", "取消"];
const shareActionOpts = [
  "通过私信分享",
  "添加推文到书签",
  "分享推文...",
  "取消"
];
class Home extends React.Component<IHomeProps, IHomeState> {
  static navigationOptions: NavigationScreenConfig<
    NavigationStackScreenOptions
  > = props => {
    const { openDrawer, navigate }: any = props.navigation;
    return {
      title: "主页",
      headerLeft: <Avatar onPress={() => openDrawer()} />,
      headerRight: <TweetEntry onPress={() => navigate("tweet")} />
    };
  };
  state = {
    refreshing: false
  };
  _handleRefresh = () => {
    this.setState({
      refreshing: true
    });
    setTimeout(() => {
      this.setState({
        refreshing: false
      });
    }, 1000);
  };
  _test = (aid: any, like: any) => {
    this.props.dispatch({
      type: "feed/like_change",
      payload: { id: aid, like }
    });
  };
  _renderItem = ({ item }: any) => {
    const { timelineMap, userMap, navigation, likeChange } = this.props;
    const timelineItem = timelineMap[item];
    const userInfo = userMap[timelineItem.uid];

    return (
      <FeedListItemCpt
        item={timelineItem}
        userInfo={userInfo}
        navigate={navigation.navigate}
        likeChange={likeChange}
      />
    );
  };
  _keyExtractor = (item: any, index: number) => {
    return "" + item;
  };
  render() {
    const { refreshing } = this.state;
    const { timelineList, timelineMap } = this.props;
    console.log("home render");
    return (
      <Container>
        <FlatList
          extraData={timelineMap}
          onRefresh={this._handleRefresh}
          refreshing={refreshing}
          data={timelineList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </Container>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

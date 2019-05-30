import React from "react";
import { FlatList as RNFlatList, ListRenderItemInfo, ActivityIndicator, View, FlatListProps } from "react-native";

import { FeedCard } from "../../components/card";
import { Store, NavigationOptions, Timeline, UserInfo } from "../../types";
import { connect } from "../../utils/dva";
import { FeedProps, FeedState } from "./type";
import { Avatar, BtnTweet } from "../../components/widget";

const FlatList = RNFlatList as any;
class Feed extends React.PureComponent<FeedProps, FeedState> {
  static Avatar = connect(({ user }: Store) => {
    return {
      uri: user.headImgUrl,
    }
  })(Avatar);

  static navigationOptions: NavigationOptions = props => {
    const { openDrawer, navigate } = props.navigation;
    const margin = 15;
    return {
      title: "主页",
      headerLeft: <Feed.Avatar style={{ marginLeft: margin }} onPress={() => openDrawer()}/>,
      headerRight: <BtnTweet style={{ marginRight: margin }} onPress={() => navigate("tweet")} />,
    };
  };

  onAvatarPress = (timeline: Timeline, userInfo: UserInfo) => {
    this.props.navigation.navigate("person", {
      uid: userInfo.uid,
    });
  }

  onCardPress = (timeline: Timeline, userInfo: UserInfo) => {
    this.props.navigation.navigate("article", {
      uid: userInfo.uid,
      aid: timeline.aid,
    });
  }

  renderItem = ({ item }: ListRenderItemInfo<string>) => {
    const { timelineMap, userInfoMap, onLike } = this.props;
    const timeline = timelineMap[item];
    const userInfo = userInfoMap[timeline.uid];

    return (
      <FeedCard
        timeline={timeline}
        userInfo={userInfo}
        onAvatarPress={this.onAvatarPress}
        onCardPress={this.onCardPress}
        onLike={onLike}
      />
    );
  }

  keyExtractor(item: string, index: number) {
    return item;
  }

  componentDidMount() {
    this.props.onRefresh();
  }

  onEndReached = () => {
    if (this.props.hasMore && !this.props.loading && !this.props.refreshing) {
      this.props.onFetch();
    }
  }

  renderFooter = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40 }}>
        { this.props.loading ? <ActivityIndicator /> : null }
      </View>
    );
  }

  render() {
    const { timelineOrder, timelineMap, onRefresh, refreshing, loading } = this.props;
    return (
      <FlatList
        onEndReached={this.onEndReached}
        extraData={timelineMap}
        onRefresh={onRefresh}
        loading={loading}
        refreshing={refreshing}
        data={timelineOrder}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ListFooterComponent={this.renderFooter}
      />
    );
  }
}

export default connect(({ feed, user }: Store) => {
  return {
    timelineMap: feed.timelineMap,
    timelineOrder: feed.timelineOrder,
    userInfoMap: feed.userInfoMap,
    nickname: user.nickname,
    refreshing: feed.refreshing,
    loading: feed.loading,
    hasMore: feed.hasMore !== 0,
  };
}, (dispatch) => {
  return {
    onLike(dId: string, isLike: boolean) {
      dispatch({ type: "feed/changeLikes", payload: { dId, isLike } });
    },
    onFetch() {
      dispatch({ type: 'feed/fetchTimeline', payload: { } });
    },
    onRefresh() {
      dispatch({ type: 'feed/fetchTimeline', payload: { refresh: true } });
    },
  }
})(Feed);

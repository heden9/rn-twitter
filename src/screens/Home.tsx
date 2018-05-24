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
  ToolsBar
} from "../components/HomeWidget";
import { FeedListItem_3 } from "../components/List";
import { IStore, ITimelineItem, IFeedType, IUserMap } from "../types";

import { connect } from "../utils/dva";

function mapStateToProps({ feed }: IStore) {
  return {
    timelineMap: feed.timeline.map,
    timelineList: feed.timeline.list,
    userMap: feed.userMap
  };
}
interface IHomeProps {
  navigation: any;
  timelineMap: {
    [key: string]: ITimelineItem;
  };
  timelineList: ITimelineItem[];
  userMap: IUserMap;
  dispatch: any;
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

function TTT(props: any) {
  console.log("TTT render");
  const timelineItem = props.item;
  const toolsBarOpts = [
    {
      key: "comment",
      icon: "comment",
      label: timelineItem.comment_count
    },
    {
      key: "forward",
      icon: "forward",
      onPress: () => {
        return ActionSheet.show(
          {
            options: forwordActionOpts,
            cancelButtonIndex: forwordActionOpts.length - 1
          },
          () => {}
        );
      },
      label: timelineItem.forward_count
    },
    {
      key: "like",
      IconCpt: (
        <LikeButton
          onPress={like => {
            this.props.dispatch({
              type: "feed/like_change",
              payload: { id: timelineItem.key, like }
            });
          }}
          initialLike={timelineItem.is_like}
          like_count={timelineItem.like_count}
        />
      )
    },
    {
      key: "upload",
      icon: "upload",
      onPress: () => {
        return ActionSheet.show(
          {
            options: shareActionOpts,
            cancelButtonIndex: shareActionOpts.length - 1
          },
          () => {}
        );
      }
    }
  ];
  return <ToolsBar options={toolsBarOpts} />;
}

function _({ feed }, props: any) {
  return {
    item: feed.timeline.map[props.aid]
  };
}
const Test = connect(_)(TTT);
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
  _renderItem = ({ item }: { item: any }) => {
    const { timelineMap, userMap, navigation } = this.props;
    const timelineItem = timelineMap[item];
    const userInfo = userMap[timelineItem.uid];
    const navigate = () =>
      navigation.navigate("article", {
        uid: timelineItem.uid,
        aid: timelineItem.key,
        info: timelineItem
      });
    console.log("render Item");
    // const toolsBarOpts = [
    //   {
    //     key: "comment",
    //     icon: "comment",
    //     label: timelineItem.comment_count
    //   },
    //   {
    //     key: "forward",
    //     icon: "forward",
    //     onPress: () => {
    //       return ActionSheet.show(
    //         {
    //           options: forwordActionOpts,
    //           cancelButtonIndex: forwordActionOpts.length - 1
    //         },
    //         () => {}
    //       );
    //     },
    //     label: timelineItem.forward_count
    //   },
    //   {
    //     key: "like",
    //     IconCpt: (
    //       <LikeButton
    //         onPress={like => {
    //           this.props.dispatch({
    //             type: "feed/like_change",
    //             payload: { id: timelineItem.key, like }
    //           });
    //         }}
    //         initialLike={timelineItem.is_like}
    //         like_count={timelineItem.like_count}
    //       />
    //     )
    //   },
    //   {
    //     key: "upload",
    //     icon: "upload",
    //     onPress: () => {
    //       return ActionSheet.show(
    //         {
    //           options: shareActionOpts,
    //           cancelButtonIndex: shareActionOpts.length - 1
    //         },
    //         () => {}
    //       );
    //     }
    //   }
    // ];
    return (
      <FeedListItem_3
        item={timelineItem}
        userInfo={userInfo}
        onPress={navigate}
      >
        <Test aid={timelineItem.key} />
      </FeedListItem_3>
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
export default connect(mapStateToProps)(Home);

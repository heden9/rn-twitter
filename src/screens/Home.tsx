import React from "react";
import { FlatList } from "react-native";
import {
  NavigationScreenConfig,
  NavigationStackScreenOptions
} from "react-navigation";
import { Container } from "native-base";
import { Avatar, TweetEntry } from "../components/HomeWidget";
import FeedListItem from "../components/List";
import { IStore, ITimelineItem, IFeedType, UserMap } from "../types";

import { connect } from "../utils/dva";

function mapStateToProps({ feed }: IStore) {
  return {
    timelineMap: feed.timeline.map,
    timelineList: feed.timeline.list,
    userMap: feed.userMap
  };
}
interface IHomeProps {
  navigation: any,
  timelineMap: Map<any, ITimelineItem>,
  timelineList: ITimelineItem[],
  userMap: UserMap
};
interface IHomeState {
  refreshing: boolean;
}

class Home extends React.Component<IHomeProps, IHomeState> {
  static navigationOptions: NavigationScreenConfig<
    NavigationStackScreenOptions
  > = props => {
    const { openDrawer, navigate }: any = props.navigation;
    return {
      title: "主页",
      headerLeft: <Avatar onPress={() => openDrawer()} />,
      headerRight: <TweetEntry onPress={() => navigate('tweet')}/>
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
  _renderItem = ({ item }: { item: any }) => {
    const timelineItem = this.props.timelineMap.get(item);
    const userInfo = this.props.userMap.get(timelineItem.uid);
    const navigate = () => this.props.navigation.navigate('article', {
      uid: timelineItem.uid,
    });
    return <FeedListItem item={timelineItem} userInfo={userInfo} onPress={navigate} />;
  };
  _keyExtractor = (item: any, index: number) => {
    console.log(item, index)
    return '' + index;
  }
  render() {
    const { refreshing } = this.state;
    const { timelineList } = this.props;
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
export default connect(mapStateToProps)(Home)

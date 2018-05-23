import React from "react";
import { FlatList } from "react-native";
import {
  NavigationScreenConfig,
  NavigationStackScreenOptions
} from "react-navigation";
import { Container } from "native-base";
import { Avatar, Pen } from "../components/HomeWidget";
import FeedListItem from "../components/List";
import { IStore, ITimelineItem, IFeedType } from "../types";

import { connect } from "../utils/dva";

function mapStateToProps({ feed }: IStore) {
  return {
    timeline: feed.timeline,
    userMap: feed.userMap
  };
}
type HomeProps = IFeedType;
interface IHomeState {
  refreshing: boolean;
}

class Home extends React.Component<HomeProps, IHomeState> {
  static navigationOptions: NavigationScreenConfig<
    NavigationStackScreenOptions
  > = props => {
    const { openDrawer }: any = props.navigation;
    return {
      title: "主页",
      headerLeft: <Avatar onPress={() => openDrawer()} />,
      headerRight: <Pen />
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
  _renderItem = ({ item }: { item: ITimelineItem | any }) => {
    const userInfo = this.props.userMap.get(item.uid);
    return <FeedListItem item={item} userInfo={userInfo} />;
  };
  render() {
    const { refreshing } = this.state;
    const { timeline } = this.props;
    return (
      <Container>
        <FlatList
          onRefresh={this._handleRefresh}
          refreshing={refreshing}
          data={timeline}
          renderItem={this._renderItem}
        />
      </Container>
    );
  }
}
export default connect(mapStateToProps)(Home)

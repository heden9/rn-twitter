import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { WebBrowser } from "expo";
import {
  NavigationScreenConfig,
  NavigationStackScreenOptions
} from "react-navigation";
const {
  Container,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} = require("native-base");
import { MonoText } from "../components/StyledText";
import { Avatar, Pen } from "../components/HomeWidget";
import FeedListItem from "../components/List";
import { Store, TimelineItem, FeedType } from '../types'

const { connect } = require('dva-core');

function mapStateToProps({ feed }: Store ) {
  return {
    timeline: feed.timeline,
    userInfoMap: feed.user
  }
}
type HomeProps = FeedType;
type HomeState = {
  refreshing: boolean
}
@connect(mapStateToProps)
export default class Home extends React.Component<HomeProps, HomeState> {
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
  _renderItem = ({ item }: { item: TimelineItem | any}) => {
    const userInfo = this.props.user.get(item.uid)
    return <FeedListItem item={item} userInfo={userInfo}/>
  }
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

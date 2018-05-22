import React, { ReactElement } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text as RNText,
  Image,
  TouchableOpacity
} from "react-native";
const {
  ListItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Right,
  ActionSheet,
  Button
} = require("native-base");
import { Icon, ToolsBar } from "./HomeWidget";
import Colors from "../constants/Colors";
import format from "./format";
const connectStyle = require("../theme/components").default;
const s = `LIVE NOW: Tune in to hear from mission experts on today's @OrbitalATK #Antares cargo launch to the International @Space_Station: nasa.gov/live Have questions? Use #askNASA `;
const res = format(s);
const arr = new Array(100).fill(0).map((item, index) => ({ key: "" + index }));
const FONT = {
  fontSize: 16,
  color: Colors.subTitle
};
const styles = StyleSheet.create({
  titleGroup: {
    flexDirection: "row",
    marginBottom: 3
  },
  title: {
    fontWeight: "bold",
    fontSize: FONT.fontSize,
    marginRight: 5
  },
  subTitle: {
    marginLeft: 5,
    ...FONT
  },
  dot: {
    marginHorizontal: 4,
    ...FONT
  },
  time: {
    ...FONT
  },
  image: {
    marginTop: 10,
    width: "100%",
    height: 200,
    borderRadius: 15
  },
});

export default class List extends React.PureComponent {
  state = {
    refreshing: false
  };
  _showActionSheet = (who: string) => {
    const BUTTONS = [
      "添加推文到瞬间中",
      "我不喜欢这条推文",
      `取消关注${who}`,
      `隐藏${who}`,
      `屏蔽${who}`,
      "举报推文",
      "取消"
    ];
    return ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1
      },
      () => {}
    );
  };
  _renderItem = (item: any) => {
    return (
      <ListItem onPress={() => {}} key={item.key} avatar>
        <Left>
          <Thumbnail
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/bboy1895/128.jpg"
            }}
          />
        </Left>
        <Body style={{ paddingBottom: 0 }}>
          <View style={styles.titleGroup}>
            <RNText style={styles.title}>NASA</RNText>
            <Icon name="sign" size={17} color={Colors.tintColor} />
            <RNText style={styles.subTitle}>@NASA</RNText>
            <RNText style={styles.dot}>·</RNText>
            <RNText style={styles.time}>19时</RNText>
            <Right>
              <TouchableOpacity
                onPress={() => this._showActionSheet(`@${"NASA"}`)}
              >
                <Icon name="down" size={17} color={Colors.tabIconDefault} />
              </TouchableOpacity>
            </Right>
          </View>
          <Text note>{res}</Text>
          <Image
            style={styles.image}
            source={{ uri: "http://lorempixel.com/640/480/transport" }}
          />
          <ToolsBar />
        </Body>
      </ListItem>
    );
  };
  _handleRefresh = () => {
    console.log(455);
    this.setState({
      refreshing: true
    });
    setTimeout(() => {
      this.setState({
        refreshing: false
      });
    }, 1000);
  };
  render() {
    const { refreshing } = this.state;
    return (
      <FlatList
        onRefresh={this._handleRefresh}
        refreshing={refreshing}
        data={arr}
        renderItem={this._renderItem}
      />
    );
  }
}

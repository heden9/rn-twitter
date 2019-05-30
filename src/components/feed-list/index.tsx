import React from 'react';
import { ListItem, Left, Body, Thumbnail, View, Right, Text, ActionSheet } from "native-base";
import { Image } from "react-native-expo-image-cache";
import LightBox from 'react-native-lightbox';
import { TouchableOpacity, Text as RNText } from 'react-native';

import styles from './style';
import Colors from '../../constants/Colors';
import { FeedListItemProps } from './types';
import ActionBar from './action-bar';
import { BtnLike, Icon } from '../widget';

export class FeedListItem extends React.Component<FeedListItemProps> {
  static ACTION_BAR_ICON_SIZE = 18;
  static FORWARD_ACTION_SHEET = ["转推", "带评论转推", "取消"];
  static SHARE_ACTION_SHEET = [
    "通过私信分享",
    "添加推文到书签",
    "分享推文...",
    "取消",
  ];

  shouldComponentUpdate(nextProps: FeedListItemProps) {
    return (
      this.props.timeline !== nextProps.timeline ||
      this.props.userInfo !== nextProps.userInfo
    );
  }

  componentWillUnmount() {
    console.log("list unmount", this.props.userInfo.uid);
  }

  onForward = () => {
    ActionSheet.show({
      options: FeedListItem.FORWARD_ACTION_SHEET,
      cancelButtonIndex: FeedListItem.FORWARD_ACTION_SHEET.length - 1,
    }, () => {});
  };

  onShare = () => {
    ActionSheet.show({
      options: FeedListItem.SHARE_ACTION_SHEET,
      cancelButtonIndex: FeedListItem.SHARE_ACTION_SHEET.length - 1,
    }, () => {});
  };

  onLike = (like: boolean) => {
    this.props.onLike(this.props.timeline.key, like);
  };

  goToPerson = () => {
    this.props.navigation.navigate("person", {
      userInfo: this.props.userInfo,
      uid: this.props.timeline.uid,
    });
  }

  goToArticle = () => {
    this.props.navigation.navigate("article", {
      uid: this.props.timeline.uid,
      aid: this.props.timeline.key,
      info: this.props.timeline,
    });
  };

  onMoreAction = () => {
    const who = `@${this.props.userInfo.nick_name}`;
    const BUTTONS = [
      "添加推文到瞬间中",
      "我不喜欢这条推文",
      `取消关注${who}`,
      `隐藏${who}`,
      `屏蔽${who}`,
      "举报推文",
      "取消",
    ];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
      },
      () => {},
    );
  }

  renderMoreBtn() {
    return (
      <TouchableOpacity
        onPress={this.onMoreAction}
      >
        <Icon name="down" size={17} color={Colors.tabIconDefault} />
      </TouchableOpacity>
    )
  }

  renderAvatar() {
    return (
      <TouchableOpacity onPress={this.goToPerson}>
        <Thumbnail source={{ uri: this.props.userInfo.avatar }} />
      </TouchableOpacity>
    )
  }

  renderPics() {
    const { timeline } = this.props;
    if (timeline.pics.length) {
      return (
        <LightBox
          underlayColor="transparent" /*renderContent={renderCarousel}*/
        >
          <Image style={styles.image} uri={timeline.pics[0]} />
        </LightBox>
      )
    }
  }

  renderActionBar() {
    const { timeline } = this.props;
    return (
      <ActionBar>
        <ActionBar.Icon
          iconName="comment"
          iconSize={FeedListItem.ACTION_BAR_ICON_SIZE}
          label={timeline.comment_count}
        />
        <ActionBar.Icon
          onPress={this.onForward}
          iconName="forward"
          iconSize={FeedListItem.ACTION_BAR_ICON_SIZE}
          label={timeline.forward_count}
        />
        <BtnLike
          onPress={this.onLike}
          initialLike={timeline.is_like}
          size={FeedListItem.ACTION_BAR_ICON_SIZE}
          count={timeline.like_count}
        />
        <ActionBar.Icon
          onPress={this.onShare}
          iconName="upload"
          iconSize={FeedListItem.ACTION_BAR_ICON_SIZE}
        />
      </ActionBar>
    )
  }

  render() {
    const { timeline, userInfo } = this.props;
    return (
      <ListItem style={styles.listItem} onPress={this.goToArticle} key={timeline.key} avatar>
        <Left>
          {this.renderAvatar()}
        </Left>
        <Body style={styles.body as any}>
          <View style={styles.titleWrap}>
            <RNText style={styles.title} onPress={this.goToPerson}>{userInfo.nick_name}</RNText>
            <Icon name="sign" size={17} color={Colors.tintColor} />
            <RNText style={styles.subTitle}>@{userInfo.nick_name}</RNText>
            <RNText style={styles.dot}>·</RNText>
            <RNText style={styles.time}>{timeline.created_at}</RNText>
            <Right>
              {this.renderMoreBtn()}
            </Right>
          </View>
          <Text note style={styles.richText}>
            {timeline.jsxText}
          </Text>
          {this.renderPics()}
          {this.renderActionBar()}
        </Body>
      </ListItem>
    );
  }
}

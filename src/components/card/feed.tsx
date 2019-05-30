import React from 'react';
import { ListItem, Left, Body, View, Right, Text, ActionSheet } from "native-base";
import { Image } from "react-native-expo-image-cache";
import LightBox from 'react-native-lightbox';
import { TouchableOpacity, Text as RNText } from 'react-native';
import styles from './style';
import Colors from '../../constants/Colors';
import { FeedCardProps } from './types';
import { Icon, Avatar } from '../widget';
import { CardActionBar } from './card-action-bar';
import { formatTime } from '../../utils/time';

export class FeedCard extends React.Component<FeedCardProps> {
  static ACTION_BAR_ICON_SIZE = 18;
  static FORWARD_ACTION_SHEET = ["转推", "带评论转推", "取消"];
  static SHARE_ACTION_SHEET = [
    "通过私信分享",
    "添加推文到书签",
    "分享推文...",
    "取消",
  ];

  shouldComponentUpdate(nextProps: FeedCardProps) {
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
      options: FeedCard.FORWARD_ACTION_SHEET,
      cancelButtonIndex: FeedCard.FORWARD_ACTION_SHEET.length - 1,
    }, () => {});
  };

  onShare = () => {
    ActionSheet.show({
      options: FeedCard.SHARE_ACTION_SHEET,
      cancelButtonIndex: FeedCard.SHARE_ACTION_SHEET.length - 1,
    }, () => {});
  };

  onLike = (like: boolean) => {
    this.props.onLike(this.props.timeline.key, like);
  };

  onAvatarPress = () => {
    this.props.onAvatarPress(this.props.timeline, this.props.userInfo);
  }

  onCardPress = () => {
    this.props.onCardPress(this.props.timeline, this.props.userInfo);
  };

  onMoreAction = () => {
    const who = `@${this.props.userInfo.nickname}`;
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
      <Avatar uri={this.props.userInfo.avatar} onPress={this.onAvatarPress} size={40} />
    )
  }

  renderPics() {
    const { timeline } = this.props;
    if (timeline.pics && timeline.pics.length) {
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
      <CardActionBar
        iconSize={FeedCard.ACTION_BAR_ICON_SIZE}
        commentCount={timeline.comment_count}
        forwardCount={timeline.forward_count}
        likeCount={timeline.like_count}
        initialLike={timeline.is_like}
        onShare={this.onShare}
        onLike={this.onLike}
        onForward={this.onForward}
        onComment={() => {}}
      />
    )
  }

  render() {
    const { timeline, userInfo } = this.props;
    const createdAt = formatTime(timeline.created_at);
    return (
      <ListItem style={styles.listItem} onPress={this.onCardPress} key={timeline.key} avatar>
        <Left>
          {this.renderAvatar()}
        </Left>
        <Body style={styles.body as any}>
          <View style={styles.titleWrap}>
            <RNText style={styles.title} onPress={this.onAvatarPress}>{userInfo.nickname}</RNText>
            <Icon name="sign" size={17} color={Colors.tintColor} />
            <RNText style={[styles.subTitle, { marginLeft: 5 }]}>@{userInfo.nickname} · {createdAt}</RNText>
            <Right>
              {this.renderMoreBtn()}
            </Right>
          </View>
          <Text note style={styles.richText}>
            {timeline.brief}
          </Text>
          {this.renderPics()}
          {this.renderActionBar()}
        </Body>
      </ListItem>
    );
  }
}
